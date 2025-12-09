import React, { useState } from 'react';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantInput } from '../GetGrantInput';
import { User, GraduationCap, Mail, Phone, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/auth/useAuth';

export function RegisterPage({ onSwitchToLogin, onNavigate, onCloseSideNav }: { onSwitchToLogin: () => void; onNavigate?: (page: string) => void; onCloseSideNav?: () => void }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    profile_type: 'student' as 'student' | 'parent',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await register(formData);
      onNavigate?.('/dashboard');
      onCloseSideNav?.();
    } catch (e: any) {
      setError('Не удалось зарегистрироваться. Проверьте данные и попробуйте снова.');
      console.error(e);
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
          <p className="text-[#6D7A89] text-center mb-4">
            Создайте аккаунт для начала работы
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

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

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1A1A]">Тип профиля</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, profile_type: 'student' })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.profile_type === 'student'
                      ? 'border-[#1055b2] bg-[#1055b2]/10'
                      : 'border-[#1A1A1A]/10 hover:border-[#1055b2]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1055b2] rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-[#1A1A1A]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A]">Студент</div>
                      <div className="text-xs text-[#6D7A89]">Поступаю в университет</div>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, profile_type: 'parent' })}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.profile_type === 'parent'
                      ? 'border-[#1055b2] bg-[#1055b2]/10'
                      : 'border-[#1A1A1A]/10 hover:border-[#1055b2]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1055b2] rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-[#1A1A1A]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A]">Родитель</div>
                      <div className="text-xs text-[#6D7A89]">Помогаю ребёнку поступать</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <GetGrantInput
              label="Пароль"
              type="password"
              placeholder="Минимум 8 символов"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <GetGrantInput
              label="Подтверждение пароля"
              type="password"
              placeholder="Повторите пароль"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password_confirmation}
              onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
            />
          </div>

          {/* Register Button */}
          <GetGrantButton
            variant="primary"
            size="lg"
            className="w-full mt-6"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
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
      </motion.div>
    </div>
  );
}
