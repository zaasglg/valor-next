"use client";

import { GameModeDialog } from "@/components/GameModeDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect, use, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GamePage({ params }: GamePageProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = checking, false = not auth, true = auth
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { slug } = use(params);

  const [showGameModeDialog, setShowGameModeDialog] = useState(false);
  const [gameMode, setGameMode] = useState<'demo' | 'real' | null>(null);
  const [userInfo, setUserInfo] = useState<{
    id?: string;
    deposit?: string;
    country?: string;
    language?: string;
    stage?: string;
  } | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showAccountReviewModal, setShowAccountReviewModal] = useState(false);
  const dialogShownRef = useRef(false);
  const [isGameLoading, setIsGameLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleGameModeSelect = (mode: 'demo' | 'real') => {
    console.log('🎯 Game mode selected:', mode);
    setGameMode(mode);
    setShowGameModeDialog(false);
    // Loader will stay until iframe loads
    setIsGameLoading(true);
  };

  const handleIframeLoad = () => {
    console.log('✅ Game iframe loaded');
    // Keep loader for 2 more seconds to ensure game data is loaded
    setTimeout(() => {
      setIsGameLoading(false);
    }, 2000);
  };

  // Check if account review is needed
  const checkAccountReview = (data: any) => {
    // Don't check again if modal is already shown
    if (showAccountReviewModal) {
      return false;
    }
    
    if (data.stage === 'meet') {
      const balance = parseFloat(data.deposit) || 0;
      const country = (data.country_info?.country || data.country || '').toLowerCase();
      
      let reviewThreshold = 44000000; // Default for Colombia (44M COP)
      
      // Convert for other countries
      if (country.includes('ecua') || country === 'ec') {
        reviewThreshold = 11000; // 44M COP / 4000 ≈ 11,000 USD
      } else if (country.includes('paragu') || country === 'py') {
        reviewThreshold = 330000000; // 44M COP * 7.5 ≈ 330M PYG
      }
      
      console.log('🔍 Checking account review:', { balance, reviewThreshold, country, stage: data.stage });
      
      if (balance >= reviewThreshold) {
        console.log('🚨 Account review required:', { balance, reviewThreshold, country });
        setShowAccountReviewModal(true);
        return true;
      }
    }
    
    return false;
  };

  // Fetch user info
  const fetchUserInfo = async (isBackgroundCheck = false) => {
    try {
      if (!isBackgroundCheck) {
        setIsLoadingUserData(true);
      }
      
      // Only access localStorage on client side
      if (typeof window === 'undefined') {
        setIsLoadingUserData(false);
        return;
      }
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsLoadingUserData(false);
        return;
      }

      const response = await fetch('/api/user/info', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        
        // Check for verif2 stage
        if (data.stage === 'verif2') {
          setShowVerificationModal(true);
        }
        
        // Check for account review (meet stage with high balance)
        checkAccountReview(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      if (!isBackgroundCheck) {
        setIsLoadingUserData(false);
      }
    }
  };

  // Generate game URL
  const getGameUrl = () => {
    // Determine base URL based on game slug
    const baseUrl = slug === 'aviator' 
      ? "https://aviator.valor-games.co" 
      : "https://chicken.valor-games.co";
    
    // Only access localStorage on client side
    if (typeof window === 'undefined') {
      return baseUrl;
    }
    
    const accessToken = localStorage.getItem('access_token') || '';
    
    if (gameMode === 'demo') {
      const country = userInfo?.country || 'Venezuela';
      return `${baseUrl}/?demo=true&country=${encodeURIComponent(country)}`;
    }
    if (gameMode === 'real') {
      return `${baseUrl}/?access_token=${accessToken}`;
    }
    return `${baseUrl}?access_token=${accessToken}`;
  };

  useEffect(() => {
    console.log('🚀 Component mounted for slug:', slug);
    
    // Set client flag
    setIsClient(true);
    
    // Check authentication IMMEDIATELY
    const token = localStorage.getItem("access_token");
    const hasToken = !!token;
    console.log('🔑 Token exists:', hasToken);
    
    // Redirect if not authenticated - do this BEFORE anything else
    if (!hasToken) {
      console.log('❌ No token found, redirecting to home...');
      setIsAuthenticated(false);
      router.replace('/'); // Use replace instead of push
      // Show registration modal after redirect
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("auth:openRegister"));
      }, 100);
      return;
    }
    
    // Only continue if token exists
    setIsAuthenticated(true);
    
    // Verificar si fue una recarga desde el iframe
    const wasReloaded = sessionStorage.getItem('reload_triggered') === 'true';
    
    if (wasReloaded) {
      // Limpiar флаг из sessionStorage
      sessionStorage.removeItem('reload_triggered');
      console.log('✅ Página recargada desde iframe, cargando datos del usuario...');
    }
    
    // Проверяем и очищаем старые флаги перезагрузки (старше 10 секунд)
    const lastReloadTime = localStorage.getItem('last_reload_time');
    if (lastReloadTime) {
      const timeSinceReload = Date.now() - parseInt(lastReloadTime);
      if (timeSinceReload > 10000) {
        localStorage.removeItem('last_reload_time');
        console.log('🧹 Очищен старый флаг перезагрузки');
      }
    }
    
    // Siempre cargar datos del usuario (incluso después de recarga)
    fetchUserInfo();

    return () => {};
  }, [slug, router]);

  // Show game mode dialog immediately when client is ready
  useEffect(() => {
    if (!isClient) return; // Wait for client to be ready
    
    // Check if we need to show the dialog
    const shouldShowDialog = !gameMode && 
                            (slug === 'chicken-road' || slug === 'aviator') &&
                            !dialogShownRef.current;
    
    console.log('🎮 Game mode check:', { 
      gameMode, 
      slug,
      isClient,
      dialogShown: dialogShownRef.current,
      shouldShowDialog
    });
    
    if (shouldShowDialog) {
      console.log('✅ Opening game mode dialog immediately');
      dialogShownRef.current = true;
      // Show dialog immediately without waiting for user data
      setShowGameModeDialog(true);
    }
  }, [gameMode, slug, isClient]);

  // Periodic balance check for meet stage users
  useEffect(() => {
    console.log('🔍 Balance check effect triggered. Stage:', userInfo?.stage, 'Modal shown:', showAccountReviewModal, 'Balance:', userInfo?.deposit);
    
    let balanceCheckInterval: NodeJS.Timeout | null = null;
    
    // Start checking if user has meet stage and modal is not shown
    if (userInfo?.stage === 'meet' && !showAccountReviewModal) {
      console.log('🔄 Starting periodic balance check for meet stage user (every 5 seconds)...');
      
      balanceCheckInterval = setInterval(() => {
        console.log('⏰ Checking balance...');
        fetchUserInfo(true); // Background check without loading state
      }, 5000); // Check every 5 seconds
    } else {
      console.log('❌ Balance check NOT started. Reason:', 
        userInfo?.stage !== 'meet' ? 'Stage is not meet' : 'Modal already shown');
    }

    return () => {
      if (balanceCheckInterval) {
        console.log('🛑 Stopping balance check interval');
        clearInterval(balanceCheckInterval);
      }
    };
  }, [userInfo?.stage, showAccountReviewModal]);

  useEffect(() => {
    // Проверяем, не было ли недавней перезагрузки
    const lastReloadTime = localStorage.getItem('last_reload_time');
    const now = Date.now();
    
    if (lastReloadTime) {
      const timeSinceReload = now - parseInt(lastReloadTime);
      // Если прошло менее 3 секунд с последней перезагрузки, не слушаем сообщения
      if (timeSinceReload < 3000) {
        // Установим таймер для очистки флага
        const timeoutId = setTimeout(() => {
          localStorage.removeItem('last_reload_time');
        }, 3000 - timeSinceReload);
        
        return () => clearTimeout(timeoutId);
      } else {
        // Если прошло больше 3 секунд, очищаем старый флаг
        localStorage.removeItem('last_reload_time');
      }
    }

    let reloadTriggered = false;

    const handleMessage = (event: MessageEvent) => {
      // Проверяем источник (только ваш игровой домен)
      if (event.origin !== "https://chicken.valor-games.co" && 
          event.origin !== "https://chicken.valor-games.com" &&
          event.origin !== "https://aviator.valor-games.co") {
        return;
      }

      // Проверяем флаг перезагрузки перед каждым сообщением
      const currentReloadTime = localStorage.getItem('last_reload_time');
      if (currentReloadTime) {
        const timeSince = Date.now() - parseInt(currentReloadTime);
        if (timeSince < 3000) {
          return;
        }
      }

      // Handle different message types
      if (event.data && !reloadTriggered) {
        const messageType = event.data.type || event.data.action || event.data.event;
        
        // Check for reload triggers
        if (
          messageType === "reloadPage" || 
          messageType === "RELOAD_PAGE" ||
          messageType === "gameFinished" ||
          messageType === "GAME_FINISHED" ||
          event.data.reload === true ||
          event.data.shouldReload === true
        ) {
          // Сразу устанавливаем флаг, чтобы заблокировать другие сообщения
          const reloadTime = Date.now().toString();
          localStorage.setItem('last_reload_time', reloadTime);
          reloadTriggered = true;
          sessionStorage.setItem('reload_triggered', 'true');
          
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Prevent hydration mismatch by showing loading state until client is ready
  if (!isClient || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#fafbfc]">
        <main>
          <div className="bg-white">
            <div className={`bg-black rounded-none lg:rounded flex items-center justify-center relative overflow-hidden ${slug === 'aviator' ? 'h-screen' : 'h-[650px]'} lg:h-[800px]`}>
              <div className="flex flex-col items-center justify-center text-white">
                <Loader size="lg" color="white" type="dots" />
                <p className="text-lg font-semibold mt-4">Verificando...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show loading while redirecting unauthenticated users
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#fafbfc]">
        <main>
          <div className="bg-white">
            <div className={`bg-black rounded-none lg:rounded flex items-center justify-center relative overflow-hidden ${slug === 'aviator' ? 'h-screen' : 'h-[650px]'} lg:h-[800px]`}>
              <div className="flex flex-col items-center justify-center text-white">
                <Loader size="lg" color="white" type="dots" />
                <p className="text-lg font-semibold mt-4">Redirigiendo...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#fafbfc]">
      {/* Desktop Layout */}
      <main>
        <div className="bg-white">
          <div className={`bg-black flex items-center justify-center relative overflow-hidden ${slug === 'aviator' ? 'h-screen' : 'h-[650px]'} lg:h-[800px]`}>
            {isLoadingUserData && !showGameModeDialog ? (
              <div className="flex flex-col items-center justify-center text-white">
                <Loader size="lg" color="white" type="dots" />
                <p className="text-lg font-semibold mt-4">Cargando datos del usuario...</p>
              </div>
            ) : showAccountReviewModal ? (
              <div className="flex flex-col items-center justify-center text-white px-4">
                <div className="text-4xl mb-4">⚠️</div>
                <p className="text-xl font-bold text-center">Cuenta en revisión</p>
                <p className="text-sm text-gray-300 mt-2 text-center">Contacta con soporte para más información</p>
              </div>
            ) : slug === 'chicken-road' || slug === 'aviator' ? (
              gameMode ? (
                <div className="relative w-full h-full">
                  <iframe
                    ref={iframeRef}
                    src={getGameUrl()}
                    className={`w-full ${slug === 'aviator' ? 'h-screen' : 'h-[650px]'} lg:h-[800px] rounded-none lg:rounded`}
                    title="Game"
                    allow="autoplay; fullscreen"
                    onLoad={handleIframeLoad}
                  />
                  {isGameLoading && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-none lg:rounded pointer-events-none">
                      <Loader size="lg" color="white" type="dots" />
                      <p className="text-lg font-semibold mt-4 text-white">{t('game_mode.loading_game')}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <div className="text-2xl mb-4">🎮</div>
                  <p className="text-lg font-semibold">{t('game_mode.select_mode')}</p>
                  <p className="text-sm text-gray-300 mt-2">{t('game_mode.please_select_mode')}</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center text-white">
                <Loader size="lg" color="white" type="dots" />
                <p className="text-lg font-semibold mt-4">{t('common.loading')}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Game Mode Dialog */}
      {(slug === 'chicken-road' || slug === 'aviator') && (
        <GameModeDialog
          isOpen={showGameModeDialog}
          onClose={() => {
            console.log('❌ Dialog close attempted');
            // Don't allow closing if no mode selected
            if (!gameMode) {
              console.log('⚠️ Cannot close - no mode selected');
              return;
            }
            setShowGameModeDialog(false);
          }}
          onSelectMode={handleGameModeSelect}
        />
      )}

      {/* Verification Modal */}
      <Dialog
        open={showVerificationModal}
        onOpenChange={(open) => {
          if (userInfo?.stage !== 'verif2') setShowVerificationModal(open);
        }}
      >
        <DialogContent
          className="w-full max-w-2xl p-0 rounded-xl"
          showCloseButton={userInfo?.stage !== 'verif2'}
          onInteractOutside={(e) => {
            if (userInfo?.stage === 'verif2') e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (userInfo?.stage === 'verif2') e.preventDefault();
          }}
        >
          <DialogHeader className="sr-only text-white">
            <DialogTitle className="text-left text-white">Se requiere verificación</DialogTitle>
          </DialogHeader>
          <div className="bg-[orange] px-6 py-8 rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
              {/* SVG background omitted for brevity */}
            </div>
            <h2 className="text-2xl font-bold relative z-10 text-white">Se requiere verificación</h2>
          </div>
          <div className="bg-white px-6 py-8 rounded-b-xl">
            <p className="text-gray-700 text-lg leading-relaxed text-center font-bold mb-6">
              Has superado el límite de juegos. Tu cuenta está bloqueada hasta que se verifique. Contacta con soporte para más información.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => {
                  document.dispatchEvent(new CustomEvent("popups:open"));
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-[0_6px_0_0_#15803d,0_8px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_#15803d,0_6px_10px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_0_#15803d,0_4px_8px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-100 text-base transform hover:-translate-y-0.5"
              >
                CONTACTAR SOPORTE
              </button>
              <button
                onClick={() => {
                  setShowVerificationModal(false);
                  router.push('/deposit');
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-[0_6px_0_0_#c2410c,0_8px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_#c2410c,0_6px_10px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_0_#c2410c,0_4px_8px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-100 text-base transform hover:-translate-y-0.5"
              >
                VERIFICAR CUENTA
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Review Modal */}
      <Dialog open={showAccountReviewModal} onOpenChange={() => {}}>
        <DialogContent
          className="w-full max-w-2xl p-0 rounded-xl"
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="sr-only text-white">
            <DialogTitle className="text-left text-white">Revisión de cuenta</DialogTitle>
          </DialogHeader>
          <div className="bg-orange-500 px-6 py-5 rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
              <svg width="144" height="130" viewBox="0 0 144 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.1">
                  <path d="M111.628 17.8389L120.77 21.4838L106.194 37.3233L113.865 43.0161L95.2512 56.8294L98.4242 62.4229L72.1608 108.726L45.8971 62.4229L49.0701 56.8291L30.4563 43.0161L38.1275 37.3236L23.5508 21.4841L32.4245 17.946C29.8231 12.9085 27.6154 7.18264 25.5029 1.15791H0L58.4064 130H85.6008L144 1.15791H118.495C116.398 7.14004 114.206 12.8279 111.628 17.8389Z" fill="black"></path>
                </g>
              </svg>
            </div>
            <h2 className="text-2xl font-bold relative z-10 text-white">Revisión de cuenta</h2>
          </div>
          <div className="bg-white px-6 py-6 rounded-b-xl">
            <p className="text-gray-700 text-base leading-relaxed text-center font-semibold mb-3">
              Tu cuenta está siendo revisada por el equipo de seguridad.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">
              Contacta con el soporte para más información.
            </p>
            <p className="text-gray-500 text-xs leading-relaxed text-center mb-5">
              Tus juegos están temporalmente suspendidos hasta finalizar la revisión.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  document.dispatchEvent(new CustomEvent("popups:open"));
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-[0_6px_0_0_#15803d,0_8px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_#15803d,0_6px_10px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_0_#15803d,0_4px_8px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-100 text-base transform hover:-translate-y-0.5"
              >
                CONTACTAR SOPORTE
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
