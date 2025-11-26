import React from "react";
import { GetGrantButton } from "./GetGrantButton";

interface HeaderProps {
    user?: { name?: string } | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                {/* Логотип */}
                <a href="/" className="flex items-center gap-3">
                    <img
                        src="/img/logo/GetGrant-logo.png"
                        alt="logo"
                        className="w-10 h-10"
                    />
                    <div>
                        <span className="text-2xl font-bold text-black">
                            GetGrant
                        </span>
                        <p className="text-xs text-gray-500">
                            Образование для всех
                        </p>
                    </div>
                </a>

                {/* Кнопки */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <span className="text-gray-700 font-medium">
                            {user.name || "Пользователь"}
                        </span>
                    ) : (
                        <>
                            <GetGrantButton
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = "/login")
                                }
                            >
                                Вход
                            </GetGrantButton>
                            <GetGrantButton
                                variant="primary"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = "/register")
                                }
                            >
                                Регистрация
                            </GetGrantButton>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
