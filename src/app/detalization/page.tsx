"use client"

import ProfileSidebar from "../../components/ProfileSidebar";
import { useState, useEffect } from "react";

interface Transaction {
    id: number;
    user_id: string;
    transacciones_data: string;
    transacciones_monto: string;
    estado: string;
    transaccion_number: string;
    metodo_de_pago: string;
    amount_usd?: string;
    stage_processed?: boolean;
    currency?: string;
    exchange_rate?: string;
    created_at?: string;
}

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
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [payments, setPayments] = useState<PaymentHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('deposits');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                
                // Fetch transactions (deposits)
                const transactionsResponse = await fetch('/api/transactions/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (transactionsResponse.ok) {
                    const transactionsData = await transactionsResponse.json();
                    console.log('Transactions:', transactionsData);
                    setTransactions(transactionsData);
                }

                // Fetch payment history
                const paymentsResponse = await fetch('/api/historial_pagos/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (paymentsResponse.ok) {
                    const paymentsData = await paymentsResponse.json();
                    console.log('Payments:', paymentsData);
                    setPayments(paymentsData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-4 lg:p-8 bg-white rounded-2xl mt-5 lg:mt-0 w-full lg:w-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="mb-4 lg:mb-8">
                        <h1 className="text-xl lg:text-3xl font-black text-[#23223a] leading-tight">
                            Historial de transacciones:<br />
                            <span className="text-[#ffb32c]">{activeTab === 'deposits' ? 'depósitos' : 'pagos'}</span>
                        </h1>
                    </div>
                    {/* Tabs */}
                    <div className="flex mb-4 lg:mb-6 bg-gray-200 rounded-3xl p-1 w-full lg:w-auto">
                        <button 
                            onClick={() => setActiveTab('deposits')}
                            className={`flex-1 lg:flex-none px-4 lg:px-8 py-2 rounded-2xl text-sm lg:text-lg font-bold focus:outline-none transition-all ${
                                activeTab === 'deposits' 
                                    ? 'bg-white border-b-4 border-[#ffb32c] text-[#23223a]' 
                                    : 'text-[#23223a] hover:bg-gray-100'
                            }`}
                        >
                            depósitos
                        </button>
                        <button 
                            onClick={() => setActiveTab('payments')}
                            className={`flex-1 lg:flex-none px-4 lg:px-8 py-2 rounded-2xl ml-2 text-sm lg:text-base focus:outline-none transition-all ${
                                activeTab === 'payments' 
                                    ? 'bg-white border-b-4 border-[#ffb32c] text-[#23223a] font-bold' 
                                    : 'text-[#23223a] hover:bg-gray-100'
                            }`}
                        >
                            pagos
                        </button>
                    </div>
                </div>
                {/* Table */}
                <div className="bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-lg overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-[#ffb32c] text-white text-left">
                                <th className="py-2 lg:py-4 px-2 lg:px-6 rounded-tl-none lg:rounded-tl-2xl text-xs lg:text-base">Fecha y Hora</th>
                                <th className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-base">Transacción</th>
                                <th className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-base">Monto</th>
                                <th className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-base hidden md:table-cell">Método de pago</th>
                                <th className="py-2 lg:py-4 px-2 lg:px-6 rounded-tr-none lg:rounded-tr-2xl text-xs lg:text-base">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#23223a] text-sm lg:text-base font-medium">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-4 lg:py-8 px-2 lg:px-6 text-center text-sm lg:text-base">Cargando...</td>
                                </tr>
                            ) : (activeTab === 'deposits' ? transactions.length === 0 : payments.length === 0) ? (
                                <tr>
                                    <td colSpan={5} className="py-4 lg:py-8 px-2 lg:px-6 text-center text-sm lg:text-base">No hay transacciones</td>
                                </tr>
                            ) : (
                                (activeTab === 'deposits' ? transactions : payments).map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">
                                            {new Date(item.transacciones_data).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">{item.transaccion_number}</td>
                                        <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm">
                                            {activeTab === 'deposits' && 'currency' in item && item.currency 
                                                ? `${item.transacciones_monto} ${item.currency}`
                                                : `$${item.transacciones_monto}`
                                            }
                                        </td>
                                        <td className="py-2 lg:py-4 px-2 lg:px-6 text-xs lg:text-sm hidden md:table-cell">{item.metodo_de_pago}</td>
                                        <td className="py-2 lg:py-4 px-2 lg:px-6">
                                            <span className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm ${
                                                item.estado === 'completado' ? 'bg-green-100 text-green-800' :
                                                item.estado === 'esperando' ? 'bg-yellow-100 text-yellow-800' :
                                                item.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {item.estado}
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
