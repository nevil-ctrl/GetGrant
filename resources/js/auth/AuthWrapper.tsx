import React, { ReactNode, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { LoginPageSkeleton } from "@/components/ui/skeleton-loading";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth/login");
        }
    }, [user, loading, navigate]);

    if (loading) return <LoginPageSkeleton />;
    if (!user) return null;

    return <>{children}</>;
};
