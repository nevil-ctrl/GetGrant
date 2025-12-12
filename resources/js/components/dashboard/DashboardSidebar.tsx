import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    Calendar,
    MessageCircle,
    Settings,
    LogOut,
    X,
    GraduationCap,
    Users,
    Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/auth/useAuth";

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: "Главная", path: "/dashboard" },
        { icon: FileText, label: "Документы", path: "/dashboard/documents" },
        { icon: BookOpen, label: "Курсы", path: "/courses" },
        { icon: Calendar, label: "Календарь", path: "/dashboard/calendar" },
        { icon: Users, label: "Университеты", path: "/universities" },
        { icon: Building2, label: "Программы", path: "/programs" },
        {
            icon: MessageCircle,
            label: "Сообщения",
            path: "/dashboard/messages",
        },
        { icon: Settings, label: "Настройки", path: "/dashboard/settings" },
    ];

    const handleLogout = async () => {
        await logout();
        window.location.href = "/";
    };

    return (
        <>
            {/* Overlay для мобильных */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: isOpen ? 0 : -280,
                }}
                className="fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-white border-r border-[#1A1A1A]/10 z-50 flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-[#1A1A1A]/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <GraduationCap className="w-8 h-8 text-[#1055b2]" />
                            <span className="text-xl font-bold text-[#1A1A1A]">
                                GetGrant
                            </span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-[#1A1A1A]/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#1055b2] flex items-center justify-center text-white font-semibold">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#1A1A1A] truncate">
                                {user?.name || "Пользователь"}
                            </p>
                            <p className="text-sm text-[#6D7A89] truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() =>
                                            window.innerWidth < 1024 &&
                                            onClose()
                                        }
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                            isActive
                                                ? "bg-[#1055b2] text-white"
                                                : "text-[#6D7A89] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-[#1A1A1A]/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Выйти</span>
                    </button>
                </div>
            </motion.aside>
        </>
    );
}
