// ProtectedRoute.tsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Загрузка...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />; 
};

export default ProtectedRoute;
