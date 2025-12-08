import React, { useState } from 'react';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { GetGrantButton } from './GetGrantButton';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  isAuthenticated?: boolean;
  onNavigate?: (page: string) => void;
  onToggleSideNav?: () => void;
  onCloseSideNav?: () => void;
}

export function Header({ isAuthenticated = false, onNavigate, onToggleSideNav, onCloseSideNav }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navigation = [
    { name: 'Университеты', href: '#universities', page: 'universities' },
    { name: 'Страны', href: '#countries', page: 'countries' },
    { name: 'Программы', href: '#programs', page: 'programs' },
    { name: 'Онлайн-подготовка', href: '#courses', page: 'courses' },
    { name: 'О нас', href: '#about', page: 'home' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#1A1A1A]/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo (click -> home) */}
          <button
            onClick={() => {
              onNavigate?.('home');
              onCloseSideNav?.();
            }}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Перейти на главную"
          >
            <div className="w-10 h-10 bg-[#1055b2] rounded-lg flex items-center justify-center">
              <span className="text-[#ffffff] font-bold text-xl">G</span>
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">GetGrant</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  // prefer SPA navigation if handler provided
                  onNavigate?.(item.page);
                }}
                className="text-[#1A1A1A] hover:text-[#6D7A89] transition-colors font-medium cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop side-nav toggle (hamburger) */}
          <div className="hidden lg:flex items-center ml-4">
            <button
              aria-label="Открыть боковую навигацию"
              onClick={() => onToggleSideNav?.()}
              className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-[#1A1A1A]" />
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <GetGrantButton variant="ghost" size="sm" onClick={() => onNavigate?.('login')}>
                  Войти
                </GetGrantButton>
                <GetGrantButton variant="primary" size="sm" onClick={() => onNavigate?.('register')}>
                  Получить консультацию
                </GetGrantButton>
              </>
            ) : (
              <button className="flex items-center gap-2 p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                <div className="w-10 h-10 bg-[#1055b2] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1A1A1A]" />
                </div>
                <ChevronDown className="w-4 h-4 text-[#6D7A89]" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#1A1A1A]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1A1A1A]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#1A1A1A]/10 bg-white"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      onNavigate?.(item.page);
                    }}
                    className="px-4 py-3 text-[#1A1A1A] hover:bg-[#F5F5F5] rounded-lg transition-colors font-medium cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2">
                {!isAuthenticated ? (
                  <>
                    <GetGrantButton variant="outline" size="md" className="w-full" onClick={() => { setMobileMenuOpen(false); onNavigate?.('login'); }}>
                      Войти
                    </GetGrantButton>
                    <GetGrantButton variant="primary" size="md" className="w-full" onClick={() => { setMobileMenuOpen(false); onNavigate?.('register'); }}>
                      Получить консультацию
                    </GetGrantButton>
                  </>
                ) : (
                  <GetGrantButton variant="outline" size="md" className="w-full">
                    Личный кабинет
                  </GetGrantButton>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
