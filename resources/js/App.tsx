import React from "react";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import ProgramsPage from "./pages/ProgramsPage";
import CountriesPage from "./pages/CountriesPage";

export default function App() {
    return (
        <div>
            <Header />
            <main className="min-h-screen">
                {/* Тут можно оставить рендер всех страниц по маршруту, 
            либо подключать Laravel маршруты через отдельные ссылки */}
                <HomePage />
            </main>
        </div>
    );
}
