import React, { useState } from "react";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { useAuth } from "@/auth/useAuth";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="flex h-screen bg-[#F5F5F5]">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar для мобильных */}
                <header className="lg:hidden bg-white border-b border-[#1A1A1A]/10 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-[#1A1A1A]" />
                    </button>
                    <span className="font-semibold text-[#1A1A1A]">
                        {user?.name || "Dashboard"}
                    </span>
                    <div className="w-10" /> {/* Spacer для центрирования */}
                </header>

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
