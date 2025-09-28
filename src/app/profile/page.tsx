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
                    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-x-3 gap-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Nombre</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Apellido</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" value={formData.apellido} onChange={(e) => setFormData({ ...formData, apellido: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Cumpleaños</label>
                            <Input type="date" className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" value={formData.cumpleanos} onChange={(e) => setFormData({ ...formData, cumpleanos: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Sexo</label>
                            <div className="flex gap-6 items-center h-full">
                                <label className="flex items-center gap-2 text-sm">
                                    <Input type="radio" name="gender" checked={formData.sexo === 'masculino'} onChange={() => setFormData({ ...formData, sexo: 'masculino' })} className="accent-[#23223a] w-5 h-5" /> Masculino
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <Input type="radio" name="gender" checked={formData.sexo === 'femenino'} onChange={() => setFormData({ ...formData, sexo: 'femenino' })} className="accent-[#23223a] w-5 h-5" /> Femenino
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 col-span-1">
                            <label className="text-sm text-[#a3a3b3] font-semibold">País</label>
                            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                                <SelectTrigger className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg w-full">
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
                        <div className="flex flex-col gap-2 col-span-1">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Ciudad</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" value={formData.ciudad} onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Dirección</label>
                            <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg" value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Número de teléfono</label>
                            <div className="flex gap-2">
                                <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg w-20" defaultValue="+57" />
                                <Input className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg flex-1" value={formData.numero_de_telefono.replace('+57', '')} onChange={(e) => setFormData({ ...formData, numero_de_telefono: '+57' + e.target.value })} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 col-span-2">
                            <label className="text-sm text-[#a3a3b3] font-semibold">Correo electrónico</label>
                            <Input type="email" className="rounded-lg border border-[#e3e6f0] bg-[#f7f7fa] px-4 py-3 text-lg w-full" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
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
                                onClick={() => {
                                    localStorage.removeItem('access_token');
                                    localStorage.removeItem('refresh_token');
                                    localStorage.removeItem('user_id');
                                    window.location.href = '/';
                                }}
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
