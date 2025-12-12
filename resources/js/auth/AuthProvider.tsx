import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

interface RegisterData extends LoginCredentials {
    name: string;
    password_confirmation: string;
    profile_type: 'student' | 'parent';
}

interface AuthContextType {
    user: any | null;
    loading: boolean;
    login: (data: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const authHttp = axios.create({
    baseURL: "/",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authHttp.get("/sanctum/csrf-cookie").then(() => {
            authHttp.get("/api/auth/me")
                .then(res => setUser(res.data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        });
    }, []);

    const login = async (credentials: LoginCredentials) => {
        await authHttp.get("/sanctum/csrf-cookie");
        await authHttp.post("/api/auth/login", credentials);
        const userRes = await authHttp.get("/api/auth/me");
        setUser(userRes.data);
    };

    const register = async (data: RegisterData) => {
        await authHttp.get("/sanctum/csrf-cookie");
        await authHttp.post("/api/auth/register", data);
        const userRes = await authHttp.get("/api/auth/me");
        setUser(userRes.data);
    };

    const logout = async () => {
        try {
            await authHttp.post("/api/auth/logout");
        } finally {
            setUser(null);
            window.location.href = "/?nocache=" + Date.now();
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
