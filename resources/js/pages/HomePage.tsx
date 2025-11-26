import React from "react";
import { ArrowRight, Globe, Users, BookOpen } from "lucide-react";

interface HomePageProps {
    onNavigate?: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
    const features = [
        {
            icon: Globe,
            title: "Найти университет",
            description: "Откройте для себя лучшие университеты мира",
        },
        {
            icon: BookOpen,
            title: "Программы обучения",
            description: "Выберите программу, которая подходит вам",
        },
        {
            icon: Users,
            title: "Экспертная помощь",
            description: "Получите консультацию от профессионалов",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Образование без границ
                        <span className="block text-blue-600">
                            Начните путь в мир
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        GetGrant помогает студентам найти лучшие образовательные
                        программы в ведущих университетах мира и получить
                        финансовую поддержку
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button
                            onClick={() => onNavigate?.("register")}
                            className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group"
                        >
                            Начать бесплатно
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                        </button>
                        <button
                            onClick={() => onNavigate?.("universities")}
                            className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                            Посмотреть университеты
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-gray-200">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-500 mb-2">
                            500+
                        </div>
                        <div className="text-gray-600">
                            Университетов в базе
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-500 mb-2">
                            50+
                        </div>
                        <div className="text-gray-600">Стран со всего мира</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-500 mb-2">
                            10K+
                        </div>
                        <div className="text-gray-600">
                            Студентов уже поступили
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        Как это работает?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition group"
                                >
                                    <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-500 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Готовы начать?
                    </h2>
                    <p className="text-white text-lg mb-8 opacity-90">
                        Создайте профиль и получите персональные рекомендации
                        университетов
                    </p>
                    <button
                        onClick={() => onNavigate?.("register")}
                        className="px-8 py-3 bg-white text-blue-500 font-bold rounded-lg hover:bg-gray-100 transition"
                    >
                        Создать аккаунт
                    </button>
                </div>
            </section>
        </div>
    );
}
