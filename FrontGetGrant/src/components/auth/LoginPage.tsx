import React, { useState } from 'react';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantInput } from '../GetGrantInput';
import { GetGrantModal } from '../GetGrantModal';
import { Mail, Phone, Facebook, Chrome } from 'lucide-react';
import { motion } from 'motion/react';

export function LoginPage({ onSwitchToRegister, onNavigate, onCloseSideNav }: { onSwitchToRegister: () => void; onNavigate?: (page: string) => void; onCloseSideNav?: () => void }) {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [showOTP, setShowOTP] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');

  React.useEffect(() => {
    if (showOTP && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showOTP, timer]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otpValues];
      newOTP[index] = value;
      setOtpValues(newOTP);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = () => {
    setShowOTP(true);
    setTimer(60);
  };

  const handleResendOTP = () => {
    setTimer(60);
    setOtpValues(['', '', '', '', '', '']);
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
          <p className="text-[#6D7A89] text-center mb-8">
            Войдите, чтобы продолжить работу
          </p>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 bg-[#F5F5F5] p-1 rounded-lg">
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 font-medium ${
                loginMethod === 'phone'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'text-[#6D7A89]'
              }`}
            >
              Телефон
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 font-medium ${
                loginMethod === 'email'
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'text-[#6D7A89]'
              }`}
            >
              Email
            </button>
          </div>

          {/* Input Field */}
          {loginMethod === 'phone' ? (
            <GetGrantInput
              type="tel"
              placeholder="+7 (999) 123-45-67"
              icon={<Phone className="w-5 h-5" />}
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />
          ) : (
            <GetGrantInput
              type="email"
              placeholder="email@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />
          )}

          {/* Login Button */}
          <GetGrantButton
            variant="primary"
            size="lg"
            className="w-full mt-6"
            onClick={handleLogin}
          >
            Получить код
          </GetGrantButton>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1A1A1A]/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#6D7A89]">Или войти через</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#1A1A1A]/10 rounded-lg hover:bg-[#F5F5F5] transition-colors min-h-[44px]">
              <Chrome className="w-5 h-5" />
              <span className="font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#1A1A1A]/10 rounded-lg hover:bg-[#F5F5F5] transition-colors min-h-[44px]">
              <Facebook className="w-5 h-5" />
              <span className="font-medium">Facebook</span>
            </button>
          </div>

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

      {/* OTP Modal */}
      <GetGrantModal isOpen={showOTP} onClose={() => setShowOTP(false)} title="Введите код">
        <div className="text-center mb-6">
          <p className="text-[#6D7A89]">
            Мы отправили код подтверждения на {loginMethod === 'phone' ? 'телефон' : 'email'}
          </p>
          <p className="font-medium text-[#1A1A1A] mt-1">{phoneOrEmail}</p>
        </div>

        {/* OTP Input */}
        <div className="flex gap-2 justify-center mb-6">
          {otpValues.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              className="w-12 h-12 text-center text-xl font-semibold border-2 border-[#1A1A1A]/10 rounded-lg focus:border-[#1055b2] focus:outline-none transition-colors"
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="text-center mb-6">
          {timer > 0 ? (
            <p className="text-sm text-[#6D7A89]">
              Отправить код повторно через {timer} сек
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-sm text-[#1A1A1A] font-medium hover:underline"
            >
              Отправить код повторно
            </button>
          )}
        </div>

        <GetGrantButton variant="primary" size="lg" className="w-full">
          Подтвердить
        </GetGrantButton>
      </GetGrantModal>
    </div>
  );
}
