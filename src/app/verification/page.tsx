"use client"

import ProfileSidebar from "../../components/ProfileSidebar";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useState, useEffect } from "react";

export default function VerificationPage() {
    const [userInfo, setUserInfo] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        gender: 'male',
        country: 'Colombia',
        city: '',
        address: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('/api/user/info', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        birthday: data.birthday || '',
                        gender: data.gender || 'male',
                        country: data.country || 'Colombia',
                        city: data.city || '',
                        address: data.address || '',
                        phone: data.phone || '',
                        email: data.email || ''
                    });
                }
            } catch {
                console.error('Error fetching user info');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f6fa] flex flex-row items-start gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-8 bg-white rounded-2xl">
                <form className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 border border-[#ecebfa]">
                    <h1 className="text-4xl font-black text-[#23223a] mb-8">Datos personales</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Nombre</label>
                            <Input value={userInfo.first_name} onChange={(e) => setUserInfo({ ...userInfo, first_name: e.target.value })} className="text-lg" />
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Apellido</label>
                            <Input value={userInfo.last_name} onChange={(e) => setUserInfo({ ...userInfo, last_name: e.target.value })} className="text-lg" />
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Cumpleaños</label>
                            <Input value={userInfo.birthday} onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })} className="text-lg" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#b3b3c3] mb-2">Sexo</label>
                        <div className="flex gap-8 items-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" checked={userInfo.gender === 'male'} onChange={() => setUserInfo({ ...userInfo, gender: 'male' })} className="accent-[#23223a] w-5 h-5" />
                                <span className="text-lg text-[#23223a]">Masculino</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" checked={userInfo.gender === 'female'} onChange={() => setUserInfo({ ...userInfo, gender: 'female' })} className="accent-[#b3b3c3] w-5 h-5" />
                                <span className="text-lg text-[#23223a]">Femenino</span>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">País</label>
                            <Select value={userInfo.country} onValueChange={(value) => setUserInfo({ ...userInfo, country: value })}>
                                <SelectTrigger className="text-lg w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Colombia">Colombia</SelectItem>
                                    <SelectItem value="Argentina">Argentina</SelectItem>
                                    <SelectItem value="Brasil">Brasil</SelectItem>
                                    <SelectItem value="Chile">Chile</SelectItem>
                                    <SelectItem value="Ecuador">Ecuador</SelectItem>
                                    <SelectItem value="México">México</SelectItem>
                                    <SelectItem value="Perú">Perú</SelectItem>
                                    <SelectItem value="Uruguay">Uruguay</SelectItem>
                                    <SelectItem value="Venezuela">Venezuela</SelectItem>
                                    <SelectItem value="España">España</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Ciudad</label>
                            <Input value={userInfo.city} onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })} className="text-lg" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#b3b3c3] mb-2">Dirección</label>
                        <Input value={userInfo.address} onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} className="text-lg" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Número de teléfono</label>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center px-4 rounded-lg bg-[#f5f5f7] text-[#b3b3c3] text-lg border border-[#ecebfa]">+57</span>
                                <Input value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} className="text-lg" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2">Correo electrónico</label>
                            <Input value={userInfo.email} className="text-lg bg-[#f5f5f7] shadow-md" readOnly />
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
