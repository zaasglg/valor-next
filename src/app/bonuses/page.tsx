"use client"

export default function BonusesPage() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] p-4" style={{ backgroundImage: 'url(/images/bonus_pattern.png)', backgroundRepeat: 'repeat' }}>
            <main className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative text-left py-12 md:py-24">
                    <div className="relative text-left">
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">¡El casino en línea más generoso!</h1>
                    </div>
                </div>

                {/* Welcome Bonus Section */}
                <section className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-2xl p-4 md:p-8 mb-6 md:mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                                    <span className="text-yellow-400">650%</span> Bono de Bienvenida
                                </h2>
                                <p className="text-white text-base md:text-lg">
                                    Reciba hasta <span className="text-yellow-400 font-bold">2000$</span> A tu saldo de bonificación acaba de incrementarse al recargar tu saldo de cuenta!
                                </p>
                            </div>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center gap-2 text-sm md:text-base">
                                <span>?</span>
                                Cómo funciona
                            </button>
                        </div>

                        {/* Bonus Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {/* First Bonus */}
                            <div className="text-center relative rounded-2xl">
                                <img src="/images/bonus_1.png" alt="Bonus" className="rounded-2xl w-full h-auto" />
                            </div>

                            {/* Second Bonus */}
                            <div className="rounded-2xl text-center relative">
                                <img src="/images/bonus_2.png" alt="Bonus" className="rounded-2xl w-full h-auto" />
                            </div>

                            {/* Third Bonus */}
                            <div className="rounded-2xl text-center relative">
                                <img src="/images/bonus_3.png" alt="Bonus" className="rounded-2xl w-full h-auto" />
                            </div>

                            {/* Fourth Bonus */}
                            <div className="rounded-2xl text-center relative">
                                <img src="/images/bonus_4.png" alt="Bonus" className="rounded-2xl w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </section>


                <section>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8 text-left">Todos los bonos</h2>
                </section>

                {/* Promo Code Section */}
                <section className="w-full md:w-3/12 bg-[#20204080] rounded-3xl p-3 md:p-3 relative overflow-hidden shadow-2xl">
                    {/* Background Pattern */}
                    <div className="">
                        <div className="rounded-2xl" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat'
                        }}>
                            <img src="/images/gygs8bif.png" alt="" className="rounded-2xl" />
                        </div>
                    </div>


                    {/* Text Section */}
                    <div className="text-center my-4 md:my-8 px-2 md:px-5">
                        <h2 className="text-lg md:text-xl font-black text-white mb-2 md:mb-4 text-left">
                            ¡Hasta un +400%  en tu depósito con un código promocional!
                        </h2>
                        <p className="text-left text-white text-sm md:text-lg opacity-90">
                            Cada código promocional es único y otorga del <span className="text-yellow-400 font-bold">+50%</span> al <span className="text-yellow-400 font-bold">+1000%</span> a tu saldo de bonificación.
                        </p>
                    </div>

                    {/* Input and Button Section */}
                    <div className="px-2 md:px-5">
                        <div className="mb-3 md:mb-4">
                            <input
                                type="text"
                                placeholder="..."
                                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl text-base md:text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg bg-white"
                            />
                        </div>
                        <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 md:py-2 px-4 md:px-6 rounded-xl shadow-[0_4px_0_0_#d97706] md:shadow-[0_6px_0_0_#d97706] hover:shadow-[0_2px_0_0_#d97706] md:hover:shadow-[0_3px_0_0_#d97706] active:shadow-[0_1px_0_0_#d97706] active:translate-y-1 transform transition-all duration-150 text-base md:text-lg border-b-2 md:border-b-3 border-orange-600 hover:border-orange-700 active:border-orange-800">
                            Confirmar
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}