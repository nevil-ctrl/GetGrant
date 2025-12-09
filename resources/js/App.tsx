import React from "react";
import Router from "./router";
import { useAuth } from "./auth/useAuth";
import { LoginPageSkeleton, DashboardSkeleton } from "@/components/ui/skeleton-loading";

export default function App() {
    const { loading } = useAuth();
    
    // Показываем Skeleton при начальной загрузке
    if (loading) {
        const path = window.location.pathname;
        // Если на странице входа/регистрации, показываем LoginPageSkeleton
        if (path.includes('/auth/login') || path.includes('/auth/register')) {
            return <LoginPageSkeleton />;
        }
        // Если на дашборде, показываем DashboardSkeleton
        if (path.includes('/dashboard')) {
            return <DashboardSkeleton />;
        }
        // Иначе показываем простой скелетон
        return (
            <div className="min-h-screen bg-white">
                <div className="animate-pulse">
                    <div className="h-20 bg-gray-200"></div>
                    <div className="container mx-auto p-6 space-y-4">
                        <div className="h-8 bg-gray-200 w-1/3"></div>
                        <div className="h-64 bg-gray-200"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    return <Router />;
}
