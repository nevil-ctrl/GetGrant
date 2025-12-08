import React from 'react';
import { GetGrantCard, GetGrantCardContent } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { GetGrantTabs } from '../GetGrantTabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  MapPin, Globe, Users, GraduationCap, Star, Calendar, 
  DollarSign, Check, AlertCircle, BookOpen 
} from 'lucide-react';
import { motion } from 'motion/react';

export function UniversityDetailPage({ universityId }: { universityId?: number | null }) {
  const universities: Record<number, any> = {
    1: {
      name: 'Harvard University',
      logo: 'H',
      country: 'США',
      city: 'Cambridge, MA',
      image: 'https://images.unsplash.com/photo-1542843895-1b55d9f8ece8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      ranking: 1,
      website: 'harvard.edu',
      students: 23000,
      acceptance: '4.5%'
    },
    2: {
      name: 'Oxford University',
      logo: 'O',
      country: 'Великобритания',
      city: 'Oxford',
      image: 'https://images.unsplash.com/photo-1702238230256-f798027de7c9?q=80&w=1080',
      ranking: 2,
      website: 'ox.ac.uk',
      students: 24000,
      acceptance: '17.5%'
    },
    3: {
      name: 'Stanford University',
      logo: 'S',
      country: 'США',
      city: 'Stanford, CA',
      image: 'https://images.unsplash.com/photo-1762410281840-686c2d40cd42?q=80&w=1080',
      ranking: 3,
      website: 'stanford.edu',
      students: 17000,
      acceptance: '3.9%'
    }
  };

  const university = (universityId && universities[universityId]) ? universities[universityId] : universities[1];

  const overview = {
    description: 'Harvard University — старейший вуз США, основанный в 1636 году. Расположен в Кембридже, штат Массачусетс. Harvard входит в элитную группу университетов Ivy League и является одним из самых престижных учебных заведений мира.',
    highlights: [
      'Входит в топ-3 университетов мира',
      'Более 400 лет академической традиции',
      'Выпускники — лауреаты Нобелевской премии, президенты, лидеры бизнеса',
      'Богатейшая библиотечная система в мире',
      'Исключительные возможности для исследований'
    ],
    faculties: [
      'Факультет искусств и наук',
      'Бизнес-школа',
      'Медицинская школа',
      'Школа права',
      'Школа государственного управления',
      'Школа инженерии и прикладных наук'
    ]
  };

  const requirements = {
    academic: [
      'GPA минимум 3.8 (из 4.0)',
      'SAT: 1460-1570 или ACT: 33-35',
      'Сильная академическая подготовка в школе',
      'Продвинутые курсы (AP, IB, A-Level)'
    ],
    language: [
      'TOEFL iBT: минимум 100',
      'IELTS: минимум 7.0',
      'Duolingo English Test: минимум 125'
    ],
    documents: [
      'Заявка через Common Application',
      'Эссе (Personal Statement)',
      'Дополнительные эссе Harvard',
      'Транскрипт с оценками',
      '2 рекомендательных письма от учителей',
      'Резюме с достижениями',
      'Финансовые документы'
    ]
  };

  const deadlines = [
    { type: 'Early Action', date: '1 ноября 2024', notification: '15 декабря 2024' },
    { type: 'Regular Decision', date: '1 января 2025', notification: '1 апреля 2025' },
    { type: 'Финансовая помощь', date: '1 февраля 2025', notification: 'С решением о зачислении' }
  ];

  const costs = {
    tuition: '$54,269',
    housing: '$12,056',
    meals: '$7,225',
    books: '$1,000',
    personal: '$2,500',
    total: '$77,050'
  };

  const reviews = [
    {
      id: 1,
      author: 'Мария К.',
      year: '2023',
      program: 'Computer Science',
      rating: 5,
      text: 'Невероятный опыт! Преподаватели мирового уровня, потрясающие возможности для исследований и networking. Поступление было сложным, но GetGrant очень помог с подготовкой документов.'
    },
    {
      id: 2,
      author: 'Александр П.',
      year: '2022',
      program: 'Economics',
      rating: 5,
      text: 'Harvard превзошел все ожидания. Академический уровень высочайший, но университет предоставляет отличную поддержку студентам. Очень благодарен команде GetGrant за помощь в поступлении.'
    },
    {
      id: 3,
      author: 'Екатерина С.',
      year: '2021',
      program: 'Biology',
      rating: 5,
      text: 'Лучшее решение в моей жизни. Невероятные возможности для научных исследований, стажировок и карьерного роста. Менеджер GetGrant помог пройти через весь процесс поступления.'
    }
  ];

  const relatedPrograms = [
    { name: 'Computer Science', duration: '4 года', level: 'Bachelor' },
    { name: 'Business Administration', duration: '4 года', level: 'Bachelor' },
    { name: 'Medicine', duration: '4 года', level: 'Pre-Med' },
    { name: 'Law', duration: '3 года', level: 'Juris Doctor' }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Обзор',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">О университете</h3>
            <p className="text-[#6D7A89] leading-relaxed mb-6">
              {overview.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Ключевые преимущества</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {overview.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#1055b2] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1A1A1A]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Факультеты</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {overview.faculties.map((faculty, index) => (
                <GetGrantCard key={index}>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#1055b2]" />
                    <span className="text-sm text-[#1A1A1A]">{faculty}</span>
                  </div>
                </GetGrantCard>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'requirements',
      label: 'Требования',
      content: (
        <div className="space-y-8">
          <GetGrantCard>
            <GetGrantCardContent>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Академические требования
              </h3>
              <ul className="space-y-2">
                {requirements.academic.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#1055b2] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1A1A1A]">{req}</span>
                  </li>
                ))}
              </ul>
            </GetGrantCardContent>
          </GetGrantCard>

          <GetGrantCard>
            <GetGrantCardContent>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Языковые требования
              </h3>
              <ul className="space-y-2">
                {requirements.language.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#1055b2] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1A1A1A]">{req}</span>
                  </li>
                ))}
              </ul>
            </GetGrantCardContent>
          </GetGrantCard>

          <GetGrantCard>
            <GetGrantCardContent>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Необходимые документы
              </h3>
              <ul className="space-y-2">
                {requirements.documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#1055b2] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1A1A1A]">{doc}</span>
                  </li>
                ))}
              </ul>
            </GetGrantCardContent>
          </GetGrantCard>
        </div>
      )
    },
    {
      id: 'deadlines',
      label: 'Дедлайны',
      content: (
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <GetGrantCard key={index}>
              <GetGrantCardContent>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">{deadline.type}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#6D7A89]">Дедлайн подачи:</span>
                        <p className="font-medium text-[#1A1A1A]">{deadline.date}</p>
                      </div>
                      <div>
                        <span className="text-[#6D7A89]">Уведомление:</span>
                        <p className="font-medium text-[#1A1A1A]">{deadline.notification}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GetGrantCardContent>
            </GetGrantCard>
          ))}

          <div className="bg-[#1055b2]/10 border border-[#1055b2] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#1A1A1A] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#1A1A1A] mb-1">Важно!</h4>
                <p className="text-sm text-[#1A1A1A]">
                  Рекомендуем начинать подготовку документов минимум за 6 месяцев до дедлайна. 
                  Наши менеджеры помогут вам не пропустить важные даты.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'costs',
      label: 'Стоимость',
      content: (
        <div className="space-y-6">
          <GetGrantCard>
            <GetGrantCardContent>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6">
                Стоимость обучения на 2024-2025 год
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]/10">
                  <span className="text-[#6D7A89]">Обучение</span>
                  <span className="font-semibold text-[#1A1A1A]">{costs.tuition}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]/10">
                  <span className="text-[#6D7A89]">Проживание</span>
                  <span className="font-semibold text-[#1A1A1A]">{costs.housing}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]/10">
                  <span className="text-[#6D7A89]">Питание</span>
                  <span className="font-semibold text-[#1A1A1A]">{costs.meals}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]/10">
                  <span className="text-[#6D7A89]">Книги и материалы</span>
                  <span className="font-semibold text-[#1A1A1A]">{costs.books}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]/10">
                  <span className="text-[#6D7A89]">Личные расходы</span>
                  <span className="font-semibold text-[#1A1A1A]">{costs.personal}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-[#1A1A1A]">Итого за год</span>
                  <span className="text-2xl font-bold text-[#1A1A1A]">{costs.total}</span>
                </div>
              </div>
            </GetGrantCardContent>
          </GetGrantCard>

          <GetGrantCard className="bg-[#1055b2]/10">
            <GetGrantCardContent>
              <h4 className="font-semibold text-[#1A1A1A] mb-3">Финансовая помощь</h4>
              <p className="text-sm text-[#1A1A1A] mb-4">
                Harvard предлагает need-based финансовую помощь для иностранных студентов. 
                Около 60% студентов получают финансовую помощь. Стипендии не нужно возвращать.
              </p>
              <GetGrantButton variant="outline" size="sm">
                Узнать о стипендиях
              </GetGrantButton>
            </GetGrantCardContent>
          </GetGrantCard>
        </div>
      )
    },
    {
      id: 'reviews',
      label: 'Отзывы',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1A1A1A]">5.0</div>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#1055b2] text-[#1055b2]" />
                ))}
              </div>
              <div className="text-sm text-[#6D7A89] mt-1">3 отзыва</div>
            </div>
          </div>

          {reviews.map((review) => (
            <GetGrantCard key={review.id}>
              <GetGrantCardContent>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A]">{review.author}</h4>
                    <p className="text-sm text-[#6D7A89]">
                      {review.program} • Поступил в {review.year}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-[#1055b2] text-[#1055b2]'
                            : 'text-[#6D7A89]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[#1A1A1A]">{review.text}</p>
              </GetGrantCardContent>
            </GetGrantCard>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="container-custom -mt-32 relative z-10 pb-16">
        {/* University Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GetGrantCard className="mb-8">
            <GetGrantCardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo */}
                <div className="w-24 h-24 bg-[#1A1A1A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-bold text-white">{university.logo}</span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                        {university.name}
                      </h1>
                      <div className="flex items-center gap-4 text-[#6D7A89]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{university.city}, {university.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span>{university.website}</span>
                        </div>
                      </div>
                    </div>
                    <GetGrantBadge variant="yellow">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      #{university.ranking} в мире
                    </GetGrantBadge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className="text-2xl font-bold text-[#1A1A1A]">
                        {university.students.toLocaleString()}
                      </div>
                      <div className="text-sm text-[#6D7A89]">Студентов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#1A1A1A]">
                        {university.acceptance}
                      </div>
                      <div className="text-sm text-[#6D7A89]">Процент поступления</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#1A1A1A]">120+</div>
                      <div className="text-sm text-[#6D7A89]">Программ</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-[#1A1A1A]/10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <GetGrantButton variant="primary" size="lg" className="flex-1">
                    Подать заявку
                  </GetGrantButton>
                  <GetGrantButton variant="outline" size="lg" className="flex-1">
                    Получить консультацию
                  </GetGrantButton>
                </div>
              </div>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>

        {/* Tabs Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GetGrantCard>
            <div className="p-6">
              <GetGrantTabs tabs={tabs} />
            </div>
          </GetGrantCard>
        </motion.div>

        {/* Related Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Связанные программы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedPrograms.map((program, index) => (
              <GetGrantCard key={index} hoverable>
                <GetGrantCardContent>
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-[#1055b2] mt-1" />
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-1">{program.name}</h3>
                      <p className="text-sm text-[#6D7A89]">{program.level}</p>
                      <p className="text-xs text-[#6D7A89] mt-1">{program.duration}</p>
                    </div>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}