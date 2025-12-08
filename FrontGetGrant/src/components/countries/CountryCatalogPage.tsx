import React from 'react';
import { GetGrantCard, GetGrantCardContent } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { Check, TrendingUp, DollarSign, Home, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

interface CountryCatalogPageProps {
  onNavigate?: (page: string) => void;
  onCloseSideNav?: () => void;
}

export function CountryCatalogPage({ onNavigate, onCloseSideNav }: CountryCatalogPageProps) {
  const countries = [
    {
      id: 1,
      flag: '🇺🇸',
      name: 'США',
      fullName: 'Соединенные Штаты Америки',
      universities: 2500,
      students: 200,
      avgCost: '$40,000-70,000',
      topUniversities: ['Harvard', 'MIT', 'Stanford'],
      benefits: [
        'Топ университеты мира',
        'Широкий выбор программ',
        'Постдипломная работа (OPT)',
        'Инновационная среда'
      ]
    },
    {
      id: 2,
      flag: '🇬🇧',
      name: 'Великобритания',
      fullName: 'Соединённое Королевство',
      universities: 160,
      students: 150,
      avgCost: '£20,000-40,000',
      topUniversities: ['Oxford', 'Cambridge', 'Imperial College'],
      benefits: [
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
      fullName: 'Канада',
      universities: 100,
      students: 120,
      avgCost: 'CAD 25,000-50,000',
      topUniversities: ['Toronto', 'UBC', 'McGill'],
      benefits: [
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
      fullName: 'Федеративная Республика Германия',
      universities: 400,
      students: 80,
      avgCost: '€0-20,000',
      topUniversities: ['TUM', 'LMU Munich', 'Heidelberg'],
      benefits: [
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
      fullName: 'Австралийский Союз',
      universities: 43,
      students: 65,
      avgCost: 'AUD 30,000-50,000',
      topUniversities: ['Melbourne', 'Sydney', 'ANU'],
      benefits: [
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
      fullName: 'Королевство Нидерландов',
      universities: 70,
      students: 45,
      avgCost: '€8,000-20,000',
      topUniversities: ['Amsterdam', 'Delft', 'Utrecht'],
      benefits: [
        'Программы на английском',
        'Инновационный подход',
        'Центр Европы',
        'Студенческие льготы'
      ]
    },
    {
      id: 7,
      flag: '🇫🇷',
      name: 'Франция',
      fullName: 'Французская Республика',
      universities: 300,
      students: 40,
      avgCost: '€3,000-15,000',
      topUniversities: ['Sorbonne', 'Sciences Po', 'HEC Paris'],
      benefits: [
        'Низкая стоимость',
        'Европейское качество',
        'Культурное наследие',
        'Французский язык'
      ]
    },
    {
      id: 8,
      flag: '🇸🇬',
      name: 'Сингапур',
      fullName: 'Республика Сингапур',
      universities: 15,
      students: 30,
      avgCost: 'SGD 25,000-45,000',
      topUniversities: ['NUS', 'NTU', 'SMU'],
      benefits: [
        'Азиатский хаб',
        'Высокие технологии',
        'Безопасность',
        'Английский язык'
      ]
    },
    {
      id: 9,
      flag: '🇨🇭',
      name: 'Швейцария',
      fullName: 'Швейцарская Конфедерация',
      universities: 50,
      students: 25,
      avgCost: 'CHF 1,000-8,000',
      topUniversities: ['ETH Zurich', 'EPFL', 'Geneva'],
      benefits: [
        'Низкая стоимость',
        'Топ-исследования',
        'Многоязычность',
        'Центр Европы'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
            Выберите страну для обучения
          </h1>
          <p className="text-lg text-[#6D7A89] max-w-2xl mx-auto">
            Исследуйте образовательные возможности в ведущих странах мира
          </p>
        </motion.div>

        {/* Countries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <GetGrantCard hoverable className="h-full">
                <GetGrantCardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-6xl">{country.flag}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">
                        {country.name}
                      </h2>
                      <p className="text-sm text-[#6D7A89]">{country.fullName}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[#F5F5F5] rounded-lg">
                    <div className="text-center">
                      <div className="font-bold text-[#1A1A1A]">{country.universities}</div>
                      <div className="text-xs text-[#6D7A89]">ВУЗов</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#1A1A1A]">{country.students}+</div>
                      <div className="text-xs text-[#6D7A89]">Студентов</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#1A1A1A] text-sm">{country.avgCost}</div>
                      <div className="text-xs text-[#6D7A89]">В год</div>
                    </div>
                  </div>

                  {/* Top Universities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">Топ университеты:</h4>
                    <div className="flex flex-wrap gap-2">
                      {country.topUniversities.map((uni) => (
                        <span key={uni} className="text-xs px-2 py-1 bg-[#1055b2]/20 text-[#1A1A1A] rounded">
                          {uni}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {country.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1055b2] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#1A1A1A]">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <GetGrantButton
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      onNavigate?.('country-detail');
                      onCloseSideNav?.();
                    }}
                  >
                    Подробнее о стране
                  </GetGrantButton>
                </GetGrantCardContent>
              </GetGrantCard>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GetGrantCard className="text-center bg-gradient-to-br from-[#1055b2]/20 to-white">
            <GetGrantCardContent className="p-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
                Не можете определиться?
              </h2>
              <p className="text-[#6D7A89] mb-6 max-w-2xl mx-auto">
                Наши эксперты помогут выбрать оптимальную страну и университет 
                исходя из ваших целей, бюджета и предпочтений
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GetGrantButton variant="primary" size="lg">
                  Получить консультацию
                </GetGrantButton>
                <GetGrantButton variant="outline" size="lg">
                  Пройти тест на подбор
                </GetGrantButton>
              </div>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>
      </div>
    </div>
  );
}
