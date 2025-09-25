
import ProfileSidebar from "@/components/ProfileSidebar";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-row items-start gap-6 p-4">
            {/* Sidebar */}
            <ProfileSidebar balance="202995.00COP" userId="12770156" />

            {/* Main content */}
            <main className="flex-1 flex flex-col items-center justify-start bg-white rounded-2xl p-10 shadow-lg">
                <h1 className="text-4xl font-black text-[#23223a] mt-6 mb-8 text-left w-full">
                    Mi perfil: <span className="text-[#ffb32c]">Datos personales</span>
                </h1>
                <section className="w-full bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-8 border border-[#ececf1]">
                    <h2 className="text-3xl font-black text-[#23223a] mb-4">Datos personales</h2>
                    <form className="grid grid-cols-4 gap-x-3 gap-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Nombre</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" defaultValue="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Apellido</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" defaultValue="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Cumpleaños</label>
                            <Input type="date" className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" defaultValue="1993-01-09" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Sexo</label>
                            <div className="flex gap-6 items-center h-full">
                                <label className="flex items-center gap-2 text-sm">
                                    <Input type="radio" name="gender" defaultChecked className="accent-[#23223a] w-5 h-5" /> Masculino
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <Input type="radio" name="gender" className="accent-[#23223a] w-5 h-5" /> Femenino
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 col-span-1">
                            <label className="text-sm text-[#a3a3b3] font-semibold">País</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" defaultValue="Colombia" />
                        </div>
                        <div className="flex flex-col gap-2 col-span-1">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Ciudad</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" defaultValue="" />
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Dirección</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" defaultValue="" />
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Número de teléfono</label>
                            <div className="flex gap-2">
                                <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg w-20" defaultValue="+57" />
                                <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg flex-1" defaultValue="(777) 777-777" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Correo electrónico</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg w-full" defaultValue="" />
                        </div>
                        <div className="flex gap-4 col-span-2 mt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-[#ffb32c] hover:bg-[#ff9800] text-white font-bold py-2 rounded-md shadow-[0_4px_0_0_#d89a2c] active:shadow-none active:translate-y-0.5 transition-all duration-100 border-0 text-base"
                            >
                                Actualizar datos
                            </button>
                            <button
                                type="button"
                                className="flex-1 bg-[#bdbdbd] text-white font-bold py-2 rounded-md shadow-[0_4px_0_0_#a3a3a3] active:shadow-none active:translate-y-0.5 transition-all duration-100 border-0 text-base"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}
