"use client"

import { LoginDialog } from "@/components/LoginDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HighBalanceVerificationModal from '@/components/HighBalanceVerificationModal';

const games = [
  // PragmaticPlay Games
  {
    img: "/game-images/aviator.jpg",
    provider: "PragmaticPlay",
    category: "Crash",
    name: "Aviator"
  },
  {
    "img": "/game-images/chicken-road.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Chicken Road"
  },
  {
    "img": "/game-images/wheel.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Wheel"
  },
  {
    "img": "/game-images/mines.jpg",
    "provider": "Valor",
    "category": "Mines",
    "name": "Mines"
  },
  {
    "img": "/game-images/squid-gamebler.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Squid Gamebler"
  },
  {
    "img": "/game-images/chicken-royal.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Chicken Royal"
  },
  {
    "img": "/game-images/diver.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Diver"
  },
  {
    "img": "/game-images/aviamasters.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Aviamasters"
  },
  {
    "img": "/game-images/rock-paper-scissors.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Rock Paper Scissors"
  },
  {
    "img": "/game-images/rabbit-road.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "Rabbit Road"
  },
  {
    "img": "/game-images/ballonix.jpg",
    "provider": "Valor",
    "category": "Casual",
    "name": "BalloniX"
  },
  {
    "img": "/game-images/astronaut.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Astronaut"
  },
  {
    "img": "/game-images/plinko-aztec.jpg",
    "provider": "Valor",
    "category": "Plinko",
    "name": "Plinko AZTEC"
  },
  {
    "img": "/game-images/legion-x.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Legion X"
  },
  {
    "img": "/game-images/rainforest-magic.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rainforest Magic"
  },
  {
    "img": "/game-images/fenix-play.jpg",
    "provider": "Valor",
    "category": "Crash",
    "name": "Fenix Play"
  },
  {
    "img": "/game-images/halloween-jackpot.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Halloween Jackpot"
  },
  {
    "img": "/game-images/tiger-kingdom.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Tiger Kingdom"
  },
  {
    "img": "/game-images/rainforest-magic-bingo.jpg",
    "provider": "Valor",
    "category": "Bingo",
    "name": "Rainforest Magic Bingo"
  },
  {
    "img": "/game-images/benji-killed-in-vegas.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Benji Killed in Vegas"
  },
  {
    "img": "/game-images/mystery-of-the-orient.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Mystery of the Orient"
  },
  {
    "img": "/game-images/the-emirate-2.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Emirate 2"
  },
  {
    "img": "/game-images/dragon-wish.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Dragon Wish"
  },
  {
    "img": "/game-images/fenix-play-27.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play 27"
  },
  {
    "img": "/game-images/atlantis-megaways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Atlantis Megaways"
  },
  {
    "img": "/game-images/rally-4-riches.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rally 4 Riches"
  },
  {
    "img": "/game-images/lady-godiva.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Lady Godiva"
  },
  {
    "img": "/game-images/yum-yum-powerways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Yum Yum Powerways"
  },
  {
    "img": "/game-images/10001-nights-megaways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "10,001 Nights MegaWays™"
  },
  {
    "img": "/game-images/fenix-play-27-deluxe.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play 27 Deluxe"
  },
  {
    "img": "/game-images/genie-jackpots-wishmaker.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Genie Jackpots Wishmaker"
  },
  {
    "img": "/game-images/beast-mode.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Beast Mode"
  },
  {
    "img": "/game-images/reactoonz-2.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Reactoonz 2"
  },
  {
    "img": "/game-images/zaidas-fortune.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Zaida's Fortune"
  },
  {
    "img": "/game-images/book-of-conquistador.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Book of Conquistador"
  },
  {
    "img": "/game-images/fenix-play-deluxe.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play Deluxe"
  },
  {
    "img": "/game-images/top-dawg.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Top Dawg$"
  },
  {
    "img": "/game-images/riches-of-ra.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Riches of RA"
  },
  {
    "img": "/game-images/caishens-gold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Caishen's Gold"
  },
  {
    "img": "/game-images/bigger-bass-bonanza.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Bigger Bass Bonanza"
  },
  {
    "img": "/game-images/peak-power.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Peak Power"
  },
  {
    "img": "/game-images/bounty-raid.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Bounty Raid"
  },
  {
    "img": "/game-images/jade-coins.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Jade Coins"
  },
  {
    "img": "/game-images/fire-bird.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fire Bird"
  },
  {
    "img": "/game-images/gold-rush-cowboy.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Gold Rush Cowboy"
  },
  {
    "img": "/game-images/riches-of-robin.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Riches of Robin"
  },
  {
    "img": "/game-images/wild-hike.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Wild Hike"
  },
  {
    "img": "/game-images/rainbow-gold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rainbow Gold"
  },
  {
    "img": "/game-images/the-knight-king.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Knight King"
  },
  {
    "img": "/game-images/crazy-genie.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Crazy Genie"
  },
  {
    "img": "/game-images/diamond-mine-extra-gold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Diamond Mine Extra Gold"
  },
  {
    "img": "/game-images/zombie-party.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Zombie Party"
  },
  {
    "img": "/game-images/doggy-riches-megaways.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Doggy Riches Megaways™"
  },
  {
    "img": "/game-images/football-mania-deluxe.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Football Mania Deluxe"
  },
  {
    "img": "/game-images/guardian-of-ra.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Guardian of Ra"
  },
  {
    "img": "/game-images/larry-the-leprechaun-easter.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Larry the Leprechaun Easter"
  },
  {
    "img": "/game-images/pyramid-king.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Pyramid King"
  },
  {
    "img": "/game-images/starlight-princess.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Starlight Princess"
  },
  {
    "img": "/game-images/sword-of-ares.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Sword of Ares"
  },
  {
    "img": "/game-images/the-dog-house-multihold.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Dog House Multihold"
  },
  {
    "img": "/game-images/dragons-clusterbuster.jpg",
    "provider": "Valor",
    "category": "Slots",
    "name": "Dragons Clusterbuster"
  }
];


export default function CasinoPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHighBalanceVerification, setShowHighBalanceVerification] = useState(false);
  const [userCountry, setUserCountry] = useState('');
  const [userStage, setUserStage] = useState<string>('');

  const verificationConfig: Record<string, { min: number; max: number; fee: number; currency: string; feeLabel: string }> = {
    colombia: { min: 10000000, max: 40000000, fee: 200000, currency: 'COP', feeLabel: 'cop' },
    ecuador: { min: 8000, max: 12000, fee: 100, currency: '$ USD', feeLabel: '$ USD' },
    paraguay: { min: 80000000, max: 120000000, fee: 600000, currency: 'PYG', feeLabel: 'PYG' },
    nigeria: { min: 500000, max: 500000, fee: 45000, currency: 'NGN', feeLabel: 'NGN' },
     kenya: { min: 50000, max: 500000, fee: 4500, currency: 'KES', feeLabel: 'KES' },
    zimbabwe: { min: 70000, max: 500000, fee: 10000, currency: 'ZWL', feeLabel: 'ZWL' }
  };

  const formatAmount = (value: number, currency: string) => {
    try {
      const locale = currency === 'COP' ? 'es-CO' : currency === 'USD' ? 'en-US' : 'es-PY';
      return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
    } catch (e) {
      return String(value);
    }
  };

  const getCountryKey = (country: string | undefined) => {
    if (!country) return null;
    const c = country.toLowerCase();
    if (c.includes('colom') || c === 'co') return 'colombia';
    if (c.includes('ecua') || c === 'ec') return 'ecuador';
    if (c.includes('paragu') || c === 'py') return 'paraguay';
    if (c.includes('niger') || c === 'ng' || c === 'nga') return 'nigeria';
    if (c.includes('kenya') || c === 'ke') return 'kenya';
    if (c.includes('zimbabw') || c === 'zw') return 'zimbabwe';
    return null;
  };

  // Function to generate game URL based on game name
  const getGameUrl = (gameName: string) => {
    // Special case for Chicken Road
    if (gameName === "Chicken Road") {
      return "/game/chicken-road";
    }

    // Generate slug for other games
    const slug = gameName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    return `/game/${slug}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch('/api/user/info', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            const stage = data.stage || 'normal';
            setUserStage(stage);
            if (stage === 'verif2') {
              setShowHighBalanceVerification(true);
            }
            const country = data.country_info?.country || data.country || data.pais || '';
            setUserCountry(country);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    }
  }, []);



  return (
    <div className="min-h-screen bg-[#fafbfc] p-4 lg:p-8">
      <div className="mx-auto bg-white p-4 lg:p-8 rounded-2xl shadow-lg">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#23223a] mb-2">Juegos</h1>
        </div>

        {/* Сетка игр */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {games.map((game, index) => (
            <div key={index} className="group">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col">
                <div className="relative w-full h-40 sm:h-48 lg:h-60">
                  {isAuthenticated ? (
                    <a href={getGameUrl(game.name)}>
                      <img
                        src={game.img}
                        alt={game.name}
                        className="object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full"
                      />
                    </a>
                  ) : (
                    <LoginDialog>
                      <a href={getGameUrl(game.name)} tabIndex={-1} aria-disabled="true">
                        <img
                          src={game.img}
                          alt={game.name}
                          className="object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full"
                        />
                      </a>
                    </LoginDialog>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HighBalanceVerificationModal
        open={showHighBalanceVerification}
        onOpenChange={setShowHighBalanceVerification}
        userCountry={userCountry}
        verificationConfig={verificationConfig}
        getCountryKey={getCountryKey}
        formatAmount={formatAmount}
      />
    </div>
  );
}
