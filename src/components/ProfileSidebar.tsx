"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface ProfileSidebarProps {
    balance?: string;
    userId?: string;
}

export default function ProfileSidebar({ balance = "0", userId = "0" }: ProfileSidebarProps) {
    const pathname = usePathname();
    const [userInfo, setUserInfo] = useState({ user_id: userId, deposit: balance, currency: '$' });

    const formatCurrency = (amount: number, currency: string = '$') => {
        return `${amount.toFixed(2)} ${currency}`;
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.log('No access token found');
                return;
            }

            try {
                const response = await fetch('/api/user/info', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('User info response:', data);
                    // Используем currency из country_info, если он есть, иначе fallback на currency из user/info
                    const currency = data.country_info?.currency || data.currency || '$';
                    setUserInfo({
                        user_id: data.user_id || data.id || userId,
                        deposit: data.deposit !== undefined ? formatCurrency(data.deposit, currency) : balance,
                        currency: currency
                    });
                } else {
                    console.error('API response error:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [userId, balance]);

    const navItems = [
        {
            href: "/profile",
            label: "Mi perfil",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00801 8C10.218 8 12.008 6.21 12.008 4C12.008 1.79 10.218 0 8.00801 0C5.79801 0 4.00801 1.79 4.00801 4C4.00801 6.21 5.79801 8 8.00801 8ZM8.00801 2C9.10802 2 10.008 2.9 10.008 4C10.008 5.1 9.10802 6 8.00801 6C6.90801 6 6.00801 5.1 6.00801 4C6.00801 2.9 6.90801 2 8.00801 2ZM15.478 15.88C15.328 15.96 15.168 16 15.008 16C14.648 16 14.298 15.81 14.128 15.47C14.058 15.33 12.198 12 8.00801 12C3.81801 12 1.90801 15.43 1.88801 15.47C1.70801 15.81 1.35801 16 1.00801 16C0.848014 16 0.688014 15.96 0.538014 15.88C0.0480143 15.62 -0.131986 15.02 0.118014 14.53C0.218014 14.35 2.57801 10 7.99801 10C13.418 10 15.788 14.35 15.878 14.53C16.138 15.02 15.948 15.62 15.458 15.88H15.478Z" fill="currentColor" />
                </svg>
            )
        },
        {
            href: "/deposit",
            label: "Recargar",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.29 8.71C3.9 8.32 3.9 7.69 4.29 7.3C4.68 6.91 5.31 6.91 5.7 7.3L6.99 8.59V1C6.99 0.45 7.44 0 7.99 0C8.54 0 8.99 0.45 8.99 1V8.58L10.28 7.29C10.67 6.9 11.3 6.9 11.69 7.29C12.08 7.68 12.08 8.31 11.69 8.7L8.69 11.7C8.6 11.79 8.49 11.87 8.36 11.92C8.24 11.97 8.11 12 7.98 12C7.85 12 7.72 11.97 7.6 11.92C7.48 11.87 7.37 11.8 7.27 11.7L4.27 8.7L4.29 8.71ZM15 12C14.45 12 14 12.45 14 13V14H2V13C2 12.45 1.55 12 1 12C0.45 12 0 12.45 0 13V15C0 15.55 0.45 16 1 16H15C15.55 16 16 15.55 16 15V13C16 12.45 15.55 12 15 12Z" fill="currentColor" />
                </svg>
            )
        },
        {
            href: "/withdrawal",
            label: "Retirar",
            icon: (
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.08 4.62128C3.13 4.50128 3.2 4.39128 3.3 4.29128L6.29 1.29128C6.68 0.901279 7.31 0.901279 7.7 1.29128C8.09 1.68128 8.09 2.31128 7.7 2.70128L6.41 3.99128H11C11.55 3.99128 12 4.44128 12 4.99128V11.9913C12 12.5413 11.55 12.9913 11 12.9913C10.45 12.9913 10 12.5413 10 11.9913V5.99128H6.41L7.7 7.28128C8.09 7.67128 8.09 8.30128 7.7 8.69128C7.5 8.89128 7.25 8.98128 6.99 8.98128C6.73 8.98128 6.48 8.88128 6.28 8.69128L3.28 5.69128C3.19 5.60128 3.11 5.49128 3.06 5.36128C2.96 5.12128 2.96 4.84128 3.06 4.60128L3.08 4.62128ZM15 13.0013C14.45 13.0013 14 13.4513 14 14.0013V15.0013H2V14.0013C2 13.4513 1.55 13.0013 1 13.0013C0.45 13.0013 0 13.4513 0 14.0013V16.0013C0 16.5513 0.45 17.0013 1 17.0013H15C15.55 17.0013 16 16.5513 16 16.0013V14.0013C16 13.4513 15.55 13.0013 15 13.0013Z" fill="currentColor" />
                </svg>
            )
        },
        {
            href: "/detalization",
            label: "Historial de transacciones",
            icon: (
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11C16 15.41 12.41 19 8 19C3.59 19 0 15.41 0 11C0 10.45 0.45 10 1 10C1.55 10 2 10.45 2 11C2 14.31 4.69 17 8 17C11.31 17 14 14.31 14 11C14 7.69005 11.31 5.00005 8 5.00005H6.41L6.7 5.29005C7.09 5.68005 7.09 6.31005 6.7 6.70005C6.5 6.90005 6.25 6.99005 5.99 6.99005C5.73 6.99005 5.48 6.89005 5.28 6.70005L3.28 4.70005C3.19 4.61005 3.11 4.50005 3.06 4.37005C2.96 4.13005 2.96 3.85005 3.06 3.61005C3.11 3.49005 3.18 3.38005 3.28 3.28005L5.28 1.28005C5.67 0.890049 6.3 0.890049 6.69 1.28005C7.08 1.67005 7.08 2.30005 6.69 2.69005L6.4 2.98005H7.99C12.4 2.98005 15.99 6.57005 15.99 10.98L16 11ZM8 13V11H10C10.55 11 11 10.55 11 10C11 9.45005 10.55 9.00005 10 9.00005H7C6.45 9.00005 6 9.45005 6 10V13C6 13.55 6.45 14 7 14C7.55 14 8 13.55 8 13Z" fill="currentColor" />
                </svg>
            )
        },
        {
            href: "/bonuses",
            label: "Bonificaciones",
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 6H14.82C14.93 5.69 15 5.35 15 5C15 3.35 13.65 2 12 2C11.5 2 11.04 2.13 10.63 2.35C10 0.97 8.61 0 7 0C4.79 0 3 1.79 3 4C3 4.73 3.21 5.41 3.56 6H1C0.45 6 0 6.45 0 7V11C0 11.55 0.45 12 1 12V17C1 17.55 1.45 18 2 18H16C16.55 18 17 17.55 17 17V12C17.55 12 18 11.55 18 11V7C18 6.45 17.55 6 17 6ZM12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4ZM5 4C5 2.9 5.9 2 7 2C8.1 2 9 2.9 9 4C9 5.1 8.1 6 7 6C5.9 6 5 5.1 5 4ZM2 8H16V10H2V8ZM3 12H8V16H3V12ZM15 16H10V12H15V16Z" fill="currentColor" />
                </svg>
            )
        },
        {
            href: "/verification",
            label: "Verificación",
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00801 8C10.218 8 12.008 6.21 12.008 4C12.008 1.79 10.218 0 8.00801 0C5.79801 0 4.00801 1.79 4.00801 4C4.00801 6.21 5.79801 8 8.00801 8ZM8.00801 2C9.10802 2 10.008 2.9 10.008 4C10.008 5.1 9.10802 6 8.00801 6C6.90801 6 6.00801 5.1 6.00801 4C6.00801 2.9 6.90801 2 8.00801 2ZM15.478 15.88C15.328 15.96 15.168 16 15.008 16C14.648 16 14.298 15.81 14.128 15.47C14.058 15.33 12.198 12 8.00801 12C3.81801 12 1.90801 15.43 1.88801 15.47C1.70801 15.81 1.35801 16 1.00801 16C0.848014 16 0.688014 15.96 0.538014 15.88C0.0480143 15.62 -0.131986 15.02 0.118014 14.53C0.218014 14.35 2.57801 10 7.99801 10C13.418 10 15.788 14.35 15.878 14.53C16.138 15.02 15.948 15.62 15.458 15.88H15.478Z" fill="currentColor" />
                </svg>
            )
        }
    ];

    const getNavItemClasses = (href: string) => {
        const isActive = pathname === href;
        const baseClasses = "w-full flex items-center gap-2 font-bold py-3 rounded-lg px-5 cursor-pointer transition-all duration-200";

        if (isActive) {
            return `${baseClasses} bg-green-700 text-white shadow-lg`;
        }

        return `${baseClasses} bg-transparent text-white hover:bg-white/10`;
    };

    return (
        <aside className="relative w-full lg:w-[320px] bg-gradient-to-br from-[#ffb32c] to-[#ff9800] rounded-2xl p-6 flex flex-col gap-6 shadow-lg overflow-hidden">
            {/* Decorative background SVG */}
            <svg
                className="absolute left-0 top-0 w-full h-full pointer-events-none select-none z-0"
                width="324" height="604" viewBox="0 0 324 604" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path d="M525.443 250.397L571.915 268.908L497.819 349.348L536.812 378.258L442.194 448.408L458.323 476.814L324.818 711.961L191.31 476.814L207.44 448.406L112.819 378.258L151.815 349.349L77.7165 268.91L122.824 250.942C109.601 225.359 98.3784 196.28 87.64 165.684H-42L254.899 820H393.137L690 165.684H560.352C549.688 196.064 538.549 224.95 525.443 250.397Z" fill="#F5970A" />
                <path d="M651.024 -124.822C516.111 -35.8608 491.335 106.49 443.578 160.461C462.25 70.7507 428.508 22.7357 501.585 -56.5345C415.286 0.950485 446.182 78.936 411.957 156.331L404.291 151.841C447.117 31.1456 330.76 -123.115 509.219 -216C301.511 -152.49 361.546 -13.1154 339.453 113.879L324.817 105.309L310.178 113.879C288.086 -13.1153 348.122 -152.49 140.412 -216C318.871 -123.115 202.517 31.1457 245.342 151.841L236.346 157.108C201.567 79.457 233.001 1.1436 146.413 -56.5343C219.488 22.7358 185.748 70.7509 204.42 160.461C156.663 106.489 131.887 -35.8606 -3.02443 -124.822C92.8065 -37.7309 111.133 179.328 183.468 270.803L148.047 284.912L212.706 355.105L181.477 378.258L260.863 437.113L238.323 476.814L324.817 629.158L411.311 476.814L388.771 437.114L468.157 378.258L436.927 355.105L501.585 284.912L464.908 270.304C536.923 178.544 555.362 -37.886 651.024 -124.822ZM258.14 365.702L203.801 262.558L286.285 322.486L258.14 365.702ZM391.492 365.702L363.347 322.486L445.831 262.558L391.492 365.702Z" fill="#F5970A" />
            </svg>

            {/* Balance and User ID Section */}
            <div className="grid grid-cols-2 gap-2 mb-2 relative z-10">
                <div className="flex flex-col justify-between items-start text-lg font-semibold text-[#23223a]">
                    <span className="text-xs">Saldo:</span>
                    <span className="font-black text-base">{userInfo.deposit}</span>
                </div>
                <div className="flex flex-col justify-between items-start text-lg font-semibold text-[#23223a]">
                    <span className="text-xs">ID de usuario:</span>
                    <span className="font-black text-base">{userInfo.user_id}</span>
                </div>
            </div>

            {/* Quick Recharge Button */}
            <button className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 rounded-lg shadow-[0_4px_0_0_#14532d] active:shadow-none active:translate-y-0.5 transition-all duration-100 border-0 mb-2 relative z-10">
                Recargar en 1 clic
            </button>

            {/* Navigation */}
            <nav className="flex flex-col relative z-10 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={getNavItemClasses(item.href)}
                    >
                        <span className="flex-shrink-0">
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}