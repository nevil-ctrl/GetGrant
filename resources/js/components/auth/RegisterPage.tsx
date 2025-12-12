import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetGrantButton } from "../GetGrantButton";
import { GetGrantInput } from "../GetGrantInput";
import { Mail, Lock, User, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/auth/useAuth";

interface RegisterPageProps {
    onSwitchToLogin: () => void;
    onNavigate?: (page: string) => void;
    onCloseSideNav?: () => void;
}

export function RegisterPage({
    onSwitchToLogin,
    onNavigate,
    onCloseSideNav,
}: RegisterPageProps) {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        profile_type: "student" as "student" | "parent",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            setError(null);

            await register(form);

            console.log(
                "✅ Registration successful, redirecting to dashboard..."
            );

            navigate("/dashboard");
            onCloseSideNav?.();
        } catch (e: any) {
            console.error("❌ Registration error:", e);
            setError(e?.response?.data?.message || "Ошибка регистрации.");
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
                        Регистрация
                    </h2>
                    <p className="text-sm text-center text-[#6D7A89] mb-6">
                        Создайте аккаунт для доступа ко всем возможностям
                    </p>

                    {error && (
                        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <GetGrantInput
                            label="Имя"
                            type="text"
                            icon={<User />}
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

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
                            label="Телефон (необязательно)"
                            type="tel"
                            icon={<Phone />}
                            placeholder="+7 (999) 123-45-67"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                        />

                        {/* Выбор роли */}
                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                                Кто вы?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            profile_type: "student",
                                        })
                                    }
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        form.profile_type === "student"
                                            ? "border-[#1055b2] bg-[#1055b2]/5"
                                            : "border-[#1A1A1A]/10 hover:border-[#1A1A1A]/20"
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">🎓</div>
                                        <div className="text-sm font-medium text-[#1A1A1A]">
                                            Студент
                                        </div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            profile_type: "parent",
                                        })
                                    }
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        form.profile_type === "parent"
                                            ? "border-[#1055b2] bg-[#1055b2]/5"
                                            : "border-[#1A1A1A]/10 hover:border-[#1A1A1A]/20"
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">👨‍👩‍👧</div>
                                        <div className="text-sm font-medium text-[#1A1A1A]">
                                            Родитель
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <GetGrantInput
                            label="Пароль"
                            type="password"
                            icon={<Lock />}
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />

                        <GetGrantInput
                            label="Подтвердите пароль"
                            type="password"
                            icon={<Lock />}
                            value={form.password_confirmation}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password_confirmation: e.target.value,
                                })
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
                        {submitting ? "Регистрируем..." : "Зарегистрироваться"}
                    </GetGrantButton>

                    <p className="text-center text-sm mt-6">
                        Уже есть аккаунт?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-[#1055b2] hover:underline font-medium"
                        >
                            Войти
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
