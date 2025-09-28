"use client"

export default function BonusesPage() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] p-4" style={{ backgroundImage: 'url(/images/bonus_pattern.png)', backgroundRepeat: 'repeat' }}>
            <main className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative  text-left py-24">
                    <div className="relative text-left">
                        <h1 className="text-5xl font-black text-white mb-4">¡El casino en línea más generoso!</h1>
                    </div>
                </div>

                {/* Welcome Bonus Section */}
                <section className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-4xl font-black text-white mb-2">
                                    <span className="text-yellow-400">650%</span> Bono de Bienvenida
                                </h2>
                                <p className="text-white text-lg">
                                    Reciba hasta <span className="text-yellow-400 font-bold">2000$</span> A tu saldo de bonificación acaba de incrementarse al recargar tu saldo de cuenta!
                                </p>
                            </div>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2">
                                <span>?</span>
                                Cómo funciona
                            </button>
                        </div>

                        {/* Bonus Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            {/* First Bonus */}
                            <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-xl p-6 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
                                <div className="relative z-10">
                                    <p className="text-white text-sm mb-2">Gana un bono de hasta 125% en tu primer depósito</p>
                                    <div className="text-6xl font-black text-yellow-400 mb-4">125%</div>
                                    <div className="absolute bottom-0 left-0 right-0">
                                        <div className="flex justify-center items-end space-x-1">
                                            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                                            <div className="w-4 h-4 bg-yellow-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Second Bonus */}
                            <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-xl p-6 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
                                <div className="relative z-10">
                                    <p className="text-white text-sm mb-2">Gana un bono de hasta 150% en tu segundo depósito</p>
                                    <div className="text-6xl font-black text-yellow-400 mb-4">150%</div>
                                    <div className="absolute bottom-0 left-0 right-0">
                                        <div className="flex justify-center items-end space-x-1">
                                            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                                            <div className="w-4 h-4 bg-yellow-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Third Bonus */}
                            <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-xl p-6 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
                                <div className="relative z-10">
                                    <p className="text-white text-sm mb-2">Gana un bono de hasta 175% en tu tercer depósito</p>
                                    <div className="text-6xl font-black text-yellow-400 mb-4">175%</div>
                                    <div className="absolute bottom-0 left-0 right-0">
                                        <div className="flex justify-center items-end space-x-1">
                                            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                                            <div className="w-4 h-4 bg-yellow-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Fourth Bonus */}
                            <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-xl p-6 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
                                <div className="relative z-10">
                                    <p className="text-white text-sm mb-2">Gana un bono de hasta 200% en tu cuarto depósito</p>
                                    <div className="text-6xl font-black text-yellow-400 mb-4">200%</div>
                                    <div className="absolute bottom-0 left-0 right-0">
                                        <div className="flex justify-center items-end space-x-1">
                                            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                            <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                                            <div className="w-4 h-4 bg-yellow-200 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
        </div >
    );
}