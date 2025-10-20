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

  // Function to fetch user info from API
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await fetch('/api/user/info', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        
        // Check if stage is verif2 and show modal
        if (data.stage === 'verif2') {
          setShowVerificationModal(true);
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Function to generate game URL based on selected mode
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
    
    // Default URL if no mode selected
    return `${baseUrl}?access_token=${accessToken}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
    
    // Fetch user info when component mounts
    if (token) {
      fetchUserInfo();
    }
  }, []);



  return (
    <div className="min-h-screen bg-[#fafbfc]">

      {/* Desktop Layout */}
      <div className="min-h-screen">

        {/* Desktop Content */}
        <main className="flex-1 p-0 lg:p-8 2xl:p-12">
        <div className="bg-white rounded shadow border border-gray-200">
          
            <div className="bg-black rounded-none lg:rounded flex items-center justify-center relative overflow-hidden h-[550px] lg:h-[800px]">
              {slug === 'chicken-road' ? (
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

      {/* Game Mode Dialog - only show for chicken-road */}
      {slug === 'chicken-road' && (
        <GameModeDialog
          isOpen={showGameModeDialog}
          onClose={() => setShowGameModeDialog(false)}
          onSelectMode={handleGameModeSelect}
        />
      )}

      {/* Verification Modal for verif2 stage */}
      <Dialog open={showVerificationModal} onOpenChange={(open) => {
        // Prevent closing the modal if stage is verif2
        if (userInfo?.stage !== 'verif2') {
          setShowVerificationModal(open);
        }
      }}>
        <DialogContent 
          className="w-full max-w-2xl p-0 rounded-xl"
          showCloseButton={userInfo?.stage !== 'verif2'}
          onInteractOutside={(e) => {
            // Prevent closing on outside click if stage is verif2
            if (userInfo?.stage === 'verif2') {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            // Prevent closing on Escape key if stage is verif2
            if (userInfo?.stage === 'verif2') {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader className="sr-only text-white">
            <DialogTitle className="text-left text-white">Se requiere verificación</DialogTitle>
          </DialogHeader>
          <div className="bg-[orange] px-6 py-8 rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 flex items-center justify-center">
              <svg width="144" height="130" viewBox="0 0 144 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.1">
                  <path d="M111.628 17.8389L120.77 21.4838L106.194 37.3233L113.865 43.0161L95.2512 56.8294L98.4242 62.4229L72.1608 108.726L45.8971 62.4229L49.0701 56.8291L30.4563 43.0161L38.1275 37.3236L23.5508 21.4841L32.4245 17.946C29.8231 12.9085 27.6154 7.18264 25.5029 1.15791H0L58.4064 130H85.6008L144 1.15791H118.495C116.398 7.14004 114.206 12.8279 111.628 17.8389Z" fill="black"></path>
                  <path d="M136.333 -56.0461C109.792 -38.5286 104.918 -10.498 95.5236 0.129364C99.1967 -17.5356 92.559 -26.9903 106.935 -42.5995C89.9579 -31.28 96.0359 -15.9238 89.303 -0.683891L87.7949 -1.56792C96.2198 -25.3343 73.3298 -55.7099 108.436 -74C67.5759 -61.4941 79.3861 -34.0497 75.04 -9.04321L72.1606 -10.7307L69.281 -9.04321C64.9349 -34.0497 76.7453 -61.4941 35.8844 -74C70.9911 -55.7099 48.1017 -25.3342 56.5263 -1.5679L54.7567 -0.530853C47.9148 -15.8212 54.0985 -31.242 37.0648 -42.5994C51.4402 -26.9902 44.8028 -17.5355 48.476 0.129387C39.0813 -10.4983 34.2072 -38.5285 7.66733 -56.046C26.5193 -38.8968 30.1245 3.84444 44.3543 21.857L37.3862 24.6353L50.1061 38.457L43.9626 43.0161L59.5797 54.6052L55.1454 62.4229L72.1607 92.4211L89.1759 62.4229L84.7419 54.6055L100.359 43.0161L94.2152 38.457L106.935 24.6352L99.7196 21.7587C113.887 3.69006 117.514 -38.9273 136.333 -56.0461ZM59.0439 40.5436L48.3543 20.2334L64.5806 32.0339L59.0439 40.5436ZM85.2772 40.5436L79.7404 32.0339L95.9667 20.2334L85.2772 40.5436Z" fill="black"></path>
                </g>
              </svg>
            </div>
            <h2 className="text-2xl font-bold relative z-10 text-white">Se requiere verificación</h2>
          </div>
          <div className="bg-white px-6 py-8 rounded-b-xl">
            <p className="text-gray-700 text-lg leading-relaxed text-center font-bold">
              Has superado el límite de juegos en una cuenta no verificada, tu cuenta está bloqueada hasta que sea verificada.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
