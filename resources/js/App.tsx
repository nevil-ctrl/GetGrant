import React from "react";
import Router from "./router";
import { AuthProvider } from "./auth/AuthProvider";

console.log("🚀 App.tsx loading...");

export default function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}
