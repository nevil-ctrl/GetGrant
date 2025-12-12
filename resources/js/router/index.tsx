import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyGetGrantSection } from "@/components/sections/WhyGetGrantSection";
import { PopularProgramsSection } from "@/components/sections/PopularProgramsSection";
import { PopularCountriesSection } from "@/components/sections/PopularCountriesSection";
import { UniversityPartnersSection } from "@/components/sections/UniversityPartnersSection";
import { LoginPage } from "@/components/auth/LoginPage";
import { RegisterPage } from "@/components/auth/RegisterPage";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { UniversityCatalogPage } from "@/components/universities/UniversityCatalogPage";
import { UniversityDetailPage } from "@/components/universities/UniversityDetailPage";
import { CountryCatalogPage } from "@/components/countries/CountryCatalogPage";
import { CountryDetailPage } from "@/components/countries/CountryDetailPage";
import { ProgramCatalogPage } from "@/components/programs/ProgramCatalogPage";
import { ProgramDetailPage } from "@/components/programs/ProgramDetailPage";
import { OnlineCoursesPage } from "@/components/courses/OnlineCoursesPage";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AuthWrapper } from "@/auth/AuthWrapper";

// Главная страница
function HomePageContent() {
    const navigate = useNavigate();
    const handleNavigate = (path: string) => navigate(path);

    return (
        <>
            <Header onNavigate={handleNavigate} />
            <main>
                <HeroSection />
                <WhyGetGrantSection />
                <PopularProgramsSection
                    onNavigate={handleNavigate}
                    onCloseSideNav={() => {}}
                />
                <PopularCountriesSection
                    onNavigate={handleNavigate}
                    onCloseSideNav={() => {}}
                />
                <UniversityPartnersSection
                    onNavigate={handleNavigate}
                    onCloseSideNav={() => {}}
                />
            </main>
            <Footer onNavigate={handleNavigate} />
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#1A1A1A]/10 shadow-lg z-30">
                <button className="w-full bg-[#1055b2] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#003b8a] transition-colors min-h-[44px]">
                    Получить консультацию
                </button>
            </div>
        </>
    );
}

// Навигация
function NavigationRoutes() {
    const navigate = useNavigate();
    const go = (path: string) => navigate(path);

    return (
        <Routes>
            <Route path="/" element={<HomePageContent />} />

            {/* Auth */}
            <Route
                path="/auth/login"
                element={
                    <LoginPage
                        onSwitchToRegister={() => go("/auth/register")}
                        onNavigate={go}
                        onCloseSideNav={() => {}}
                    />
                }
            />
            <Route
                path="/auth/register"
                element={
                    <RegisterPage
                        onSwitchToLogin={() => go("/auth/login")}
                        onNavigate={go}
                        onCloseSideNav={() => {}}
                    />
                }
            />

            {/* Universities */}
            <Route
                path="/universities"
                element={
                    <>
                        <Header onNavigate={go} />
                        <UniversityCatalogPage
                            onNavigate={go}
                            onCloseSideNav={() => {}}
                            onSelectUniversity={(id) =>
                                go(`/universities/${id}`)
                            }
                        />
                        <Footer onNavigate={go} />
                    </>
                }
            />
            <Route
                path="/universities/:id"
                element={
                    <>
                        <Header onNavigate={go} />
                        <UniversityDetailPage universityId={null} />
                        <Footer onNavigate={go} />
                    </>
                }
            />

            {/* Countries */}
            <Route
                path="/countries"
                element={
                    <>
                        <Header onNavigate={go} />
                        <CountryCatalogPage
                            onNavigate={go}
                            onCloseSideNav={() => {}}
                        />
                        <Footer onNavigate={go} />
                    </>
                }
            />
            <Route
                path="/countries/:id"
                element={
                    <>
                        <Header onNavigate={go} />
                        <CountryDetailPage />
                        <Footer onNavigate={go} />
                    </>
                }
            />

            {/* Programs */}
            <Route
                path="/programs"
                element={
                    <>
                        <Header onNavigate={go} />
                        <ProgramCatalogPage
                            onNavigate={go}
                            onCloseSideNav={() => {}}
                        />
                        <Footer onNavigate={go} />
                    </>
                }
            />
            <Route
                path="/programs/:id"
                element={
                    <>
                        <Header onNavigate={go} />
                        <ProgramDetailPage />
                        <Footer onNavigate={go} />
                    </>
                }
            />

            {/* Protected Routes with Dashboard Layout */}
            <Route
                path="/dashboard"
                element={
                    <AuthWrapper>
                        <DashboardLayout>
                            <DashboardPage />
                        </DashboardLayout>
                    </AuthWrapper>
                }
            />
            <Route
                path="/courses"
                element={
                    <AuthWrapper>
                        <DashboardLayout>
                            <OnlineCoursesPage />
                        </DashboardLayout>
                    </AuthWrapper>
                }
            />
            <Route
                path="/admin"
                element={
                    <AuthWrapper>
                        <Header onNavigate={go} isAuthenticated />
                        <AdminDashboard />
                        <Footer onNavigate={go} />
                    </AuthWrapper>
                }
            />
        </Routes>
    );
}

export default function Router() {
    return (
        <BrowserRouter>
            <NavigationRoutes />
            <ScrollToTopButton />
        </BrowserRouter>
    );
}
