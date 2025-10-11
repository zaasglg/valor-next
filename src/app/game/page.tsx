"use client";

import { GameModeDialog } from "@/components/GameModeDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GamePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showGameModeDialog, setShowGameModeDialog] = useState(true);
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
      return `${baseUrl}/?demo=true&access_token=${accessToken}`;
    }
    
    if (gameMode === 'real') {
      // Use data from API if available, otherwise fallback to localStorage or defaults
      const userId = userInfo?.id || localStorage.getItem('user_id') || '12345';
      const balance = userInfo?.deposit || localStorage.getItem('balance') || '1000';
      const country = userInfo?.country || localStorage.getItem('country') || 'Venezuela';
      const language = userInfo?.language || localStorage.getItem('language') || 'es';
      
      return `${baseUrl}/?user_id=${userId}&balance=${balance}&country=${country}&lang=${language}&access_token=${accessToken}`;
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
        <main className="flex-1 p-8 2xl:p-12">
        <div className="bg-white rounded shadow border border-gray-200">
          
            <div className="bg-black rounded flex items-center justify-center relative overflow-hidden" style={{ height: '800px' }}>
              {gameMode ? (
                <iframe
                  src={getGameUrl()}
                  className="w-full h-[800px] rounded"
                  title="Game"
                  allow="autoplay; fullscreen"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <div className="text-2xl mb-4">🎮</div>
                  <p className="text-lg font-semibold">{t('game_mode.select_mode')}</p>
                  <p className="text-sm text-gray-300 mt-2">{t('game_mode.please_select_mode')}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Game Mode Dialog */}
      <GameModeDialog
        isOpen={showGameModeDialog}
        onClose={() => setShowGameModeDialog(false)}
        onSelectMode={handleGameModeSelect}
      />
    </div>
  );
}
