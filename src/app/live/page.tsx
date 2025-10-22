"use client"

import Image from "next/image";
import { LoginDialog } from "@/components/LoginDialog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
    "img": "https://valorbetxxl.top/cdn-cgi/imagedelivery/1nvGfW1exHCjskQD2_2iHA/game/99c3f70f501f42beee80d5fab22c445/defaultDesktop",
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


export default function LivePage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    }, []);

    const handleGameClick = (gameTitle: string) => {
        if (isAuthenticated) {
            console.log(`Запуск игры: ${gameTitle}`);
            router.push('/deposit');
        }
    };

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
        </div>
    );
}
