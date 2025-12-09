import React, { useState, useEffect } from "react";
import {
    AuthContext,
    LoginCredentials,
    RegisterData,
} from "@/context/AuthContext";
import axios from "axios";

interface Props {
    children: React.ReactNode;
}

const authHttp = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

authHttp.interceptors.request.use((config) => {
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
    if (token) {
        config.headers["X-CSRF-TOKEN"] = token;
    }

    // Получаем XSRF токен из cookie для Fortify
    const xsrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

    if (xsrfToken) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
    }

    return config;
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Проверяем, был ли это редирект после выхода
        const urlParams = new URLSearchParams(window.location.search);
        const isLogout = urlParams.has('logout');
        const hasNocache = urlParams.has('nocache');

        // Если есть параметр logout или nocache (старый способ), значит был выход
        if (isLogout || hasNocache) {
            // После выхода сразу устанавливаем user как null
            setUser(null);
            setLoading(false);
            // Очищаем параметры из URL
            window.history.replaceState({}, '', '/');
            return;
        }

        // ВСЕГДА получаем пользователя через API, игнорируем window.user
        authHttp
            .get("/api/user")
            .then((res) => {
                // Проверяем, что ответ не пустой (может быть null или пустой объект)
                if (res.data && Object.keys(res.data).length > 0) {
                    setUser(res.data);
                } else {
                    setUser(null);
                }
            })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (credentials: LoginCredentials) => {
        await authHttp.get("/sanctum/csrf-cookie");
        await authHttp.post("/login", credentials);
        const userRes = await authHttp.get("/api/user");
        setUser(userRes.data);
    };

    const register = async (data: RegisterData) => {
        await authHttp.get("/sanctum/csrf-cookie");
        await authHttp.post("/register", data);
        const userRes = await authHttp.get("/api/user");
        setUser(userRes.data);
    };

    const logout = async () => {
        try {
            // Отправляем logout
            await authHttp.post("/api/logout", {});

            // Очищаем React state
            setUser(null);

            // Очищаем localStorage и sessionStorage (на всякий случай)
            localStorage.clear();
            sessionStorage.clear();

            // Принудительная перезагрузка с очисткой кеша
            window.location.href = "/?nocache=" + Date.now();
        } catch (error: any) {
            console.error("Logout error:", error);
            setUser(null);
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/?nocache=" + Date.now();
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
