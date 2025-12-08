import React from 'react';
import { GetGrantCard } from '../GetGrantCard';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface PopularCountriesSectionProps {
  onNavigate?: (page: string) => void;
  onCloseSideNav?: () => void;
}

export function PopularCountriesSection({ onNavigate, onCloseSideNav }: PopularCountriesSectionProps) {
  const countries = [
    {
      id: 1,
      flag: '🇺🇸',
      name: 'США',
      universities: '2,500+',
      students: '200+',
      points: [
        'Топ университеты мира',
        'Широкий выбор программ',
        'Постдипломная работа (OPT)',
        'Стипендии и гранты'
      ]
    },
    {
      id: 2,
      flag: '🇬🇧',
      name: 'Великобритания',
      universities: '160+',
      students: '150+',
      points: [
        'Престижное образование',
        'Короткие программы (3 года)',
        'Graduate Route виза',
        'Культурное разнообразие'
      ]
    },
    {
      id: 3,
      flag: '🇨🇦',
      name: 'Канада',
      universities: '100+',
      students: '120+',
      points: [
        'Доступные цены',
        'Иммиграционные программы',
        'Высокое качество жизни',
        'Безопасная среда'
      ]
    },
    {
      id: 4,
      flag: '🇩🇪',
      name: 'Германия',
      universities: '400+',
      students: '80+',
      points: [
        'Бесплатное образование',
        'Сильные технические ВУЗы',
        'Европейский диплом',
        'Возможность работы'
      ]
    },
    {
      id: 5,
      flag: '🇦🇺',
      name: 'Австралия',
      universities: '43',
      students: '65+',
      points: [
        'Высокие рейтинги',
        'Комфортный климат',
        'Работа во время учёбы',
        'Мультикультурность'
      ]
    },
    {
      id: 6,
      flag: '🇳🇱',
      name: 'Нидерланды',
      universities: '70+',
      students: '45+',
      points: [
        'Программы на английском',
        'Инновационный подход',
        'Центр Европы',
        'Студенческие льготы'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Популярные страны
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#6D7A89] max-w-2xl mx-auto"
          >
            Выбирайте страну для обучения из наших топовых направлений
          </motion.p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GetGrantCard
                hoverable
                className="h-full"
                onClick={() => { onNavigate?.('country-detail'); onCloseSideNav?.(); }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{country.flag}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">
                      {country.name}
                    </h3>
                    <div className="flex gap-4 text-sm text-[#6D7A89]">
                      <span>{country.universities} ВУЗов</span>
                      <span>•</span>
                      <span>{country.students} наших студентов</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {country.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1055b2] mt-1 flex-shrink-0" />
                      <span className="text-sm text-[#1A1A1A]">{point}</span>
                    </li>
                  ))}
                </ul>
              </GetGrantCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
