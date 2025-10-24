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

  const { slug } = use(params);

  const [showGameModeDialog, setShowGameModeDialog] = useState(slug === 'chicken-road');
  const [gameMode, setGameMode] = useState<'demo' | 'real' | null>(null);
  const [userInfo, setUserInfo] = useState<{
    id?: string;
    deposit?: string;
    country?: string;
    language?: string;
    stage?: string;
  } | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleGameModeSelect = (mode: 'demo' | 'real') => {
    setGameMode(mode);
    setShowGameModeDialog(false);
  };

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      setIsLoadingUserData(true);
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
        if (data.stage === 'verif2') setShowVerificationModal(true);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoadingUserData(false);
    }
  };

  // Generate game URL
  const getGameUrl = () => {
    const baseUrl = "https://chicken.valor-games.com";
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
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
    if (token) fetchUserInfo();
  }, []);

  useEffect(() => {
    let reloadTriggered = false; // Флаг для предотвращения множественных перезагрузок

    const handleMessage = (event: MessageEvent) => {
      
      // Проверяем источник (только ваш игровой домен)
      if (event.origin !== "https://chicken.valor-games.com") {
        return;
      }

      if (event.data && (event.data.type === "reloadPage" || event.data.type === "RELOAD_PAGE") && !reloadTriggered) {
        reloadTriggered = true; // Устанавливаем флаг

        sessionStorage.setItem('reload_triggered', 'true');

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.log("⚠️ Message not processed:", {
          hasData: !!event.data,
          type: event.data?.type,
          reloadTriggered
        });
      }
    };

    if (sessionStorage.getItem('reload_triggered') === 'true') {
      sessionStorage.removeItem('reload_triggered'); // Очищаем флаг
      return;
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Desktop Layout */}
      <div className="min-h-screen">
        <main className="flex-1 p-0 lg:p-8 2xl:p-12">
          <div className="bg-white rounded shadow border border-gray-200">
            <div className="bg-black rounded-none lg:rounded flex items-center justify-center relative overflow-hidden h-[550px] lg:h-[800px]">
              {isLoadingUserData ? (
                <div className="flex flex-col items-center justify-center text-white">
                  <Loader size="lg" color="white" type="dots" />
                  <p className="text-lg font-semibold mt-4">Cargando datos del usuario...</p>
                </div>
              ) : slug === 'chicken-road' ? (
                gameMode ? (
                  <iframe
                    src={getGameUrl()}
                    className="w-full h-[550px] lg:h-[800px] rounded-none lg:rounded"
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
      </div>

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
