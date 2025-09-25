import ProfileSidebar from "../../components/ProfileSidebar";

export default function DetalizationPage() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-row items-start gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-8 bg-white rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="mb-8">
                        <h1 className="text-5xl font-black text-[#23223a] leading-tight">Historial de transacciones:<br /><span className="text-[#ffb32c]">depósitos</span></h1>
                    </div>
                    {/* Tabs */}
                    <div className="flex mb-6 bg-gray-200 rounded-3xl p-1">
                        <button className="px-8 py-2 rounded-2xl bg-white border-b-4 border-[#ffb32c] text-lg font-bold text-[#23223a] focus:outline-none">depósitos</button>
                        <button className="px-8 py-2 rounded-2xl text-[#23223a] ml-2 focus:outline-none">pagos</button>
                    </div>
                </div>
                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-[#ffb32c] text-white text-left">
                                <th className="py-4 px-6 rounded-tl-2xl">Fecha y Hora</th>
                                <th className="py-4 px-6">Transacción</th>
                                <th className="py-4 px-6">Monto</th>
                                <th className="py-4 px-6">Método de pago</th>
                                <th className="py-4 px-6 rounded-tr-2xl">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#23223a] text-base font-medium">
                            <tr className="border-b last:border-b-0">
                                <td className="py-3 px-6">19.09.2025 14:08</td>
                                <td className="py-3 px-6">Nº569310231</td>
                                <td className="py-3 px-6 font-bold">50000.00 COP</td>
                                <td className="py-3 px-6">NEQUI</td>
                                <td className="py-3 px-6"><span className="bg-green-500 text-white rounded-lg px-4 py-1 text-sm font-bold">Completed</span></td>
                            </tr>
                            <tr className="border-b last:border-b-0">
                                <td className="py-3 px-6">19.09.2025 14:06</td>
                                <td className="py-3 px-6">Nº140916680</td>
                                <td className="py-3 px-6 font-bold">50000.00 COP</td>
                                <td className="py-3 px-6">NEQUI</td>
                                <td className="py-3 px-6"><span className="bg-green-500 text-white rounded-lg px-4 py-1 text-sm font-bold">Completed</span></td>
                            </tr>
                            <tr className="border-b last:border-b-0">
                                <td className="py-3 px-6">19.09.2025 14:01</td>
                                <td className="py-3 px-6">Nº199501902</td>
                                <td className="py-3 px-6 font-bold">50000.00 COP</td>
                                <td className="py-3 px-6">NEQUI</td>
                                <td className="py-3 px-6"><span className="bg-green-500 text-white rounded-lg px-4 py-1 text-sm font-bold">Completed</span></td>
                            </tr>
                            <tr className="border-b last:border-b-0">
                                <td className="py-3 px-6">13.09.2025 11:42</td>
                                <td className="py-3 px-6">Nº352294468</td>
                                <td className="py-3 px-6 font-bold">100000.00 COP</td>
                                <td className="py-3 px-6">Banco Belo</td>
                                <td className="py-3 px-6"><span className="bg-green-500 text-white rounded-lg px-4 py-1 text-sm font-bold">Completed</span></td>
                            </tr>
                            <tr className="border-b last:border-b-0">
                                <td className="py-3 px-6">10.09.2025 09:03</td>
                                <td className="py-3 px-6">Nº641702360</td>
                                <td className="py-3 px-6 font-bold">50000.00 COP</td>
                                <td className="py-3 px-6">Banco Belo</td>
                                <td className="py-3 px-6"><span className="bg-green-500 text-white rounded-lg px-4 py-1 text-sm font-bold">Completed</span></td>
                            </tr>
                            <tr className="border-b last:border-b-0">
                                <td className="py-3 px-6">10.09.2025 08:58</td>
                                <td className="py-3 px-6">Nº912059034</td>
                                <td className="py-3 px-6 font-bold">50000.00 COP</td>
                                <td className="py-3 px-6">Banco Belo</td>
                                <td className="py-3 px-6"><span className="bg-green-500 text-white rounded-lg px-4 py-1 text-sm font-bold">Completed</span></td>
                            </tr>
                            <tr>
                                <td className="py-3 px-6">10.09.2025 08:42</td>
                                <td className="py-3 px-6">Nº870028897</td>
                                <td className="py-3 px-6 font-bold">50000.00 COP</td>
                                <td className="py-3 px-6">Banco Belo</td>
                                <td className="py-3 px-6"><span className="bg-green-500 text-white rounded-lg px-4 py-1 text-sm font-bold">Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
