import { createContext } from "react";

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    profile_type?: 'student' | 'parent';
    manager_id?: number | null;
}

interface AuthContextType {
    user: any | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
});
