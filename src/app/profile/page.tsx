"use client"

import ProfileSidebar from "@/components/ProfileSidebar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        country: "Colombia",
        nombre: "",
        apellido: "",
        cumpleanos: "1993-01-09",
        sexo: "masculino",
        ciudad: "",
        direccion: "",
        numero_de_telefono: ""
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('/api/user/info', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        email: data.email || "",
                        password: "",
                        country: data.country || "Colombia",
                        nombre: data.nombre || "",
                        apellido: data.apellido || "",
                        cumpleanos: data.cumpleanos || "1993-01-09",
                        sexo: data.sexo || "masculino",
                        ciudad: data.ciudad || "",
                        direccion: data.direccion || "",
                        numero_de_telefono: data.numero_de_telefono || ""
                    });
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('/api/profile/update/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Perfil actualizado exitosamente');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
            {/* Sidebar */}
            <ProfileSidebar balance="0.00COP" userId="0" />

            {/* Main content */}
            <main className="w-full flex-1 flex flex-col items-center justify-start bg-white rounded-2xl p-4 lg:p-10 shadow-lg mt-10 lg:mt-0">
                <h1 className="text-2xl lg:text-4xl font-black text-[#23223a] mt-3 lg:mt-6 mb-4 lg:mb-8 text-left w-full">
                    Mi perfil: <span className="text-[#ffb32c]">Datos personales</span>
                </h1>
                <section className="w-full bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-xl p-4 lg:p-10 flex flex-col gap-4 lg:gap-8 border-0 lg:border border-[#ececf1]">
                    <h2 className="text-xl lg:text-3xl font-black text-[#23223a] mb-2 lg:mb-4">Datos personales</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 lg:gap-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Nombre</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Apellido</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg" value={formData.apellido} onChange={(e) => setFormData({ ...formData, apellido: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Cumpleaños</label>
                            <Input type="date" className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg" value={formData.cumpleanos} onChange={(e) => setFormData({ ...formData, cumpleanos: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Sexo</label>
                            <div className="flex gap-4 lg:gap-6 items-center h-full">
                                <label className="flex items-center gap-2 text-sm">
                                    <Input type="radio" name="gender" checked={formData.sexo === 'masculino'} onChange={() => setFormData({ ...formData, sexo: 'masculino' })} className="accent-[#23223a] w-4 h-4 lg:w-5 lg:h-5" /> Masculino
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <Input type="radio" name="gender" checked={formData.sexo === 'femenino'} onChange={() => setFormData({ ...formData, sexo: 'femenino' })} className="accent-[#23223a] w-4 h-4 lg:w-5 lg:h-5" /> Femenino
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">País</label>
                            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                                <SelectTrigger className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Argentina">Argentina</SelectItem>
                                    <SelectItem value="Bolivia">Bolivia</SelectItem>
                                    <SelectItem value="Brasil">Brasil</SelectItem>
                                    <SelectItem value="Chile">Chile</SelectItem>
                                    <SelectItem value="Colombia">Colombia</SelectItem>
                                    <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                                    <SelectItem value="Ecuador">Ecuador</SelectItem>
                                    <SelectItem value="El Salvador">El Salvador</SelectItem>
                                    <SelectItem value="España">España</SelectItem>
                                    <SelectItem value="Guatemala">Guatemala</SelectItem>
                                    <SelectItem value="Honduras">Honduras</SelectItem>
                                    <SelectItem value="México">México</SelectItem>
                                    <SelectItem value="Nicaragua">Nicaragua</SelectItem>
                                    <SelectItem value="Panamá">Panamá</SelectItem>
                                    <SelectItem value="Paraguay">Paraguay</SelectItem>
                                    <SelectItem value="Perú">Perú</SelectItem>
                                    <SelectItem value="República Dominicana">República Dominicana</SelectItem>
                                    <SelectItem value="Uruguay">Uruguay</SelectItem>
                                    <SelectItem value="Venezuela">Venezuela</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Ciudad</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg" value={formData.ciudad} onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Dirección</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg" value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Número de teléfono</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-3 lg:px-4 py-2 lg:py-3 text-base lg:text-lg" value={formData.numero_de_telefono} onChange={(e) => setFormData({ ...formData, numero_de_telefono: e.target.value })} />
                        </div>
                        <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-4">
                            <button type="submit" className="bg-[#ffb32c] hover:bg-[#e6a029] text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}
