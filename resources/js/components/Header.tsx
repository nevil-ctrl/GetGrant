import React from 'react';
import { ChevronDown, User } from 'lucide-react';
import { GetGrantButton } from './GetGrantButton';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';




interface HeaderProps {
  isAuthenticated?: boolean;
  onNavigate?: (page: string) => void;
}

export function Header({ isAuthenticated = false, onNavigate }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isUserAuthenticated = isAuthenticated || !!user;
  const isAdmin = !!user && user.role === 'admin';

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      return;
    }
    navigate(path);
  };

  const handleConsultationClick = () => {
    if (!isUserAuthenticated) {
      handleNavigate('/auth/login');
      return;
    }
    handleNavigate('/dashboard');
  };

  const handleProfileClick = () => {
    if (!isUserAuthenticated) {
      handleNavigate('/auth/login');
      return;
    }
    handleNavigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleNavigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const navigation = [
    { name: 'Университеты', path: '/universities' },
    { name: 'Страны', path: '/countries' },
    { name: 'Программы', path: '/programs' },
    { name: 'Онлайн-подготовка', path: '/courses' },
    { name: 'О нас', path: '/' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#1A1A1A]/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo (click -> home) */}
          <button
            onClick={() => {
              handleNavigate('/');
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
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className="text-[#1A1A1A] hover:text-[#6D7A89] transition-colors font-medium cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {!isUserAuthenticated ? (
              <>
                <GetGrantButton variant="ghost" size="sm" onClick={() => handleNavigate('/auth/login')}>
                  Войти
                </GetGrantButton>
                <GetGrantButton variant="primary" size="sm" onClick={handleConsultationClick}>
                  Получить консультацию
                </GetGrantButton>
              </>
            ) : (
              <>
                {isAdmin && (
                  <GetGrantButton variant="ghost" size="sm" onClick={() => handleNavigate('/admin')}>
                    Админка
                  </GetGrantButton>
                )}
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                  aria-label="Открыть профиль"
                >
                  <div className="w-10 h-10 bg-[#1055b2] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#6D7A89]" />
                </button>
                <GetGrantButton variant="ghost" size="sm" onClick={handleLogout}>
                  Выйти
                </GetGrantButton>
              </>
            )}
          </div>

          {/* Mobile CTA simplified (без гамбургера) */}
          <div className="lg:hidden flex items-center gap-2">
            {!isUserAuthenticated ? (
              <>
                <GetGrantButton variant="ghost" size="sm" onClick={() => handleNavigate('/auth/login')}>
                  Войти
                </GetGrantButton>
                <GetGrantButton variant="primary" size="sm" onClick={handleConsultationClick}>
                  Консультация
                </GetGrantButton>
              </>
            ) : (
              <>
                {isAdmin && (
                  <GetGrantButton variant="ghost" size="sm" onClick={() => handleNavigate('/admin')}>
                    Админка
                  </GetGrantButton>
                )}
                <GetGrantButton variant="ghost" size="sm" onClick={handleProfileClick}>
                  Профиль
                </GetGrantButton>
                <GetGrantButton variant="primary" size="sm" onClick={handleLogout}>
                  Выйти
                </GetGrantButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
