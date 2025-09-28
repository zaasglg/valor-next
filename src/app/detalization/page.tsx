"use client"

import ProfileSidebar from "../../components/ProfileSidebar";
import { useState, useEffect } from "react";

interface PaymentHistory {
    id: number;
    user_id: string;
    transacciones_data: string;
    transacciones_monto: string;
    estado: string;
    transaccion_number: string;
    metodo_de_pago: string;
    phone: string;
    cuenta_corriente: string;
    numero_de_cuenta: string;
    tipo_de_documento: string;
    numero_documento: string;
    banco: string;
}

export default function DetalizationPage() {
    const [payments, setPayments] = useState<PaymentHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('/api/payment/history', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setPayments(data);
                }
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);
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
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 px-6 text-center">Cargando...</td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 px-6 text-center">No hay transacciones</td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            {new Date(payment.transacciones_data).toLocaleString('es-ES')}
                                        </td>
                                        <td className="py-4 px-6">{payment.transaccion_number}</td>
                                        <td className="py-4 px-6">${payment.transacciones_monto}</td>
                                        <td className="py-4 px-6">{payment.metodo_de_pago}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-sm ${payment.estado === 'completado' ? 'bg-green-100 text-green-800' :
                                                    payment.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {payment.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
