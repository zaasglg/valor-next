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
        <div className="min-h-screen bg-[#f5f6fa] flex flex-col lg:flex-row items-start gap-0 lg:gap-6 p-4">
            <ProfileSidebar />
            <main className="flex-1 p-4 lg:p-8 bg-white rounded-2xl mt-6 lg:*:mt-0 w-full lg:w-auto">
                <form className="w-full bg-white rounded-none lg:rounded-2xl shadow-none lg:shadow-lg p-4 lg:p-10 border-0 lg:border border-[#ecebfa]">
                    <h1 className="text-2xl lg:text-4xl font-black text-[#23223a] mb-4 lg:mb-8">Datos personales</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Nombre</label>
                            <Input value={userInfo.first_name} onChange={(e) => setUserInfo({ ...userInfo, first_name: e.target.value })} className="text-base lg:text-lg" />
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Apellido</label>
                            <Input value={userInfo.last_name} onChange={(e) => setUserInfo({ ...userInfo, last_name: e.target.value })} className="text-base lg:text-lg" />
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Cumpleaños</label>
                            <Input value={userInfo.birthday} onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })} className="text-base lg:text-lg" />
                        </div>
                    </div>
                    <div className="mb-4 lg:mb-6">
                        <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Sexo</label>
                        <div className="flex gap-4 lg:gap-8 items-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" checked={userInfo.gender === 'male'} onChange={() => setUserInfo({ ...userInfo, gender: 'male' })} className="accent-[#23223a] w-4 h-4 lg:w-5 lg:h-5" />
                                <span className="text-base lg:text-lg text-[#23223a]">Masculino</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" checked={userInfo.gender === 'female'} onChange={() => setUserInfo({ ...userInfo, gender: 'female' })} className="accent-[#b3b3c3] w-4 h-4 lg:w-5 lg:h-5" />
                                <span className="text-base lg:text-lg text-[#23223a]">Femenino</span>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">País</label>
                            <Select value={userInfo.country} onValueChange={(value) => setUserInfo({ ...userInfo, country: value })}>
                                <SelectTrigger className="text-base lg:text-lg w-full">
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
                            <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Ciudad</label>
                            <Input value={userInfo.city} onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })} className="text-base lg:text-lg" />
                        </div>
                    </div>
                    <div className="mb-4 lg:mb-6">
                        <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Dirección</label>
                        <Input value={userInfo.address} onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} className="text-base lg:text-lg" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        <div>
                            <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Número de teléfono</label>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center px-3 lg:px-4 rounded-lg bg-[#f5f5f7] text-[#b3b3c3] text-base lg:text-lg border border-[#ecebfa]">+57</span>
                                <Input value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} className="text-base lg:text-lg" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#b3b3c3] mb-2 text-sm lg:text-base">Correo electrónico</label>
                            <Input value={userInfo.email} className="text-base lg:text-lg bg-[#f5f5f7] shadow-md" readOnly />
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <Button className="bg-[#ffb32c] hover:bg-[#ff9800] text-white text-base lg:text-lg font-bold px-8 lg:px-12 py-3 rounded-xl shadow-[0_4px_0_0_#f5970a] active:shadow-none active:translate-y-0.5 transition-all duration-100 border-0 w-full lg:w-auto">Actualizar datos</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
