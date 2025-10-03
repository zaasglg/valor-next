"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { LoginDialog } from "@/components/LoginDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    name: "Aviator"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/chicken-road-97/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "Chicken Road"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/wheel/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "Wheel"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/platform-mines/defaultDesktop",
    "provider": "Valor",
    "category": "Mines",
    "name": "Mines"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/squid-game/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "Squid Gamebler"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/chicken-royal/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "Chicken Royal"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/diver/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "Diver"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/edbbb9801cfa4ff4bc78d0bf72b6c1a4/defaultDesktop",
    "provider": "Valor",
    "category": "Crash",
    "name": "Aviamasters"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/rock-paper-scissors/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "Rock Paper Scissors"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/rabbit-road-inout/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "Rabbit Road"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/ballonix/defaultDesktop",
    "provider": "Valor",
    "category": "Casual",
    "name": "BalloniX"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/0195a3f0-c832-7a98-9e0b-081a29d64a42/defaultDesktop",
    "provider": "Valor",
    "category": "Crash",
    "name": "Astronaut"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/plinko-aztec/defaultDesktop",
    "provider": "Valor",
    "category": "Plinko",
    "name": "Plinko AZTEC"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/7e5ca23c65ed236bd1ba141a1e4080f41dd525cf/defaultDesktop",
    "provider": "Valor",
    "category": "Crash",
    "name": "Legion X"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/feba7cd4047e4b379ffe655db6ac485a/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rainforest Magic"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/9faecd9e667902d42afdafd07911b42ac4e7fedf/defaultDesktop",
    "provider": "Valor",
    "category": "Crash",
    "name": "Fenix Play"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/c34a7c3a1c0c034c0d99be6a41296f4203627920/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Halloween Jackpot"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/5fc8654db0b65e6dd624f055039ad9e4757618d8/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Tiger Kingdom"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/765cce4791e442faa0a0ecef530d04c2/defaultDesktop",
    "provider": "Valor",
    "category": "Bingo",
    "name": "Rainforest Magic Bingo"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/d304cbd364e645c6b492c9c483b61a2a/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Benji Killed in Vegas"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/5d8bcd7edc3a470d91d409ec95484612/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Mystery of the Orient"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/967ded778fa722390ff476575a3b4ac693f4f686/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Emirate 2"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/0aab74569b174f8291eb083d8d1b5522/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Dragon Wish"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/76a9afe3f946f7f589825487d0a5882dfaeffce2/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play 27"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/454988c4498024ea490e292b8699a3f8a63a55d7/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Atlantis Megaways"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/70a5b99eeca64fd68073c59b691321ef/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rally 4 Riches"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/043bab077d4e43c1ad5749962e3755f0/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Lady Godiva"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/63d6866a7465a5c194d651b8aa24f22aa5f49f2f/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Yum Yum Powerways"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/159830f50ce1477cb8b0e463c0eb893a/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "10,001 Nights MegaWays™"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/a67aca65c0efae95e45b14148a33d297f3d6c2bc/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play 27 Deluxe"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/db81382589cb6c96b93b69fcc62465f02bc48079/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Genie Jackpots Wishmaker"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/34f6f19f61448b34f7424d4fd90e8df3f5dcaf62/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Beast Mode"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/0d92a5cd0e0541988c57d5ed5241bd3b/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Reactoonz 2"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/ae30f12dff39463f8424c92fd25fb7b8/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Zaida's Fortune"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/fc3ba94b1a939d401e36107f4383c236c33efbc3/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Book of Conquistador"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/af7123137bbdd68832f01470c97261bafe896ef0/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fenix Play Deluxe"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/6cf238e263e6e5fa5fa5bf25e2e6c1af80a19d9b/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Top Dawg$"
  },
    {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/b87da8b814ab43cabab46408dc2cc2de/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Riches of RA"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/7dcd9e790002493da6a47050f4e203c6/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Caishen's Gold"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/d27a551599ae87d4128471426bc030c9a49ceec1/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Bigger Bass Bonanza"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/d6c2368d5e604de3b77481933369817f/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Peak Power"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/f3f04d468ed5412e9c011cd21efa77c4/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Bounty Raid"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/19d8e0ef6e1e91b9073a1161dc92f90bf0854bf5/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Jade Coins"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/1a8113c7402d216dccb7c1fd97b5b12a45294f60/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Fire Bird"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/084a8329d3629f7aa36fc8635f7e62baefa9925e/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Gold Rush Cowboy"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/53026ed79bf645dd808fd1b147ad3a2a/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Riches of Robin"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/9e86a33b01da430ab77e34af37d6fdd2/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Wild Hike"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/351395c796c70799f80b1db73b6c68920899598c/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rainbow Gold"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/a12757a2601841b29b31843d2f01a1e2/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Knight King"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/83f3d122771f45fd946eff1b73b3131d/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Crazy Genie"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/f97554a7e482889bc27c2ee5a092f0f37d16a076/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Diamond Mine Extra Gold"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/09e822a9345ef9ff16c98b2c7e1c4c1b6034b958/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Zombie Party"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/6bed1ba7f9524de6867fc2f1b0d88737/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Doggy Riches Megaways™"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/a2af64cc2e3a53316b9641f5eff8fba129b083ef/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Football Mania Deluxe"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/99f59e9feb91bfa7b1fcf3f6a493b6fbb38fddfe/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Guardian of Ra"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/efbb228b21ddcaa36f2e69f9a0a3ce7b705b2933/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Larry the Leprechaun Easter"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/99c3f70f501f42be9ee80d5fab22c445/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Rise of Atlantis"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/c75a3df627864bf79a1d1a73d20dec88/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Pyramid King"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/313efcd80394003d9f57a75d99356f4296055670/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Starlight Princess"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/915addd1fe104863e65027dafc233577df3f690f/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Sword of Ares"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/03f4c89207be4570bd2d14c86cc3ccc8/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "The Dog House Multihold"
  },
  {
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/cf488b7990944878ad0ab13d1c3653c0/defaultDesktop",
    "provider": "Valor",
    "category": "Slots",
    "name": "Dragons Clusterbuster"
  }
];

export default function AllGamesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Games",
  ]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopButton, setActiveTopButton] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
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
      return games.filter((game) => 
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
      categoryMatch = selectedCategories.some(category => {
        if (category === "Valor Games") {
          return game.provider === "Valor";
        }
        if (category === "Live") {
          return game.category === "En Vivo";
        }
        if (category === "instant win") {
          return game.category === "Crash" || 
                 game.category === "Mines" || 
                 game.category === "Plinko";
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
    <div className="flex min-h-screen bg-[#fafbfc]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Barra lateral */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-[270px] 2xl:w-[320px] 2xl:p-10 bg-white border-r border-[#ecebfa] flex flex-col gap-4 lg:gap-8 2xl:gap-10 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden self-end mb-2 p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Top Games Section */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
            {/* Top Juegos */}
            <button 
              onClick={() => handleTopButtonClick("top")}
              className={`w-full flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                activeTopButton === "top" ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className={`font-semibold text-sm ${
                  activeTopButton === "top" ? "text-blue-600" : "text-[#23223a]"
                }`}>Top Juegos</span>
              </div>
              <span className="text-[#b3b3c3] text-sm font-medium">13</span>
            </button>

            {/* Calientes */}
            <button 
              onClick={() => handleTopButtonClick("hot")}
              className={`w-full flex items-center justify-between py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                activeTopButton === "hot" ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={`font-semibold text-sm ${
                  activeTopButton === "hot" ? "text-blue-600" : "text-[#23223a]"
                }`}>Calientes</span>
              </div>
              <span className="text-[#b3b3c3] text-sm font-medium">9</span>
            </button>

            {/* Popular */}
            <button 
              onClick={() => handleTopButtonClick("popular")}
              className={`w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors duration-200 ${
                activeTopButton === "popular" ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className={`font-semibold text-sm ${
                  activeTopButton === "popular" ? "text-blue-600" : "text-[#23223a]"
                }`}>Popular</span>
              </div>
              <span className="text-[#b3b3c3] text-sm font-medium">11</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg bg-white text-sm placeholder-[#b3b3c3] focus:outline-none focus:ring-2 focus:ring-[#23223a] focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-4 w-4 text-[#b3b3c3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4 2xl:mb-6">
            <h2 className="font-bold text-[#23223a] text-lg 2xl:text-xl">
              Categorías
            </h2>
            <button
              onClick={() => setSelectedCategories(["All Games"])}
              className="text-sm 2xl:text-base text-[#b3b3c3] hover:text-[#23223a] transition-colors"
            >
              Limpiar
            </button>
          </div>
          <ul className="space-y-0">
            {categories.map((cat, index) => (
              <li key={cat.name} className={`flex items-center justify-between py-3 ${
                index < categories.length - 1 ? 'border-b border-gray-100' : ''
              }`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => handleCategoryChange(cat.name)}
                    className={`w-4 h-4 rounded-sm border-2 ${
                      selectedCategories.includes(cat.name)
                        ? 'bg-[#23223a] border-[#23223a] accent-[#23223a]'
                        : 'border-gray-300'
                    }`}
                  />
                  <span className={`text-sm ${
                    selectedCategories.includes(cat.name)
                      ? 'text-[#23223a] font-semibold'
                      : 'text-gray-600'
                  }`}>
                    {cat.name}
                  </span>
                </label>
                <span className={`text-sm ${
                  selectedCategories.includes(cat.name)
                    ? 'text-[#23223a] font-semibold'
                    : 'text-gray-400'
                }`}>
                  {cat.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <main className="flex-1 p-4 lg:p-8 2xl:p-12 pt-16 lg:pt-8 2xl:pt-12">
        {/* Banners superiores */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 2xl:gap-8 mb-6 lg:mb-8 2xl:mb-12">
          <div className="overflow-hidden w-full lg:w-5/12 bg-green-700 rounded-2xl 2xl:rounded-3xl flex items-center justify-center relative bg-[url(/images/Bbv2-xdH.jpg)] bg-cover h-64 lg:h-64 2xl:h-[45em]">
            <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-10 2xl:pb-16">
              <div className="flex items-end gap-1 lg:gap-2 2xl:gap-3 w-full px-2 lg:px-5 2xl:px-8">
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/images/aviator.avif"
                    alt="Aviador"
                    width={120}
                    height={120}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/images/diver.jpeg"
                    alt="Buzo"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/images/plinko.png"
                    alt="Rueda"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/images/mines.jpeg"
                    alt="Minas"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/images/chicken_road.png"
                    alt="Camino del Pollo"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/images/plinko_1000.png"
                    alt="Plinko Azteca"
                    width={90}
                    height={90}
                    className="w-full h-auto max-w-[60px] lg:max-w-[120px] 2xl:max-w-[160px] rounded-2xl 2xl:rounded-3xl border-2 lg:border-4 2xl:border-6 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full lg:w-7/12 h-64 2xl:h-[45em] relative overflow-hidden">
            <Carousel
              opts={{ align: "start", loop: true, slidesToScroll: 1 }}
              className="[&_.carousel-previous]:hidden [&_.carousel-next]:hidden [&_.carousel-dots]:hidden"
            >
              <CarouselContent className="flex h-full">
                <CarouselItem className="basis-full h-full">
                  {isAuthenticated ? (
                    <div className="h-full w-full relative">
                      <Image
                        src="/images/1-banner.jpg"
                        alt="imagen del banner"
                        className="rounded-lg 2xl:rounded-2xl w-full h-full object-contain cursor-pointer"
                        width={1200}
                        height={400}
                        loading="lazy"
                        priority={false}
                        onClick={handleCarouselClick}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    <LoginDialog>
                      <div className="h-full w-full relative">
                        <Image
                          src="/images/1-banner.jpg"
                          alt="imagen del banner"
                          className="rounded-lg 2xl:rounded-2xl w-full h-full object-contain cursor-pointer"
                          width={1200}
                          height={400}
                          loading="lazy"
                          priority={false}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </LoginDialog>
                  )}
                </CarouselItem>
                <CarouselItem className="basis-full h-full">
                  {isAuthenticated ? (
                    <div className="h-full w-full relative">
                      <Image
                        src="/images/2-banner.jpg"
                        alt="imagen del banner"
                        className="rounded-lg 2xl:rounded-2xl w-full h-full object-contain cursor-pointer"
                        width={1200}
                        height={400}
                        loading="lazy"
                        priority={false}
                        onClick={handleCarouselClick}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    <LoginDialog>
                      <div className="h-full w-full relative">
                        <Image
                          src="/images/2-banner.jpg"
                          alt="imagen del banner"
                          className="rounded-lg 2xl:rounded-2xl w-full h-full object-contain cursor-pointer"
                          width={1200}
                          height={400}
                          loading="lazy"
                          priority={false}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </LoginDialog>
                  )}
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        {/* Todos los Juegos */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-6 lg:my-8 2xl:my-12 gap-2 2xl:gap-4">
          <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-[#23223a]">
            Todos los Juegos
          </h1>
          <span className="text-[#b3b3c3] text-base lg:text-lg 2xl:text-xl">
            {filteredGames.length}{" "}
            {filteredGames.length === 1 ? "juego" : "juegos"}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-2 lg:gap-3 2xl:gap-4">
          {filteredGames.map((game, index) => (
            <div
              key={index}
              className="rounded-2xl 2xl:rounded-3xl overflow-hidden duration-300"
            >
              <div className="relative w-full h-40 sm:h-48 lg:h-60 2xl:h-72">
                {isAuthenticated ? (
                  <Link href="/game">
                    <img
                      src={game.img}
                      alt={game.name}
                      className="object-cover rounded-xl 2xl:rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={handleGameClick}
                    />
                  </Link>
                ) : (
                  <LoginDialog>
                    <Link href="/game" tabIndex={-1} aria-disabled="true">
                      <img
                        src={game.img}
                        alt={game.name}
                        className="object-cover rounded-xl 2xl:rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </LoginDialog>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
