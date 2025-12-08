import React from 'react';
import { GetGrantButton } from '../GetGrantButton';
import { Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';

export function HeroSection() {
  const stats = [
    { value: '500+', label: 'Поступивших студентов' },
    { value: '50+', label: 'Университетов-партнёров' },
    { value: '15+', label: 'Стран для обучения' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-white to-[#F5F5F5] overflow-hidden">
      <div className="container-custom py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1055b2]/20 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-[#1A1A1A] fill-[#1055b2]" />
              <span className="text-sm font-medium text-[#1A1A1A]">
                Лицензированный образовательный центр
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight">
                Поступи в зарубежный{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">университет</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#1055b2] -z-0"></span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#6D7A89] max-w-xl">
                Профессиональная подготовка и полное сопровождение для учеников 9–11 классов. 
                От выбора университета до успешного поступления.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GetGrantButton variant="primary" size="lg" className="group">
                Получить консультацию
              </GetGrantButton>
              <GetGrantButton variant="outline" size="lg">
                Начать подготовку
              </GetGrantButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1A1A1A]/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-[#6D7A89]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdG9nZXRoZXIlMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc2NDA1ODMzMHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students studying together"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1055b2] rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">
                      Индивидуальный менеджер
                    </div>
                    <div className="text-sm text-[#6D7A89]">
                      Персональное сопровождение 24/7
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1055b2] rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#1055b2] rounded-full blur-3xl opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
