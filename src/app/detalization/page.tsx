import ProfileSidebar from "../../components/ProfileSidebar";

export default function DetalizationPage() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-row items-start gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-8 bg-white rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-[#23223a] leading-tight">Historial de transacciones:<br /><span className="text-[#ffb32c]">depósitos</span></h1>
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

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
