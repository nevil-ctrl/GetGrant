import React, { useState } from 'react';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantInput } from '../GetGrantInput';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/auth/useAuth';

export function LoginPage({ onSwitchToRegister, onNavigate, onCloseSideNav }: { onSwitchToRegister: () => void; onNavigate?: (page: string) => void; onCloseSideNav?: () => void }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await login({ email: form.email, password: form.password, remember: form.remember });
      onNavigate?.('/dashboard');
      onCloseSideNav?.();
    } catch (e: any) {
      setError('Не удалось войти. Проверьте данные и попробуйте снова.');
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
            Вход в систему
          </h2>
          <p className="text-[#6D7A89] text-center mb-4">
            Войдите, чтобы продолжить работу
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <GetGrantInput
              label="Email"
              type="email"
              placeholder="email@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <GetGrantInput
              label="Пароль"
              type="password"
              placeholder="Минимум 8 символов"
              icon={<Lock className="w-5 h-5" />}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm text-[#6D7A89]">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="w-4 h-4 border-[#1A1A1A]/20 rounded focus:ring-[#1055b2]"
              />
              Запомнить меня
            </label>
            <div className="text-right">
              <button
                type="button"
                onClick={() => onNavigate?.('/auth/forgot-password')}
                className="text-sm text-[#1055b2] hover:underline"
              >
                Забыли пароль?
              </button>
            </div>
          </div>

          <GetGrantButton
            variant="primary"
            size="lg"
            className="w-full mt-6"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Входим...' : 'Войти'}
          </GetGrantButton>

          {/* Register Link */}
          <p className="text-center text-sm text-[#6D7A89] mt-6">
            Нет аккаунта?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-[#1A1A1A] font-medium hover:underline"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
