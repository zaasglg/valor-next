import ProfileSidebar from "../../components/ProfileSidebar";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function VerificationPage() {
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-row items-start gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-8 bg-white rounded-2xl">
                <form className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 border border-[#ecebfa]">
                    <h1 className="text-4xl font-black text-[#23223a] mb-8">Datos personales</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Nombre</label>
                            <Input defaultValue="Caesar" className="text-lg" />
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Apellido</label>
                            <Input defaultValue="Gomez" className="text-lg" />
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Cumpleaños</label>
                            <Input defaultValue="09-01-1993" className="text-lg" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#b3b3c3] mb-2">Sexo</label>
                        <div className="flex gap-8 items-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" defaultChecked className="accent-[#23223a] w-5 h-5" />
                                <span className="text-lg text-[#23223a]">Masculino</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" className="accent-[#b3b3c3] w-5 h-5" />
                                <span className="text-lg text-[#23223a]">Femenino</span>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">País</label>
                            <Input defaultValue="Colombia" className="text-lg bg-[#f5f5f7] shadow-md" readOnly />
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Ciudad</label>
                            <Input defaultValue="Туркестан" className="text-lg" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#b3b3c3] mb-2">Dirección</label>
                        <Input defaultValue="Саттарханова59" className="text-lg" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Número de teléfono</label>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center px-4 rounded-lg bg-[#f5f5f7] text-[#b3b3c3] text-lg border border-[#ecebfa]">+57</span>
                                <Input defaultValue="(123) 3423-423" className="text-lg" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Correo electrónico</label>
                            <Input defaultValue="taptap440st@gmail.com" className="text-lg bg-[#f5f5f7] shadow-md" readOnly />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button className="bg-[#ffb32c] hover:bg-[#ff9800] text-white text-lg font-bold px-12 py-3 rounded-xl shadow-[0_4px_0_0_#f5970a] active:shadow-none active:translate-y-0.5 transition-all duration-100 border-0">Actualizar datos</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
