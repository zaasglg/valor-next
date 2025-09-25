import Image from "next/image";

const categories = [
    { name: "Roulette", count: 4 },
    { name: "Baccarat", count: 5 },
    { name: "Crash", count: 6 },
    { name: "Blackjack", count: 3 },
    { name: "instant win", count: 1 },
    { name: "Slots", count: 609 },
    { name: "Live", count: 6 },
    { name: "Valor Games", count: 26 },
    { name: "All Games", count: 717, checked: true },
];

const providers = [
    { name: "Playson", count: 3 },
];

const games = [
    { title: "10", img: "/images/games/10.png", provider: "Provider" },
    { title: "11", img: "/images/games/11.png", provider: "Provider" },
    { title: "12", img: "/images/games/12.png", provider: "Provider" },
    { title: "13", img: "/images/games/13.png", provider: "Provider" },
    { title: "14", img: "/images/games/14.png", provider: "Provider" },
    { title: "15", img: "/images/games/15.png", provider: "Provider" },
    { title: "16", img: "/images/games/16.png", provider: "Provider" },
    { title: "17", img: "/images/games/17.png", provider: "Provider" },
    { title: "18", img: "/images/games/18.png", provider: "Provider" },
    { title: "19", img: "/images/games/19.png", provider: "Provider" },
    { title: "20", img: "/images/games/20.png", provider: "Provider" },
    { title: "21", img: "/images/games/21.png", provider: "Provider" },
    { title: "22", img: "/images/games/22.png", provider: "Provider" },
    { title: "23", img: "/images/games/23.png", provider: "Provider" },
    { title: "24", img: "/images/games/24.png", provider: "Provider" },
    { title: "25", img: "/images/games/25.png", provider: "Provider" },
    { title: "26", img: "/images/games/26.png", provider: "Provider" },
    { title: "27", img: "/images/games/27.png", provider: "Provider" },
    { title: "28", img: "/images/games/28.png", provider: "Provider" },
    { title: "29", img: "/images/games/29.png", provider: "Provider" },
    { title: "30", img: "/images/games/30.png", provider: "Provider" },
    { title: "31", img: "/images/games/31.png", provider: "Provider" },
    { title: "32", img: "/images/games/32.png", provider: "Provider" },
    { title: "33", img: "/images/games/33.png", provider: "Provider" },
    { title: "34", img: "/images/games/34.png", provider: "Provider" },
    { title: "35", img: "/images/games/35.png", provider: "Provider" },
];

export default function AllGamesPage() {
    return (
        <div className="flex min-h-screen bg-[#fafbfc]">
            {/* Sidebar */}
            <aside className="w-[270px] p-8 bg-white border-r border-[#ecebfa] flex flex-col gap-8">
                <div>
                    <h2 className="font-bold text-[#23223a] text-lg mb-4">Categorías</h2>
                    <ul className="flex flex-col gap-2">
                        {categories.map((cat) => (
                            <li key={cat.name} className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={!!cat.checked} readOnly className="accent-[#23223a] w-5 h-5" />
                                    <span className="text-[#23223a] text-base">{cat.name}</span>
                                </label>
                                <span className="text-[#b3b3c3] text-base font-bold">{cat.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold text-[#23223a] text-lg mb-4">Proveedores</h2>
                    <ul className="flex flex-col gap-2">
                        {providers.map((prov) => (
                            <li key={prov.name} className="flex items-center justify-between">
                                <span className="text-[#b3b3c3] text-base">{prov.name}</span>
                                <span className="text-[#b3b3c3] text-base font-bold">{prov.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            {/* Main content */}
            <main className="flex-1 p-8">
                {/* Top banners */}
                <div className="flex gap-6 mb-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg w-[480px] bg-green-700 flex items-center justify-center relative bg-[url(/images/Bbv2-xdH.jpg)] bg-cover h-80">
                        <div className="absolute inset-0 flex flex-col items-center justify-end z-10 pb-10">
                            <div className="flex items-end gap-2 w-full px-5">
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/aviator.avif" alt="Aviator" width={120} height={120} className="w-full h-auto max-w-[120px] rounded-2xl border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/diver.jpeg" alt="Diver" width={90} height={90} className="w-full h-auto max-w-[120px] rounded-2xl border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/plinko.png" alt="Wheel" width={90} height={90} className="w-full h-auto max-w-[120px] rounded-2xl border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/mines.jpeg" alt="Mines" width={90} height={90} className="w-full h-auto max-w-[120px] rounded-2xl border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/chicken_road.png" alt="Chicken Road" width={90} height={90} className="w-full h-auto max-w-[120px] rounded-2xl border-4 border-white" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Image src="/images/plinko_1000.png" alt="Aztec Plinko" width={90} height={90} className="w-full h-auto max-w-[120px] rounded-2xl border-4 border-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 rounded-2xl overflow-hidden shadow-lg h-[220px] relative">
                        <Image src="/images/2-banner.png" alt="Aviator Banner" fill className="object-cover" />
                        <div className="absolute left-8 top-8 z-10">
                            <Image src="/icons/aviator_1.svg" alt="Aviator" width={80} height={80} />
                            <button className="mt-4 px-6 py-2 bg-[#ff2d55] text-white font-bold rounded-lg shadow">Hemen Oyna</button>
                        </div>
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-4 z-10">
                            <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow text-2xl">←</button>
                            <button className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow text-2xl">→</button>
                        </div>
                    </div>
                </div>
                {/* All Games */}
                <h1 className="text-3xl font-bold text-[#23223a] mb-8">All Games</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {games.map((game) => (
                        <div key={game.title} className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col items-center">
                            <div className="relative w-full h-60">
                                <Image src={game.img} alt={game.title} fill className="object-cover rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
