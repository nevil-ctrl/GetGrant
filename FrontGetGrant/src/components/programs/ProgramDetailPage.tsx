import React from 'react';
import { GetGrantCard, GetGrantCardContent } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Clock, DollarSign, TrendingUp, BookOpen, Briefcase, 
  Check, Users, GraduationCap, Target 
} from 'lucide-react';
import { motion } from 'motion/react';

export function ProgramDetailPage() {
  const program = {
    name: 'Computer Science',
    field: 'Технологии',
    level: 'Bachelor of Science (BS)',
    duration: '4 года',
    avgSalary: '$85,000',
    image: 'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzk1MjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Computer Science — это изучение вычислительных систем, программирования, алгоритмов и их применения для решения реальных проблем. Программа готовит специалистов для работы в технологических компаниях, стартапах и исследовательских центрах.'
  };

  const careers = [
    {
      title: 'Software Engineer',
      salary: '$110,000',
      demand: 'Очень высокий',
      description: 'Разработка программного обеспечения и приложений'
    },
    {
      title: 'Data Scientist',
      salary: '$120,000',
      demand: 'Очень высокий',
      description: 'Анализ данных и создание ML моделей'
    },
    {
      title: 'AI/ML Engineer',
      salary: '$130,000',
      demand: 'Высокий',
      description: 'Разработка систем искусственного интеллекта'
    },
    {
      title: 'Full Stack Developer',
      salary: '$100,000',
      demand: 'Очень высокий',
      description: 'Разработка фронтенд и бэкенд компонентов'
    },
    {
      title: 'DevOps Engineer',
      salary: '$115,000',
      demand: 'Высокий',
      description: 'Автоматизация и развертывание приложений'
    },
    {
      title: 'Cybersecurity Specialist',
      salary: '$105,000',
      demand: 'Высокий',
      description: 'Защита систем и данных от киберугроз'
    }
  ];

  const skills = [
    'Программирование (Python, Java, C++)',
    'Алгоритмы и структуры данных',
    'Базы данных и SQL',
    'Веб-разработка',
    'Машинное обучение',
    'Системы управления версиями (Git)',
    'Облачные технологии',
    'Математика и статистика'
  ];

  const coursework = [
    { year: 1, courses: ['Основы программирования', 'Дискретная математика', 'Линейная алгебра', 'Введение в CS'] },
    { year: 2, courses: ['Структуры данных', 'Алгоритмы', 'Компьютерная архитектура', 'Базы данных'] },
    { year: 3, courses: ['Операционные системы', 'Компьютерные сети', 'Искусственный интеллект', 'Web-разработка'] },
    { year: 4, courses: ['Машинное обучение', 'Распределенные системы', 'Капстоун проект', 'Элективы'] }
  ];

  const requirements = {
    academic: ['GPA минимум 3.5', 'Сильная математическая подготовка', 'SAT Math: 700+'],
    recommended: ['AP Computer Science', 'AP Calculus', 'Проекты по программированию', 'Участие в хакатонах']
  };

  const topUniversities = [
    { name: 'MIT', ranking: 1, acceptance: '6.7%', tuition: '$55,000' },
    { name: 'Stanford', ranking: 2, acceptance: '3.9%', tuition: '$56,000' },
    { name: 'Carnegie Mellon', ranking: 3, acceptance: '15%', tuition: '$58,000' },
    { name: 'UC Berkeley', ranking: 4, acceptance: '14%', tuition: '$45,000' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="container-custom -mt-32 relative z-10 pb-16">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GetGrantCard className="mb-8">
            <GetGrantCardContent className="p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <GetGrantBadge variant="yellow">{program.field}</GetGrantBadge>
                <GetGrantBadge variant="outline">{program.level}</GetGrantBadge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
                {program.name}
              </h1>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#60A5FA] rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#6D7A89]">Длительность</div>
                    <div className="font-semibold text-[#1A1A1A]">{program.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#60A5FA] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#6D7A89]">Средняя зарплата</div>
                    <div className="font-semibold text-[#1A1A1A]">{program.avgSalary}/год</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#60A5FA] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#6D7A89]">Спрос</div>
                    <div className="font-semibold text-[#1A1A1A]">Очень высокий</div>
                  </div>
                </div>
              </div>

              <p className="text-[#6D7A89] leading-relaxed mb-6">
                {program.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <GetGrantButton variant="primary" size="lg" className="flex-1">
                  Подобрать университет
                </GetGrantButton>
                <GetGrantButton variant="outline" size="lg" className="flex-1">
                  Получить консультацию
                </GetGrantButton>
              </div>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>

        {/* Career Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Карьерные пути</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career, index) => (
              <GetGrantCard key={index}>
                <GetGrantCardContent>
                  <div className="flex items-start gap-3 mb-3">
                    <Briefcase className="w-5 h-5 text-[#60A5FA] mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1A1A1A] mb-1">{career.title}</h3>
                      <p className="text-sm text-[#6D7A89] mb-2">{career.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A]/10">
                    <div>
                      <div className="text-xs text-[#6D7A89]">Зарплата</div>
                      <div className="font-semibold text-[#1A1A1A]">{career.salary}</div>
                    </div>
                    <GetGrantBadge variant="success">{career.demand}</GetGrantBadge>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Навыки, которые вы получите</h2>
          <GetGrantCard>
            <GetGrantCardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1A1A1A]">{skill}</span>
                  </div>
                ))}
              </div>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>

        {/* Coursework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Программа обучения</h2>
          <div className="space-y-4">
            {coursework.map((year) => (
              <GetGrantCard key={year.year}>
                <GetGrantCardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#60A5FA] rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#1A1A1A]">{year.year}</div>
                        <div className="text-xs text-[#1A1A1A]">год</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid md:grid-cols-2 gap-2">
                        {year.courses.map((course, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#6D7A89]" />
                            <span className="text-sm text-[#1A1A1A]">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Подходит ли мне эта программа?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GetGrantCard>
              <GetGrantCardContent>
                <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#60A5FA]" />
                  Минимальные требования
                </h3>
                <ul className="space-y-2">
                  {requirements.academic.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1A1A1A]">{req}</span>
                    </li>
                  ))}
                </ul>
              </GetGrantCardContent>
            </GetGrantCard>

            <GetGrantCard>
              <GetGrantCardContent>
                <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#60A5FA]" />
                  Рекомендуется
                </h3>
                <ul className="space-y-2">
                  {requirements.recommended.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1A1A1A]">{req}</span>
                    </li>
                  ))}
                </ul>
              </GetGrantCardContent>
            </GetGrantCard>
          </div>
        </motion.div>

        {/* Top Universities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Топ университеты</h2>
            <GetGrantButton variant="outline" size="sm">
              Смотреть все
            </GetGrantButton>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topUniversities.map((uni, index) => (
              <GetGrantCard key={index} hoverable>
                <GetGrantCardContent>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[#1A1A1A]">{uni.name}</h3>
                    <GetGrantBadge variant="yellow">#{uni.ranking}</GetGrantBadge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#6D7A89]">Поступление</span>
                      <span className="font-medium">{uni.acceptance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6D7A89]">Стоимость</span>
                      <span className="font-medium">{uni.tuition}/год</span>
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
          <GetGrantCard className="bg-gradient-to-br from-[#60A5FA]/20 to-white text-center">
            <GetGrantCardContent className="p-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
                Заинтересовались программой?
              </h2>
              <p className="text-[#6D7A89] mb-6 max-w-2xl mx-auto">
                Наши эксперты помогут выбрать университет, подготовить документы и успешно поступить
              </p>
              <GetGrantButton variant="primary" size="lg">
                Начать подготовку
              </GetGrantButton>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>
      </div>
    </div>
  );
}
