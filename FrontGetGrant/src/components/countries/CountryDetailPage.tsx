import React from 'react';
import { GetGrantCard, GetGrantCardContent } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  MapPin, Users, DollarSign, Home, Briefcase, GraduationCap, 
  TrendingUp, Clock, FileText, Heart 
} from 'lucide-react';
import { motion } from 'motion/react';

export function CountryDetailPage() {
  const country = {
    flag: '🇺🇸',
    name: 'США',
    fullName: 'Соединенные Штаты Америки',
    capital: 'Вашингтон',
    language: 'Английский',
    currency: 'USD ($)',
    population: '331 млн',
    timezone: 'UTC-5 до UTC-10'
  };

  const costOfLiving = {
    rent: { min: '$800', max: '$2,500', avg: '$1,500' },
    food: { min: '$300', max: '$600', avg: '$400' },
    transport: { min: '$50', max: '$150', avg: '$100' },
    utilities: { min: '$100', max: '$200', avg: '$150' },
    total: { min: '$1,250', max: '$3,450', avg: '$2,150' }
  };

  const visaInfo = [
    { title: 'F-1 Student Visa', description: 'Основная студенческая виза для обучения в аккредитованных университетах' },
    { title: 'J-1 Exchange Visa', description: 'Для участия в программах обмена и стажировках' },
    { title: 'OPT (Optional Practical Training)', description: '12-36 месяцев работы после окончания обучения' }
  ];

  const topUniversities = [
    { name: 'Harvard University', ranking: 1, city: 'Cambridge, MA', tuition: '$54,000' },
    { name: 'MIT', ranking: 2, city: 'Cambridge, MA', tuition: '$55,000' },
    { name: 'Stanford University', ranking: 3, city: 'Stanford, CA', tuition: '$56,000' },
    { name: 'Yale University', ranking: 4, city: 'New Haven, CT', tuition: '$57,000' },
    { name: 'Princeton University', ranking: 5, city: 'Princeton, NJ', tuition: '$53,000' },
    { name: 'Columbia University', ranking: 6, city: 'New York, NY', tuition: '$61,000' }
  ];

  const popularCities = [
    { 
      name: 'Нью-Йорк', 
      description: 'Финансовый и культурный центр',
      universities: 50,
      cost: 'Высокая'
    },
    { 
      name: 'Бостон', 
      description: 'Академическая столица США',
      universities: 35,
      cost: 'Высокая'
    },
    { 
      name: 'Лос-Анджелес', 
      description: 'Центр индустрии развлечений',
      universities: 40,
      cost: 'Средняя-Высокая'
    },
    { 
      name: 'Сан-Франциско', 
      description: 'Технологический хаб',
      universities: 25,
      cost: 'Очень высокая'
    }
  ];

  const advantages = [
    {
      icon: GraduationCap,
      title: 'Топовое образование',
      description: 'США имеет наибольшее количество университетов в топ-100 мира'
    },
    {
      icon: Briefcase,
      title: 'Карьерные возможности',
      description: 'OPT позволяет работать до 3 лет после окончания обучения'
    },
    {
      icon: Users,
      title: 'Разнообразие',
      description: 'Мультикультурная среда и студенты из 200+ стран'
    },
    {
      icon: TrendingUp,
      title: 'Инновации',
      description: 'Лидер в технологиях, стартапах и исследованиях'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="text-8xl">{country.flag}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{country.fullName}</h1>
              <div className="flex flex-wrap gap-4 text-[#6D7A89]">
                <span>Столица: {country.capital}</span>
                <span>•</span>
                <span>Язык: {country.language}</span>
                <span>•</span>
                <span>Валюта: {country.currency}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Key Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">Преимущества обучения</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <GetGrantCard key={index}>
                <GetGrantCardContent>
                  <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center mb-4">
                    <advantage.icon className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">{advantage.title}</h3>
                  <p className="text-sm text-[#6D7A89]">{advantage.description}</p>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* Cost of Living */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">Стоимость жизни (в месяц)</h2>
          <GetGrantCard>
            <GetGrantCardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 pb-4 border-b border-[#1A1A1A]/10 font-semibold text-sm">
                  <div>Категория</div>
                  <div className="text-center">Минимум</div>
                  <div className="text-center">Среднее</div>
                  <div className="text-center">Максимум</div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#1055b2]" />
                    <span className="text-sm">Аренда жилья</span>
                  </div>
                  <div className="text-center text-sm">{costOfLiving.rent.min}</div>
                  <div className="text-center font-semibold">{costOfLiving.rent.avg}</div>
                  <div className="text-center text-sm">{costOfLiving.rent.max}</div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#1055b2]" />
                    <span className="text-sm">Питание</span>
                  </div>
                  <div className="text-center text-sm">{costOfLiving.food.min}</div>
                  <div className="text-center font-semibold">{costOfLiving.food.avg}</div>
                  <div className="text-center text-sm">{costOfLiving.food.max}</div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1055b2]" />
                    <span className="text-sm">Транспорт</span>
                  </div>
                  <div className="text-center text-sm">{costOfLiving.transport.min}</div>
                  <div className="text-center font-semibold">{costOfLiving.transport.avg}</div>
                  <div className="text-center text-sm">{costOfLiving.transport.max}</div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1055b2]" />
                    <span className="text-sm">Коммунальные услуги</span>
                  </div>
                  <div className="text-center text-sm">{costOfLiving.utilities.min}</div>
                  <div className="text-center font-semibold">{costOfLiving.utilities.avg}</div>
                  <div className="text-center text-sm">{costOfLiving.utilities.max}</div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center pt-4 border-t border-[#1A1A1A]/10">
                  <div className="font-semibold">Итого</div>
                  <div className="text-center">{costOfLiving.total.min}</div>
                  <div className="text-center text-xl font-bold text-[#1A1A1A]">{costOfLiving.total.avg}</div>
                  <div className="text-center">{costOfLiving.total.max}</div>
                </div>
              </div>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>

        {/* Top Universities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Топ университеты</h2>
            <GetGrantButton variant="outline" size="sm">
              Смотреть все
            </GetGrantButton>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((uni, index) => (
              <GetGrantCard key={index} hoverable>
                <GetGrantCardContent>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-[#1A1A1A] flex-1">{uni.name}</h3>
                    <GetGrantBadge variant="yellow">#{uni.ranking}</GetGrantBadge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6D7A89] mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{uni.city}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#6D7A89]">Стоимость: </span>
                    <span className="font-semibold text-[#1A1A1A]">{uni.tuition}/год</span>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* Popular Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">Популярные города</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCities.map((city, index) => (
              <GetGrantCard key={index} hoverable>
                <GetGrantCardContent>
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">{city.name}</h3>
                  <p className="text-sm text-[#6D7A89] mb-3">{city.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6D7A89]">{city.universities} университетов</span>
                    <GetGrantBadge variant="outline">{city.cost}</GetGrantBadge>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* Visa Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">Визовая информация</h2>
          <div className="space-y-4">
            {visaInfo.map((visa, index) => (
              <GetGrantCard key={index}>
                <GetGrantCardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#1A1A1A]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-1">{visa.title}</h3>
                      <p className="text-sm text-[#6D7A89]">{visa.description}</p>
                    </div>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GetGrantCard className="bg-gradient-to-br from-[#1055b2]/20 to-white text-center">
            <GetGrantCardContent className="p-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
                Готовы начать обучение в {country.name}?
              </h2>
              <p className="text-[#6D7A89] mb-6 max-w-2xl mx-auto">
                Получите персональную консультацию по выбору университета и помощь в подготовке документов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GetGrantButton variant="primary" size="lg">
                  Получить консультацию
                </GetGrantButton>
                <GetGrantButton variant="outline" size="lg">
                  Смотреть университеты
                </GetGrantButton>
              </div>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>
      </div>
    </div>
  );
}
