import React, { useState } from 'react';
import { GetGrantCard, GetGrantCardContent, GetGrantCardFooter } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Filter, X, Search, Grid, List, ChevronDown, MapPin, DollarSign, 
  GraduationCap, Star, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UniversityCatalogPageProps {
  onNavigate?: (page: string) => void;
  onCloseSideNav?: () => void;
  onSelectUniversity?: (id: number) => void;
}

export function UniversityCatalogPage({ onNavigate, onCloseSideNav, onSelectUniversity }: UniversityCatalogPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const universities = [
    {
      id: 1,
      name: 'Harvard University',
      country: 'США',
      city: 'Cambridge, MA',
      image: 'https://images.unsplash.com/photo-1542843895-1b55d9f8ece8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2YXJkJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NjQwNTY2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ranking: 1,
      tuition: '$54,000',
      programs: 120,
      acceptance: '4.5%',
      type: 'Частный',
      featured: true
    },
    {
      id: 2,
      name: 'Oxford University',
      country: 'Великобритания',
      city: 'Oxford',
      image: 'https://images.unsplash.com/photo-1702238230256-f798027de7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxveGZvcmQlMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0MDU4NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ranking: 2,
      tuition: '£35,000',
      programs: 95,
      acceptance: '17.5%',
      type: 'Государственный',
      featured: true
    },
    {
      id: 3,
      name: 'Stanford University',
      country: 'США',
      city: 'Stanford, CA',
      image: 'https://images.unsplash.com/photo-1762410281840-686c2d40cd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFuZm9yZCUyMGNhbXB1cyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjQwNTg2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ranking: 3,
      tuition: '$56,000',
      programs: 110,
      acceptance: '3.9%',
      type: 'Частный',
      featured: false
    },
    {
      id: 4,
      name: 'Cambridge University',
      country: 'Великобритания',
      city: 'Cambridge',
      image: 'https://images.unsplash.com/photo-1702238230256-f798027de7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxveGZvcmQlMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0MDU4NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ranking: 4,
      tuition: '£34,000',
      programs: 88,
      acceptance: '21%',
      type: 'Государственный',
      featured: false
    },
    {
      id: 5,
      name: 'MIT',
      country: 'США',
      city: 'Cambridge, MA',
      image: 'https://images.unsplash.com/photo-1542843895-1b55d9f8ece8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2YXJkJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NjQwNTY2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ranking: 5,
      tuition: '$55,000',
      programs: 75,
      acceptance: '6.7%',
      type: 'Частный',
      featured: true
    },
    {
      id: 6,
      name: 'Yale University',
      country: 'США',
      city: 'New Haven, CT',
      image: 'https://images.unsplash.com/photo-1542843895-1b55d9f8ece8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2YXJkJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NjQwNTY2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ranking: 6,
      tuition: '$57,000',
      programs: 105,
      acceptance: '5.3%',
      type: 'Частный',
      featured: false
    }
  ];

  const countries = ['США', 'Великобритания', 'Канада', 'Германия', 'Австралия'];
  const types = ['Частный', 'Государственный'];

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Поиск
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D7A89]" />
          <input
            type="text"
            placeholder="Название университета..."
            className="w-full pl-10 pr-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]"
          />
        </div>
      </div>

      {/* Country Filter */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Страна
        </label>
        <div className="space-y-2">
          {countries.map((country) => (
            <label key={country} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCountries.includes(country)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCountries([...selectedCountries, country]);
                  } else {
                    setSelectedCountries(selectedCountries.filter(c => c !== country));
                  }
                }}
                className="w-4 h-4 border-[#1A1A1A]/20 rounded focus:ring-[#1055b2]"
              />
              <span className="text-sm text-[#1A1A1A]">{country}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Тип университета
        </label>
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTypes([...selectedTypes, type]);
                  } else {
                    setSelectedTypes(selectedTypes.filter(t => t !== type));
                  }
                }}
                className="w-4 h-4 border-[#1A1A1A]/20 rounded focus:ring-[#1055b2]"
              />
              <span className="text-sm text-[#1A1A1A]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Стоимость обучения (в год)
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100000"
            step="5000"
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[#6D7A89]">
            <span>$0</span>
            <span>$100,000+</span>
          </div>
        </div>
      </div>

      {/* Reset */}
      <GetGrantButton variant="outline" size="sm" className="w-full">
        Сбросить фильтры
      </GetGrantButton>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            Каталог университетов
          </h1>
          <p className="text-[#6D7A89]">
            Найдено {universities.length} университетов
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
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Button */}
              <GetGrantButton
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Фильтры
              </GetGrantButton>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6D7A89] hidden md:block">Сортировка:</span>
                <select className="px-4 py-2 bg-white border border-[#1A1A1A]/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1055b2]">
                  <option>По рейтингу</option>
                  <option>По стоимости</option>
                  <option>По названию</option>
                  <option>По проценту поступления</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-2 bg-white rounded-lg p-1 border border-[#1A1A1A]/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-[#1055b2]' : 'hover:bg-[#F5F5F5]'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-[#1055b2]' : 'hover:bg-[#F5F5F5]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* University Grid/List */}
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                : 'space-y-6'
            }>
              {universities.map((university, index) => (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GetGrantCard hoverable className="h-full">
                    <GetGrantCardContent className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-xl">
                        <ImageWithFallback
                          src={university.image}
                          alt={university.name}
                          className="w-full h-full object-cover"
                        />
                        {university.featured && (
                          <div className="absolute top-3 right-3">
                            <GetGrantBadge variant="yellow">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Топ
                            </GetGrantBadge>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <GetGrantBadge variant="default">
                            #{university.ranking} в мире
                          </GetGrantBadge>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                          {university.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-[#6D7A89] mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{university.city}, {university.country}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-[#6D7A89] mb-1">Стоимость</div>
                            <div className="font-semibold text-[#1A1A1A]">{university.tuition}/год</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6D7A89] mb-1">Программы</div>
                            <div className="font-semibold text-[#1A1A1A]">{university.programs}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6D7A89] mb-1">Процент поступления</div>
                            <div className="font-semibold text-[#1A1A1A]">{university.acceptance}</div>
                          </div>
                          <div>
                            <div className="text-xs text-[#6D7A89] mb-1">Тип</div>
                            <div className="font-semibold text-[#1A1A1A]">{university.type}</div>
                          </div>
                        </div>
                      </div>
                    </GetGrantCardContent>

                    <GetGrantCardFooter>
                      <GetGrantButton
                        variant="ghost"
                        size="sm"
                        className="w-full group"
                        onClick={() => {
                          if (onSelectUniversity) {
                            onSelectUniversity(university.id);
                          } else {
                            onNavigate?.('university-detail');
                          }
                          onCloseSideNav?.();
                        }}
                      >
                        Подробнее
                      </GetGrantButton>
                    </GetGrantCardFooter>
                  </GetGrantCard>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <GetGrantButton variant="outline" size="lg">
                Загрузить ещё
              </GetGrantButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
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
