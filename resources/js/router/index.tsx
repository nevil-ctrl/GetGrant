import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

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
import { UniversityCatalogPage } from "@/components/universities/UniversityCatalogPage";
import { UniversityDetailPage } from "@/components/universities/UniversityDetailPage";
import { CountryCatalogPage } from "@/components/countries/CountryCatalogPage";
import { CountryDetailPage } from "@/components/countries/CountryDetailPage";
import { ProgramCatalogPage } from "@/components/programs/ProgramCatalogPage";
import { ProgramDetailPage } from "@/components/programs/ProgramDetailPage";
import { OnlineCoursesPage } from "@/components/courses/OnlineCoursesPage";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAuth } from "@/auth/useAuth";
import { LoginPageSkeleton } from "@/components/ui/skeleton-loading";

function HomePageContent() {
    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <WhyGetGrantSection />
                <PopularProgramsSection onNavigate={handleNavigate} onCloseSideNav={() => {}} />
                <PopularCountriesSection onNavigate={handleNavigate} onCloseSideNav={() => {}} />
                <UniversityPartnersSection onNavigate={handleNavigate} onCloseSideNav={() => {}} />
            </main>
            <Footer />
            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#1A1A1A]/10 shadow-lg z-30">
                <button className="w-full bg-[#1055b2] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#003b8a] transition-colors min-h-[44px]">
                    Получить консультацию
                </button>
            </div>
        </>
    );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();
    
    if (loading) {
        return <LoginPageSkeleton />;
    }
    
    return <>{children}</>;
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePageContent />} />
                <Route 
                    path="/auth/login" 
                    element={
                        <AuthWrapper>
                            <LoginPage 
                                onSwitchToRegister={() => window.location.href = '/auth/register'}
                                onNavigate={(path) => window.location.href = path}
                                onCloseSideNav={() => {}}
                            />
                        </AuthWrapper>
                    } 
                />
                <Route 
                    path="/auth/register" 
                    element={
                        <AuthWrapper>
                            <RegisterPage 
                                onSwitchToLogin={() => window.location.href = '/auth/login'}
                                onNavigate={(path) => window.location.href = path}
                                onCloseSideNav={() => {}}
                            />
                        </AuthWrapper>
                    } 
                />
                <Route path="/universities" element={<><Header /><UniversityCatalogPage onNavigate={(path) => window.location.href = path} onCloseSideNav={() => {}} onSelectUniversity={(id) => window.location.href = `/universities/${id}`} /><Footer /></>} />
                <Route path="/universities/:id" element={<><Header /><UniversityDetailPage universityId={null} /><Footer /></>} />
                <Route path="/countries" element={<><Header /><CountryCatalogPage onNavigate={(path) => window.location.href = path} onCloseSideNav={() => {}} /><Footer /></>} />
                <Route path="/countries/:id" element={<><Header /><CountryDetailPage /><Footer /></>} />
                <Route path="/programs" element={<><Header /><ProgramCatalogPage onNavigate={(path) => window.location.href = path} onCloseSideNav={() => {}} /><Footer /></>} />
                <Route path="/programs/:id" element={<><Header /><ProgramDetailPage /><Footer /></>} />
                <Route path="/courses" element={<><Header /><OnlineCoursesPage /><Footer /></>} />
            </Routes>
        </BrowserRouter>
    );
}
    