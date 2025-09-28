

"use client"

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfileSidebar from "../../components/ProfileSidebar";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function WithdrawalPage() {
    const [balance, setBalance] = useState<string>('0.00');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setBalance(data.balance || '0.00');
                }
            } catch (error) {
                console.error('Error fetching balance:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-row items-start gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-8 bg-white rounded-2xl">
                <h1 className="text-5xl font-black text-[#23223a] mb-8">Retiro de fondos</h1>
                {/* Метод вывода */}
                <section className="bg-white rounded-2xl shadow-md p-8 mb-8 border">
                    <h2 className="text-2xl font-bold text-[#23223a] mb-6">Elige el método de retiro</h2>
                    <div className="flex gap-4">
                        <button className="border-2 border-[#3b3bb3] rounded-xl p-3 flex flex-col items-center w-24 h-28 bg-white focus:outline-none focus:ring-2 focus:ring-[#3b3bb3] relative">
                            <div className="absolute left-0 top-0 w-6 h-6 bg-[#3b3bb3] rounded-tl-lg rounded-br-xl flex items-center justify-center">
                                <Check size={8} color="white" />
                            </div>
                            <img src="https://static.valor.bet/withdrawal-methods/kGj8XKRlpkjZcEwRfNXZK3jXW0juYtqbH21QBnHV.svg" alt="" className="w-10 h-10 mt-2" />
                            <span className="mt-auto text-[#3b3bb3] font-bold text-[8px] leading-2 text-center">TRANSFERENCIA BANCARIA</span>
                        </button>
                    </div>
                </section>
                {/* Детали вывода */}
                <section className="bg-white rounded-2xl shadow-md p-8 mb-8 border">
                    <h2 className="text-3xl font-bold text-[#23223a] mb-2">Detalles de retiro</h2>
                    <div className="mb-6 text-lg text-[#23223a] font-semibold">Listo para retirar efectivo: <span className="font-black">{loading ? 'Cargando...' : `${balance} COP`}</span></div>
                    <form className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="withdraw-amount" className="text-base font-semibold text-[#8888A6] mb-1">Importe (Máx: {balance} COP)</label>
                            <Input id="withdraw-amount" type="number" placeholder="14600 COP" defaultValue="14600" className="mb-0" />
                        </div>
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="client-phone" className="text-base font-semibold text-[#8888A6] mb-1">Teléfono del cliente</label>
                            <Input id="client-phone" type="text" placeholder="Teléfono del cliente" className="mb-0" />
                        </div>
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="account-type" className="text-base font-semibold text-[#8888A6] mb-1">Cuenta corriente o ahorra</label>
                            <Input id="account-type" type="text" placeholder="Cuenta corriente o ahorra" className="mb-0" />
                        </div>
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="account-number" className="text-base font-semibold text-[#8888A6] mb-1">Número de cuenta</label>
                            <Input id="account-number" type="text" placeholder="Número de cuenta" className="mb-0" />
                        </div>
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="doc-type" className="text-base font-semibold text-[#8888A6] mb-1">Tipo de Documento</label>
                            <Input id="doc-type" type="text" placeholder="Tipo de Documento" className="mb-0" />
                        </div>
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="doc-number" className="text-base font-semibold text-[#8888A6] mb-1">Número del Documento</label>
                            <Input id="doc-number" type="text" placeholder="Número del Documento" className="mb-0" />
                        </div>
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="bank" className="text-base font-semibold text-[#8888A6] mb-1">Banco</label>
                            <Select>
                                <SelectTrigger className="w-full rounded-lg border border-gray-300 p-4 text-lg text-[#23223a] bg-gray-100">
                                    <SelectValue placeholder="Seleccione su banco" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bancolombia">Bancolombia</SelectItem>
                                    <SelectItem value="davivienda">Davivienda</SelectItem>
                                    <SelectItem value="bbva">BBVA</SelectItem>
                                    <SelectItem value="banco-bogota">Banco de Bogotá</SelectItem>
                                    <SelectItem value="banco-agrario">Banco Agrario</SelectItem>
                                    <SelectItem value="banco-popular">Banco Popular</SelectItem>
                                    <SelectItem value="banco-occidente">Banco de Occidente</SelectItem>
                                    <SelectItem value="banco-caja-social">Banco Caja Social</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-1 rounded-lg shadow-[0_4px_0_0_#14532d] active:shadow-none active:translate-y-0.5 transition-all duration-100 text-lg">Continuar</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}
