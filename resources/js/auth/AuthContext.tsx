import { createContext } from "react";
import { User } from "./User";

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
    profile_type?: "student" | "parent";
    manager_id?: number | null;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
