

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfileSidebar from "../../components/ProfileSidebar";

export default function WithdrawalPage() {

    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-row items-start gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-8 bg-white rounded-2xl">
                <h1 className="text-5xl font-black text-[#23223a] mb-8">Retiro de fondos</h1>
                {/* Метод вывода */}
                <section className="bg-white rounded-2xl shadow-md p-8 mb-8 border max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#23223a] mb-6">Elige el método de retiro</h2>
                    <div className="flex gap-4">
                        <button className="border-2 border-[#3b3bb3] rounded-xl p-3 flex flex-col items-center w-24 h-32 bg-white focus:outline-none focus:ring-2 focus:ring-[#3b3bb3] relative">
                            <span className="absolute left-1.5 top-1.5 w-4 h-4 bg-[#3b3bb3] rounded-full flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="white" /><path d="M5 8.5L7 10.5L11 6.5" stroke="#3b3bb3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            <img src="https://static.valor.bet/withdrawal-methods/kGj8XKRlpkjZcEwRfNXZK3jXW0juYtqbH21QBnHV.svg" alt="" className="w-10 h-10 mt-2" />
                            <span className="mt-2 text-[#3b3bb3] font-bold text-[8px] leading-2 text-center">TRANSFERENCIA BANCARIA</span>
                        </button>
                    </div>
                </section>
                {/* Детали вывода */}
                <section className="bg-white rounded-2xl shadow-md p-8 mb-8 border max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#23223a] mb-2">Detalles de retiro</h2>
                    <div className="mb-6 text-lg text-[#23223a] font-semibold">Listo para retirar efectivo: <span className="font-black">202995.00COP</span></div>
                    <form className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col col-span-1">
                            <label htmlFor="withdraw-amount" className="text-base font-semibold text-[#8888A6] mb-1">Importe (Máx: )</label>
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
