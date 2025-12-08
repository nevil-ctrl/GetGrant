import React, { useState } from 'react';
import { GetGrantCard, GetGrantCardContent, GetGrantCardFooter } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Filter, X, Search, BookOpen, Clock, DollarSign, TrendingUp, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgramCatalogPageProps {
  onNavigate?: (page: string) => void;
  onCloseSideNav?: () => void;
}

export function ProgramCatalogPage({ onNavigate, onCloseSideNav }: ProgramCatalogPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedField, setSelectedField] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);

  const programs = [
    {
      id: 1,
      name: 'Computer Science',
      field: 'Технологии',
      level: 'Bachelor',
      duration: '4 года',
      avgSalary: '$85,000',
      universities: 150,
      image: 'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzk1MjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true,
      careers: ['Software Engineer', 'Data Scientist', 'AI Specialist']
    },
    {
      id: 2,
      name: 'Business Administration',
      field: 'Бизнес',
      level: 'Bachelor',
      duration: '4 года',
      avgSalary: '$65,000',
      universities: 200,
      image: 'https://images.unsplash.com/photo-1665979738279-bd2441290e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0dWRpZXMlMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc2NDA1ODM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true,
      careers: ['Business Analyst', 'Manager', 'Entrepreneur']
    },
    {
      id: 3,
      name: 'Medicine',
      field: 'Медицина',
      level: 'Pre-Med',
      duration: '4 года',
      avgSalary: '$200,000',
      universities: 80,
      image: 'https://images.unsplash.com/photo-1712782390367-6d9a2843d893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2Nob29sJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjQwNTgzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      popular: false,
      careers: ['Doctor', 'Surgeon', 'Medical Researcher']
    },
    {
      id: 4,
      name: 'Engineering',
      field: 'Инженерия',
      level: 'Bachelor',
      duration: '4 года',
      avgSalary: '$75,000',
      universities: 180,
      image: 'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzk1MjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true,
      careers: ['Mechanical Engineer', 'Civil Engineer', 'Electrical Engineer']
    },
    {
      id: 5,
      name: 'Arts & Design',
      field: 'Искусство',
      level: 'Bachelor',
      duration: '3-4 года',
      avgSalary: '$50,000',
      universities: 120,
      image: 'https://images.unsplash.com/photo-1682616323080-b98015597e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkZXNpZ24lMjBzdHVkZW50fGVufDF8fHx8MTc2NDA1ODM2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: false,
      careers: ['Graphic Designer', 'Art Director', 'UX Designer']
    },
    {
      id: 6,
      name: 'Data Science',
      field: 'Технологии',
      level: 'Master',
      duration: '2 года',
      avgSalary: '$95,000',
      universities: 100,
      image: 'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzk1MjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true,
      careers: ['Data Scientist', 'ML Engineer', 'Analytics Manager']
    }
  ];

  const fields = ['Технологии', 'Бизнес', 'Медицина', 'Инженерия', 'Искусство', 'Науки'];
  const levels = ['Bachelor', 'Master', 'PhD', 'Pre-Med'];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Поиск
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D7A89]" />
          <input
            type="text"
            placeholder="Название программы..."
            className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Направление
        </label>
        <div className="space-y-2">
          {fields.map((field) => (
            <label key={field} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedField.includes(field)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedField([...selectedField, field]);
                  } else {
                    setSelectedField(selectedField.filter(f => f !== field));
                  }
                }}
                className="w-4 h-4 border-[#1A1A1A]/20 rounded focus:ring-[#1055b2]"
              />
              <span className="text-sm text-[#1A1A1A]">{field}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Уровень
        </label>
        <div className="space-y-2">
          {levels.map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLevel.includes(level)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedLevel([...selectedLevel, level]);
                  } else {
                    setSelectedLevel(selectedLevel.filter(l => l !== level));
                  }
                }}
                className="w-4 h-4 border-[#1A1A1A]/20 rounded focus:ring-[#1055b2]"
              />
              <span className="text-sm text-[#1A1A1A]">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <GetGrantButton variant="outline" size="sm" className="w-full">
        Сбросить фильтры
      </GetGrantButton>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            Каталог программ
          </h1>
          <p className="text-[#6D7A89]">
            Найдено {programs.length} программ обучения
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <GetGrantCard>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[#1A1A1A]">Фильтры</h2>
                    <Filter className="w-5 h-5 text-[#6D7A89]" />
                  </div>
                  <FilterSidebar />
                </div>
              </GetGrantCard>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <GetGrantButton
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Фильтры
              </GetGrantButton>

              <select className="px-4 py-2 bg-white border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1055b2] ml-auto">
                <option>По популярности</option>
                <option>По зарплате</option>
                <option>По длительности</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GetGrantCard hoverable className="h-full">
                    <GetGrantCardContent className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-xl">
                        <ImageWithFallback
                          src={program.image}
                          alt={program.name}
                          className="w-full h-full object-cover"
                        />
                        {program.popular && (
                          <div className="absolute top-3 right-3">
                            <GetGrantBadge variant="yellow">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Популярно
                            </GetGrantBadge>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <GetGrantBadge variant="default">{program.field}</GetGrantBadge>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold text-[#1A1A1A]">{program.name}</h3>
                          <GetGrantBadge variant="outline">{program.level}</GetGrantBadge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-[#6D7A89]" />
                            <span className="text-[#6D7A89]">{program.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="w-4 h-4 text-[#6D7A89]" />
                            <span className="text-[#6D7A89]">{program.universities} ВУЗов</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4 p-3 bg-[#1055b2]/10 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-[#1A1A1A]" />
                          <div>
                            <div className="text-xs text-[#6D7A89]">Средняя зарплата</div>
                            <div className="font-semibold text-[#1A1A1A]">{program.avgSalary}/год</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-[#6D7A89] mb-2">Карьерные пути:</div>
                          <div className="flex flex-wrap gap-2">
                            {program.careers.slice(0, 2).map((career) => (
                              <span key={career} className="text-xs px-2 py-1 bg-[#F5F5F5] rounded">
                                {career}
                              </span>
                            ))}
                            {program.careers.length > 2 && (
                              <span className="text-xs px-2 py-1 bg-[#F5F5F5] rounded">
                                +{program.careers.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </GetGrantCardContent>

                    <GetGrantCardFooter>
                        <GetGrantButton
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            onNavigate?.('program-detail');
                            onCloseSideNav?.();
                          }}
                        >
                          Подробнее о программе
                        </GetGrantButton>
                    </GetGrantCardFooter>
                  </GetGrantCard>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <GetGrantButton variant="outline" size="lg">
                Загрузить ещё
              </GetGrantButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Фильтры</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar />
                <GetGrantButton
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                  onClick={() => setShowFilters(false)}
                >
                  Применить
                </GetGrantButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
