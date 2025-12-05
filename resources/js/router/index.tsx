import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "../components/Header";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import CountriesPage from "../pages/CountriesPage";
import ProgramsPage from "../pages/ProgramsPage";
import UniversitiesPage from "../pages/UniversitiesPage";
import LoginForms from "../components/LoginForms";
import RegisterForms from "../components/RegisterForms";

export default function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/countries" element={<CountriesPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/universities" element={<UniversitiesPage />} />
                {/* <Route path="/login" element={<LoginForms />} /> */}
                {/* <Route path="/register" element={<RegisterForms />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
