"use client";

import { GameModeDialog } from "@/components/GameModeDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  const [hasShownDialog, setHasShownDialog] = useState(false);

  const handleGameModeSelect = (mode: 'demo' | 'real') => {
    setGameMode(mode);
    setShowGameModeDialog(false);
  };

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      setIsLoadingUserData(true);
      
      // Only access localStorage on client side
      if (typeof window === 'undefined') {
        setIsLoadingUserData(false);
        return;
      }
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsLoadingUserData(false);
        // Después de cargar datos, mostrar modal si es chicken-road (solo una vez)
        if (slug === 'chicken-road' && !hasShownDialog) {
          setShowGameModeDialog(true);
          setHasShownDialog(true);
        }
        return;
      }

      const response = await fetch('/api/user/info', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        if (data.stage === 'verif2') {
          setShowVerificationModal(true);
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoadingUserData(false);
      // Показываем модалку только если пользователь авторизован и это chicken-road (solo una vez)
      if (slug === 'chicken-road' && localStorage.getItem('access_token') && !hasShownDialog) {
        setShowGameModeDialog(true);
        setHasShownDialog(true);
      }
    }
  };

  // Generate game URL
  const getGameUrl = () => {
    const baseUrl = "https://chicken.valor-games.co";
    
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
    // Set client flag to prevent hydration mismatch
    setIsClient(true);
    
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
    
    // Verificar si fue una recarga desde el iframe
    const wasReloaded = sessionStorage.getItem('reload_triggered') === 'true';
    
    if (wasReloaded) {
      // Limpiar el flag
      sessionStorage.removeItem('reload_triggered');
      console.log('✅ Página recargada desde iframe, cargando datos del usuario...');
    }
    
    // Siempre cargar datos del usuario (incluso después de recarga)
    fetchUserInfo();

    // Monitor page visibility - reload when user returns to tab after game
    let lastVisibilityChange = Date.now();
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const timeSinceLastChange = Date.now() - lastVisibilityChange;
        // If user was away for more than 3 seconds, reload to update balance
        if (timeSinceLastChange > 3000 && gameMode === 'real') {
          console.log('🔄 User returned to tab, reloading to update balance...');
          sessionStorage.setItem('reload_triggered', 'true');
          window.location.reload();
        }
      }
      lastVisibilityChange = Date.now();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gameMode]);

  useEffect(() => {
    let reloadTriggered = false;

    const handleMessage = (event: MessageEvent) => {
      
      // Проверяем источник (только ваш игровой домен)
      if (event.origin !== "https://chicken.valor-games.co" && event.origin !== "https://chicken.valor-games.com") {
        return;
      }

      console.log('📨 Received message from iframe:', event.data);

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
          reloadTriggered = true;
          sessionStorage.setItem('reload_triggered', 'true');
          console.log('🔄 Recibido mensaje de recarga, recargando página...');
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.log("⚠️ Message not processed:", {
            hasData: !!event.data,
            type: messageType,
            fullData: event.data,
            reloadTriggered
          });
        }
      }
    };

    // Also listen for beforeunload event from iframe
    const handleBeforeUnload = () => {
      console.log('🔄 Iframe navigation detected, reloading parent...');
      if (!reloadTriggered) {
        reloadTriggered = true;
        sessionStorage.setItem('reload_triggered', 'true');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Prevent hydration mismatch by showing loading state until client is ready
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#fafbfc]">
        <main>
          <div className="bg-white">
            <div className="bg-black rounded-none lg:rounded flex items-center justify-center relative overflow-hidden h-[650px] lg:h-[800px]">
              <div className="flex flex-col items-center justify-center text-white">
                <Loader size="lg" color="white" type="dots" />
                <p className="text-lg font-semibold mt-4">Cargando...</p>
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
          <div className="bg-black flex items-center justify-center relative overflow-hidden h-[650px] lg:h-[800px]">
            {isLoadingUserData ? (
              <div className="flex flex-col items-center justify-center text-white">
                <Loader size="lg" color="white" type="dots" />
                <p className="text-lg font-semibold mt-4">Cargando datos del usuario...</p>
              </div>
            ) : slug === 'chicken-road' ? (
              gameMode ? (
                <iframe
                  ref={(iframe) => {
                    if (iframe) {
                      // Monitor iframe for navigation/reload events
                      iframe.onload = () => {
                        console.log('🎮 Game iframe loaded');
                        
                        // Try to inject a script to monitor POST requests
                        try {
                          const iframeWindow = iframe.contentWindow;
                          if (iframeWindow) {
                            // Listen for form submissions in iframe
                            const checkForReload = setInterval(() => {
                              try {
                                // Check if iframe URL changed (might indicate POST redirect)
                                const currentSrc = iframe.src;
                                if (currentSrc && !currentSrc.includes('chicken.valor-games.co')) {
                                  console.log('🔄 Iframe URL changed, reloading parent...');
                                  clearInterval(checkForReload);
                                  sessionStorage.setItem('reload_triggered', 'true');
                                  window.location.reload();
                                }
                              } catch (e) {
                                // Cross-origin error is expected
                              }
                            }, 1000);

                            // Clean up interval after 5 minutes
                            setTimeout(() => clearInterval(checkForReload), 300000);
                          }
                        } catch (error) {
                          console.log('Cannot access iframe content (cross-origin)');
                        }
                      };
                    }
                  }}
                  src={getGameUrl()}
                  className="w-full h-[650px] lg:h-[800px] rounded-none lg:rounded"
                  title="Game"
                  allow="autoplay; fullscreen"
                />
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
      {slug === 'chicken-road' && (
        <GameModeDialog
          isOpen={showGameModeDialog}
          onClose={() => setShowGameModeDialog(false)}
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
                  // Открываем виджет чата используя CustomEvent
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
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-[0_6px_0_0_#c2410c,0_8px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_#c2410c,0_6px_10px_rgба(0,0,0,0.2)] active:shadow-[0_2px_0_0_#c2410c,0_4px_8px_rgба(0,0,0,0.2)] active:translate-y-1 transition-all duration-100 text-base transform hover:-translate-y-0.5"
              >
                VERIFICAR CUENTA
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
