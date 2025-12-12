import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetGrantButton } from "../GetGrantButton";
import { GetGrantInput } from "../GetGrantInput";
import { Mail, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/auth/useAuth";

interface LoginPageProps {
    onSwitchToRegister: () => void;
    onNavigate?: (path: string) => void;
    onCloseSideNav?: () => void;
}

export function LoginPage({
    onSwitchToRegister,
    onNavigate,
    onCloseSideNav,
}: LoginPageProps) {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Редирект после успешного логина
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
            onCloseSideNav?.();
        }
    }, [user, navigate, onCloseSideNav]);

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            setError(null);
            console.log("🔄 Attempting login...");
            await login({ email: form.email, password: form.password });
            console.log("✅ Login request sent");
        } catch (e: any) {
            console.error("❌ Login error:", e);
            setError(e?.response?.data?.message || "Не удалось войти.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F5F5F5] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-2">
                        Вход в систему
                    </h2>
                    {error && (
                        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <GetGrantInput
                            label="Email"
                            type="email"
                            icon={<Mail />}
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        <GetGrantInput
                            label="Пароль"
                            type="password"
                            icon={<Lock />}
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                    </div>
                    <GetGrantButton
                        variant="primary"
                        size="lg"
                        className="w-full mt-6"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? "Входим..." : "Войти"}
                    </GetGrantButton>
                    <p className="text-center text-sm mt-6">
                        Нет аккаунта?{" "}
                        <button
                            onClick={onSwitchToRegister}
                            className="text-[#1055b2] hover:underline"
                        >
                            Зарегистрироваться
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
