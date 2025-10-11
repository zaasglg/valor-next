"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LoginDialog } from "@/components/LoginDialog";
import { GameModeDialog } from "@/components/GameModeDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  { name: "Crash", count: 8 },
  { name: "Valor Games", count: 28 },
  { name: "All Games", count: 1342, checked: true },
  { name: "instant win", count: 1 },
  { name: "Slots", count: 1179 },
  { name: "Live", count: 44 },
  { name: "Blackjack", count: 23 },
  { name: "Baccarat", count: 12 },
  { name: "Roulette", count: 15 },
];

const providers = [
  { name: "PragmaticPlay", count: 0 },
  { name: "Evolution Gaming", count: 0 },
  { name: "NetEnt", count: 0 },
  { name: "Microgaming", count: 0 },
  { name: "Play'n GO", count: 0 },
  { name: "Red Tiger", count: 0 },
  { name: "Yggdrasil", count: 0 },
  { name: "Big Time Gaming", count: 0 },
  { name: "Push Gaming", count: 0 },
  { name: "Relax Gaming", count: 0 },
];

const games = [
  // PragmaticPlay Games
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/aviator/defaultDesktop",
    provider: "PragmaticPlay",
    category: "Crash",
    name: "Aviator",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/chicken-road-97/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "Chicken Road",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/wheel/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "Wheel",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/platform-mines/defaultDesktop",
    provider: "Valor",
    category: "Mines",
    name: "Mines",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/squid-game/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "Squid Gamebler",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/chicken-royal/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "Chicken Royal",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/diver/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "Diver",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/edbbb9801cfa4ff4bc78d0bf72b6c1a4/defaultDesktop",
    provider: "Valor",
    category: "Crash",
    name: "Aviamasters",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/rock-paper-scissors/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "Rock Paper Scissors",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/rabbit-road-inout/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "Rabbit Road",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/ballonix/defaultDesktop",
    provider: "Valor",
    category: "Casual",
    name: "BalloniX",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/0195a3f0-c832-7a98-9e0b-081a29d64a42/defaultDesktop",
    provider: "Valor",
    category: "Crash",
    name: "Astronaut",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/plinko-aztec/defaultDesktop",
    provider: "Valor",
    category: "Plinko",
    name: "Plinko AZTEC",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/7e5ca23c65ed236bd1ba141a1e4080f41dd525cf/defaultDesktop",
    provider: "Valor",
    category: "Crash",
    name: "Legion X",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/feba7cd4047e4b379ffe655db6ac485a/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Rainforest Magic",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/9faecd9e667902d42afdafd07911b42ac4e7fedf/defaultDesktop",
    provider: "Valor",
    category: "Crash",
    name: "Fenix Play",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/c34a7c3a1c0c034c0d99be6a41296f4203627920/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Halloween Jackpot",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/5fc8654db0b65e6dd624f055039ad9e4757618d8/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Tiger Kingdom",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/765cce4791e442faa0a0ecef530d04c2/defaultDesktop",
    provider: "Valor",
    category: "Bingo",
    name: "Rainforest Magic Bingo",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/d304cbd364e645c6b492c9c483b61a2a/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Benji Killed in Vegas",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/5d8bcd7edc3a470d91d409ec95484612/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Mystery of the Orient",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/967ded778fa722390ff476575a3b4ac693f4f686/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "The Emirate 2",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/0aab74569b174f8291eb083d8d1b5522/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Dragon Wish",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/76a9afe3f946f7f589825487d0a5882dfaeffce2/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Fenix Play 27",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/454988c4498024ea490e292b8699a3f8a63a55d7/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Atlantis Megaways",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/70a5b99eeca64fd68073c59b691321ef/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Rally 4 Riches",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/043bab077d4e43c1ad5749962e3755f0/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Lady Godiva",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/63d6866a7465a5c194d651b8aa24f22aa5f49f2f/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Yum Yum Powerways",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/159830f50ce1477cb8b0e463c0eb893a/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "10,001 Nights MegaWays™",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/a67aca65c0efae95e45b14148a33d297f3d6c2bc/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Fenix Play 27 Deluxe",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/db81382589cb6c96b93b69fcc62465f02bc48079/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Genie Jackpots Wishmaker",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/34f6f19f61448b34f7424d4fd90e8df3f5dcaf62/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Beast Mode",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/0d92a5cd0e0541988c57d5ed5241bd3b/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Reactoonz 2",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/ae30f12dff39463f8424c92fd25fb7b8/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Zaida's Fortune",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/fc3ba94b1a939d401e36107f4383c236c33efbc3/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Book of Conquistador",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/af7123137bbdd68832f01470c97261bafe896ef0/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Fenix Play Deluxe",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/6cf238e263e6e5fa5fa5bf25e2e6c1af80a19d9b/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Top Dawg$",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/b87da8b814ab43cabab46408dc2cc2de/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Riches of RA",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/7dcd9e790002493da6a47050f4e203c6/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Caishen's Gold",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/d27a551599ae87d4128471426bc030c9a49ceec1/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Bigger Bass Bonanza",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/d6c2368d5e604de3b77481933369817f/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Peak Power",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/f3f04d468ed5412e9c011cd21efa77c4/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Bounty Raid",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/19d8e0ef6e1e91b9073a1161dc92f90bf0854bf5/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Jade Coins",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/1a8113c7402d216dccb7c1fd97b5b12a45294f60/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Fire Bird",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/084a8329d3629f7aa36fc8635f7e62baefa9925e/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Gold Rush Cowboy",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/53026ed79bf645dd808fd1b147ad3a2a/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Riches of Robin",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/9e86a33b01da430ab77e34af37d6fdd2/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Wild Hike",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/351395c796c70799f80b1db73b6c68920899598c/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Rainbow Gold",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/a12757a2601841b29b31843d2f01a1e2/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "The Knight King",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/83f3d122771f45fd946eff1b73b3131d/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Crazy Genie",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/f97554a7e482889bc27c2ee5a092f0f37d16a076/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Diamond Mine Extra Gold",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/09e822a9345ef9ff16c98b2c7e1c4c1b6034b958/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Zombie Party",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/6bed1ba7f9524de6867fc2f1b0d88737/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Doggy Riches Megaways™",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/a2af64cc2e3a53316b9641f5eff8fba129b083ef/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Football Mania Deluxe",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/99f59e9feb91bfa7b1fcf3f6a493b6fbb38fddfe/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Guardian of Ra",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/efbb228b21ddcaa36f2e69f9a0a3ce7b705b2933/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Larry the Leprechaun Easter",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/99c3f70f501f42be9ee80d5fab22c445/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Rise of Atlantis",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/c75a3df627864bf79a1d1a73d20dec88/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Pyramid King",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/313efcd80394003d9f57a75d99356f4296055670/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Starlight Princess",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/915addd1fe104863e65027dafc233577df3f690f/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Sword of Ares",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/03f4c89207be4570bd2d14c86cc3ccc8/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "The Dog House Multihold",
  },
  {
    img: "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/cf488b7990944878ad0ab13d1c3653c0/defaultDesktop",
    provider: "Valor",
    category: "Slots",
    name: "Dragons Clusterbuster",
  },
];

export default function GamePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Games",
  ]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showGameModeDialog, setShowGameModeDialog] = useState(true);
  const [gameMode, setGameMode] = useState<'demo' | 'real' | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopButton, setActiveTopButton] = useState<string>("");

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

  const handleCarouselClick = () => {
    if (isAuthenticated) {
      router.push("/deposit");
    }
  };

  const handleGameClick = () => {
    if (isAuthenticated) {
      // Aquí se puede agregar lógica para iniciar el juego
      console.log("Iniciando juego");
      // Por ejemplo, abrir el juego en una nueva ventana o redirigir a la página del juego
      // window.open('/game', '_blank');
      // O redirigir a la página de depósito
      router.push("/deposit");
    }
    // Para usuarios no autenticados, LoginDialog se mostrará a través del wrapper
  };

  const handleCategoryChange = (categoryName: string) => {
    if (categoryName === "All Games") {
      setSelectedCategories(["All Games"]);
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.filter((cat) => cat !== "All Games");
        if (newCategories.includes(categoryName)) {
          return newCategories.filter((cat) => cat !== categoryName);
        } else {
          return [...newCategories, categoryName];
        }
      });
    }
    // Cerrar menú móvil después de seleccionar categoría
    setIsMobileMenuOpen(false);
  };

  const handleProviderChange = (providerName: string) => {
    setSelectedProviders((prev) => {
      if (prev.includes(providerName)) {
        return prev.filter((prov) => prov !== providerName);
      } else {
        return [...prev, providerName];
      }
    });
    // Cerrar menú móvil después de seleccionar proveedor
    setIsMobileMenuOpen(false);
  };

  const handleTopButtonClick = (buttonType: string) => {
    setActiveTopButton(buttonType);
    // Aquí puedes agregar lógica específica para cada tipo de botón
    // Por ejemplo, filtrar juegos por popularidad, tendencias, etc.
    console.log(`Clicked ${buttonType} button`);
  };

  // Conteo de juegos por categorías
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === "All Games") {
      return games.length;
    }
    if (categoryName === "Valor Games") {
      return games.filter((game) => game.provider === "Valor").length;
    }
    if (categoryName === "Live") {
      return games.filter((game) => game.category === "En Vivo").length;
    }
    if (categoryName === "instant win") {
      return games.filter(
        (game) =>
          game.category === "Crash" ||
          game.category === "Mines" ||
          game.category === "Plinko"
      ).length;
    }
    return games.filter((game) => game.category === categoryName).length;
  };

  // Conteo de juegos por proveedores
  const getProviderCount = (providerName: string) => {
    return games.filter((game) => game.provider === providerName).length;
  };

  // Filtrado de juegos
  const filteredGames = games.filter((game) => {
    // Filtrado por búsqueda
    const searchMatch =
      searchQuery === "" ||
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Si se selecciona la categoría "All Games", mostramos todos los juegos
    if (selectedCategories.includes("All Games")) {
      return searchMatch;
    }

    // Filtrado por categorías
    let categoryMatch = false;
    if (selectedCategories.length === 0) {
      categoryMatch = true;
    } else {
      categoryMatch = selectedCategories.some((category) => {
        if (category === "Valor Games") {
          return game.provider === "Valor";
        }
        if (category === "Live") {
          return game.category === "En Vivo";
        }
        if (category === "instant win") {
          return (
            game.category === "Crash" ||
            game.category === "Mines" ||
            game.category === "Plinko"
          );
        }
        return game.category === category;
      });
    }

    // Filtrado por proveedores
    const providerMatch =
      selectedProviders.length === 0 ||
      selectedProviders.includes(game.provider);

    return searchMatch && categoryMatch && providerMatch;
  });

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
