import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import {
    AuthContext,
    AuthContextType,
    LoginCredentials,
    RegisterData,
} from "./AuthContext";
import { User } from "./User";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            // Получаем CSRF токен
            await axios.get("/sanctum/csrf-cookie");

            // Получаем данные пользователя
            const res = await axios.get("/api/auth/me");
            console.log("✅ User authenticated:", res.data);
            setUser(res.data);
        } catch (error: any) {
            console.log("ℹ️ Not authenticated");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (data: LoginCredentials) => {
        // 1. Получаем CSRF токен
        await axios.get("/sanctum/csrf-cookie");

        // 2. Логин через Fortify (маршрут /login)
        await axios.post("/login", {
            email: data.email,
            password: data.password,
            remember: data.remember,
        });

        // 3. Получаем данные пользователя
        await fetchUser();
    };

    const register = async (data: RegisterData) => {
        // 1. Получаем CSRF токен
        await axios.get("/sanctum/csrf-cookie");

        // 2. Регистрация через Fortify (маршрут /register)
        await axios.post("/register", {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            phone: data.phone,
            profile_type: data.profile_type || "student",
            role: data.profile_type || "student", // Fortify может требовать role
        });

        // 3. Получаем данные пользователя
        await fetchUser();
    };

    const logout = async () => {
        // Выход через Fortify (маршрут /logout)
        await axios.post("/logout");
        setUser(null);
    };

    const contextValue: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
