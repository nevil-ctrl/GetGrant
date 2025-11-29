import { createContext } from "react";

type LoginCredentials = {
    email: string;
    password: string;
};

export const AuthContext = createContext<{
    user: any;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}>({
    user: null,
    loading: true,
    login: async () => {},
    logout: async () => {},
});
