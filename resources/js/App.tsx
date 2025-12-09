import React from "react";
import Router from "./router";
import { useAuth } from "./auth/useAuth";
import { LoginPageSkeleton, DashboardSkeleton } from "@/components/ui/skeleton-loading";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export default function App() {
    const { loading } = useAuth();
    
    if (loading) {
        const path = window.location.pathname;
        if (path.includes('/auth/login') || path.includes('/auth/register')) {
            return <LoginPageSkeleton />;
        }
        if (path.includes('/dashboard')) {
            return <DashboardSkeleton />;
        }
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-6">
                <div className="w-full max-w-4xl space-y-6">
                    <div className="h-12 bg-gray-200 rounded-2xl animate-pulse" />
                    <div className="bg-gray-100 rounded-3xl p-6 md:p-10 shadow-sm animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded-xl w-2/3" />
                        <div className="h-6 bg-gray-200 rounded-xl w-1/2" />
                        <div className="h-48 bg-gray-200 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <>
            <Router />
            <ScrollToTopButton />
        </>
    );
}
