"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            
            if (!token) {
                // No token found, redirect to login
                router.push('/');
                return;
            }

            // Проверяем валидность токена, делая тестовый запрос
            try {
                const response = await fetch('/api/user/info', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    // Token is valid, user is authenticated
                    setIsAuthenticated(true);
                    setIsLoading(false);
                } else if (response.status === 401) {
                    // Token expired, try to refresh
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken) {
                        try {
                            const refreshResponse = await fetch('/api/refresh', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ refresh: refreshToken }),
                            });

                            if (refreshResponse.ok) {
                                const refreshData = await refreshResponse.json();
                                if (refreshData.access) {
                                    localStorage.setItem('access_token', refreshData.access);
                                    setIsAuthenticated(true);
                                    setIsLoading(false);
                                    return;
                                }
                            }
                        } catch (refreshError) {
                            console.error('AuthGuard - Error refreshing token:', refreshError);
                        }
                    }
                    
                    // If refresh failed, redirect to login
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('user_id');
                    router.push('/');
                } else {
                    // Other error, redirect to login
                    router.push('/');
                }
            } catch (error) {
                console.error('AuthGuard - Error checking auth:', error);
                router.push('/');
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return <>{children}</>;
}
