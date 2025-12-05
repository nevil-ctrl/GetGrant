import React, { useContext } from "react";
import { GetGrantButton } from "./GetGrantButton";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await logout();
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                <a href="/" className="flex items-center gap-3">
                    <img
                        src="/img/logo/GetGrant-logo.png"
                        alt="logo"
                        className="w-20 h-20 object-contain"
                    />
                </a>

                <nav className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        Главная
                    </button>
                    <button
                        onClick={() => navigate("/about")}
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        О нас
                    </button>
                    <button
                        onClick={() => navigate("/countries")}
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        Страны
                    </button>
                    <button
                        onClick={() => navigate("/programs")}
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        Программы
                    </button>
                    <button
                        onClick={() => navigate("/universities")}
                        className="text-gray-700 hover:text-indigo-600 font-medium"
                    >
                        Университеты
                    </button>
                </nav>

                <div className="flex items-center gap-3">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-gray-500">Загрузка...</span>
                        </div>
                    ) : user ? (
                        <>
                            <span className="text-gray-900 font-semibold">
                                {user.name}
                            </span>
                            <GetGrantButton
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = "/dashboard")
                                }
                            >
                                Профиль
                            </GetGrantButton>
                            <GetGrantButton
                                variant="primary"
                                size="sm"
                                onClick={handleLogout}
                            >
                                Выйти
                            </GetGrantButton>
                        </>
                    ) : (
                        <>
                            <GetGrantButton
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = "/auth/login")
                                }
                            >
                                Вход
                            </GetGrantButton>
                            <GetGrantButton
                                variant="primary"
                                size="sm"
                                onClick={() =>
                                    (window.location.href = "/auth/register")
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
