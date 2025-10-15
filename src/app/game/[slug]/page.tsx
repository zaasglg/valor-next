"use client";

import { GameModeDialog } from "@/components/GameModeDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Loader from "@/components/Loader";

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
  } | null>(null);

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
        {/* Desktop Sidebar */}

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
    </div>
  );
}
