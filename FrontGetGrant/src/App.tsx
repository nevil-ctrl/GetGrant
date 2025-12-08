import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { WhyGetGrantSection } from './components/sections/WhyGetGrantSection';
import { PopularProgramsSection } from './components/sections/PopularProgramsSection';
import { PopularCountriesSection } from './components/sections/PopularCountriesSection';
import { UniversityPartnersSection } from './components/sections/UniversityPartnersSection';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { UniversityCatalogPage } from './components/universities/UniversityCatalogPage';
import { UniversityDetailPage } from './components/universities/UniversityDetailPage';
import { CountryCatalogPage } from './components/countries/CountryCatalogPage';
import { CountryDetailPage } from './components/countries/CountryDetailPage';
import { ProgramCatalogPage } from './components/programs/ProgramCatalogPage';
import { ProgramDetailPage } from './components/programs/ProgramDetailPage';
import { OnlineCoursesPage } from './components/courses/OnlineCoursesPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

type Page = 
  | 'home'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'universities'
  | 'university-detail'
  | 'countries'
  | 'country-detail'
  | 'programs'
  | 'program-detail'
  | 'courses'
  | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedUniversityId, setSelectedUniversityId] = useState<number | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onSwitchToRegister={() => setCurrentPage('register')}
            onNavigate={setCurrentPage}
            onCloseSideNav={() => setNavOpen(false)}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onSwitchToLogin={() => setCurrentPage('login')}
            onNavigate={setCurrentPage}
            onCloseSideNav={() => setNavOpen(false)}
          />
        );
      case 'dashboard':
        return (
          <>
            <Header isAuthenticated={true} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <DashboardPage />
            <Footer />
          </>
        );
      case 'universities':
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <UniversityCatalogPage onNavigate={setCurrentPage} onCloseSideNav={() => setNavOpen(false)} onSelectUniversity={(id: number) => { setSelectedUniversityId(id); setCurrentPage('university-detail'); }} />
            <Footer />
          </>
        );
      case 'university-detail':
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <UniversityDetailPage universityId={selectedUniversityId} />
            <Footer />
          </>
        );
      case 'countries':
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <CountryCatalogPage onNavigate={setCurrentPage} onCloseSideNav={() => setNavOpen(false)} />
            <Footer />
          </>
        );
      case 'country-detail':
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <CountryDetailPage />
            <Footer />
          </>
        );
      case 'programs':
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <ProgramCatalogPage onNavigate={setCurrentPage} onCloseSideNav={() => setNavOpen(false)} />
            <Footer />
          </>
        );
      case 'program-detail':
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <ProgramDetailPage />
            <Footer />
          </>
        );
      case 'courses':
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <OnlineCoursesPage />
            <Footer />
          </>
        );
      case 'admin':
        return (
          <>
            <Header isAuthenticated={true} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <AdminDashboard />
          </>
        );
      default:
        return (
          <>
            <Header isAuthenticated={isAuthenticated} onNavigate={setCurrentPage} onToggleSideNav={() => setNavOpen((prev: boolean) => !prev)} onCloseSideNav={() => setNavOpen(false)} />
            <main>
              <HeroSection />
              <WhyGetGrantSection />
              <PopularProgramsSection onNavigate={setCurrentPage} onCloseSideNav={() => setNavOpen(false)} />
              <PopularCountriesSection onNavigate={setCurrentPage} onCloseSideNav={() => setNavOpen(false)} />
              <UniversityPartnersSection onNavigate={setCurrentPage} onCloseSideNav={() => setNavOpen(false)} />
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
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}

      {/* Demo Navigation: компактная боковая вкладка для десктопа + кнопка для мобильных */}
      <>
        {/* Desktop: side panel — rendered only when opened by header hamburger */}
        {navOpen && (
          <div className="fixed top-0 right-0 h-full z-50 hidden lg:block">
            <div className="w-80 h-full bg-white shadow-2xl p-6 border-l border-[#1A1A1A]/10">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-[#1A1A1A]">Навигация</div>
                <button aria-label="Закрыть" onClick={() => setNavOpen(false)} className="text-sm text-[#6D7A89]">✕</button>
              </div>
              <div className="space-y-1 max-h-[80vh] overflow-y-auto">
                {[
                  { label: 'Главная', page: 'home' as Page },
                  { label: 'Вход', page: 'login' as Page },
                  { label: 'Регистрация', page: 'register' as Page },
                  { label: 'Личный кабинет', page: 'dashboard' as Page },
                  { label: 'Каталог университетов', page: 'universities' as Page },
                  { label: 'Страница университета', page: 'university-detail' as Page },
                  { label: 'Каталог стран', page: 'countries' as Page },
                  { label: 'Страница страны', page: 'country-detail' as Page },
                  { label: 'Каталог программ', page: 'programs' as Page },
                  { label: 'Страница программы', page: 'program-detail' as Page },
                  { label: 'Онлайн-подготовка', page: 'courses' as Page },
                  { label: 'Админ-панель', page: 'admin' as Page }
                ].map((item) => (
                  <button
                    key={item.page}
                    onClick={() => { setCurrentPage(item.page); setNavOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentPage === item.page
                        ? 'bg-[#1055b2] text-white font-medium'
                        : 'hover:bg-[#F5F5F5] text-[#6D7A89]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile: keep compact bottom-right button (does not obstruct content) */}
        <div className="lg:hidden">
          <button
            aria-label="Открыть навигацию"
            onClick={() => setNavOpen((prev: boolean) => !prev)}
            className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-white border border-[#1A1A1A]/10 shadow-lg z-50 flex items-center justify-center"
          >
            <span className="text-xs font-semibold text-[#1A1A1A]">Навиг</span>
          </button>

          {navOpen && (
            <div className="fixed bottom-20 right-4 bg-white shadow-2xl rounded-xl p-4 border border-[#1A1A1A]/10 z-50 max-h-[70vh] overflow-y-auto w-64">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-[#1A1A1A]">Навигация</div>
                <button aria-label="Закрыть" onClick={() => setNavOpen(false)} className="text-sm text-[#6D7A89]">Закрыть</button>
              </div>
              <div className="space-y-1">
                {[
                  { label: 'Главная', page: 'home' as Page },
                  { label: 'Вход', page: 'login' as Page },
                  { label: 'Регистрация', page: 'register' as Page },
                  { label: 'Личный кабинет', page: 'dashboard' as Page },
                  { label: 'Каталог университетов', page: 'universities' as Page },
                  { label: 'Страница университета', page: 'university-detail' as Page },
                  { label: 'Каталог стран', page: 'countries' as Page },
                  { label: 'Страница страны', page: 'country-detail' as Page },
                  { label: 'Каталог программ', page: 'programs' as Page },
                  { label: 'Страница программы', page: 'program-detail' as Page },
                  { label: 'Онлайн-подготовка', page: 'courses' as Page },
                  { label: 'Админ-панель', page: 'admin' as Page }
                ].map((item) => (
                  <button
                    key={item.page}
                    onClick={() => { setCurrentPage(item.page); setNavOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                      currentPage === item.page
                        ? 'bg-[#1055b2] text-white font-medium'
                        : 'hover:bg-[#F5F5F5] text-[#6D7A89]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
}