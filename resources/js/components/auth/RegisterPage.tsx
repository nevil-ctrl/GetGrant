import React, { useState } from 'react';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantInput } from '../GetGrantInput';
import { GetGrantModal } from '../GetGrantModal';
import { User, GraduationCap, Mail, Phone, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export function RegisterPage({ onSwitchToLogin, onNavigate, onCloseSideNav }: { onSwitchToLogin: () => void; onNavigate?: (page: string) => void; onCloseSideNav?: () => void }) {
  const [step, setStep] = useState<'info' | 'role'>('info');
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleRegister = () => {
    setStep('role');
  };

  const handleRoleSelect = (role: 'student' | 'parent') => {
    setSelectedRole(role);
    // Here you would typically save the user data and redirect
    console.log('User registered as:', role, formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F5F5F5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {step === 'info' ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo (click -> home) */}
            <button
              onClick={() => {
                onNavigate?.('home');
                onCloseSideNav?.();
              }}
              className="flex items-center justify-center gap-2 mb-8 focus:outline-none"
              aria-label="Перейти на главную"
            >
              <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center">
                <span className="text-[#1A1A1A] font-bold text-2xl">G</span>
              </div>
              <span className="text-2xl font-bold text-[#1A1A1A]">GetGrant</span>
            </button>

            <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-2">
              Регистрация
            </h2>
            <p className="text-[#6D7A89] text-center mb-8">
              Создайте аккаунт для начала работы
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
              <GetGrantInput
                label="Полное имя"
                type="text"
                placeholder="Иван Иванов"
                icon={<User className="w-5 h-5" />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <GetGrantInput
                label="Email"
                type="email"
                placeholder="email@example.com"
                icon={<Mail className="w-5 h-5" />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <GetGrantInput
                label="Телефон"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                icon={<Phone className="w-5 h-5" />}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <GetGrantInput
                label="Пароль"
                type="password"
                placeholder="Минимум 8 символов"
                icon={<Lock className="w-5 h-5" />}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 mt-6">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 border-[#1A1A1A]/20 rounded focus:ring-[#1055b2]"
              />
              <label htmlFor="terms" className="text-sm text-[#6D7A89]">
                Я соглашаюсь с{' '}
                <a href="#" className="text-[#1A1A1A] hover:underline">
                  условиями использования
                </a>{' '}
                и{' '}
                <a href="#" className="text-[#1A1A1A] hover:underline">
                  политикой конфиденциальности
                </a>
              </label>
            </div>

            {/* Register Button */}
            <GetGrantButton
              variant="primary"
              size="lg"
              className="w-full mt-6"
              onClick={handleRegister}
            >
              Продолжить
            </GetGrantButton>

            {/* Login Link */}
            <p className="text-center text-sm text-[#6D7A89] mt-6">
              Уже есть аккаунт?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-[#1A1A1A] font-medium hover:underline"
              >
                Войти
              </button>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-2">
              Выберите роль
            </h2>
            <p className="text-[#6D7A89] text-center mb-8">
              Укажите, кто вы, чтобы мы могли настроить платформу для вас
            </p>

            <div className="space-y-4">
              {/* Student Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleRoleSelect('student')}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedRole === 'student'
                      ? 'border-[#1055b2] bg-[#1055b2]/10'
                        : 'border-[#1A1A1A]/10 hover:border-[#1055b2]/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-[#1A1A1A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                        Я ученик
                      </h3>
                      <p className="text-sm text-[#6D7A89]">
                        Я планирую поступать в зарубежный университет и хочу получить помощь в подготовке
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Parent Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleRoleSelect('parent')}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedRole === 'parent'
                      ? 'border-[#1055b2] bg-[#1055b2]/10'
                      : 'border-[#1A1A1A]/10 hover:border-[#1055b2]/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-[#1A1A1A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
                        Я родитель
                      </h3>
                      <p className="text-sm text-[#6D7A89]">
                        Я ищу возможности обучения за рубежом для моего ребёнка
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>

            <GetGrantButton
              variant="outline"
              size="md"
              className="w-full mt-6"
              onClick={() => setStep('info')}
            >
              Назад
            </GetGrantButton>
          </div>
        )}
      </motion.div>
    </div>
  );
}
