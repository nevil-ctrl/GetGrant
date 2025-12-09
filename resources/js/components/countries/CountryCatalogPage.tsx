import React, { useEffect, useState } from 'react';
import { GetGrantCard, GetGrantCardContent } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { Check, TrendingUp, DollarSign, Home, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

type Country = {
  id: number;
  name: string;
  fullName?: string;
  flag?: string;
  universities?: number;
  students?: number;
  avgCost?: string;
  topUniversities?: string[];
  benefits?: string[];
};

interface CountryCatalogPageProps {
  onNavigate?: (page: string) => void;
  onCloseSideNav?: () => void;
}

export function CountryCatalogPage({ onNavigate, onCloseSideNav }: CountryCatalogPageProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/countries', { credentials: 'include' });
        if (!res.ok) throw new Error('Не удалось загрузить страны');
        const json = await res.json();
        const normalized: Country[] = (Array.isArray(json) ? json : json.data || []).map((c: any) => ({
          id: c.id,
          name: c.name,
          fullName: c.full_name || c.name,
          flag: c.flag,
          universities: c.universities_count,
          students: c.students_count,
          avgCost: c.avg_cost,
          topUniversities: c.top_universities || [],
          benefits: c.selling_points || [],
        }));
        setCountries(normalized);
      } catch (e: any) {
        setError(e.message || 'Ошибка загрузки данных');
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
            {loading ? 'Загрузка стран...' : 'Исследуйте образовательные возможности в ведущих странах мира'}
            {error && <span className="text-red-500 block mt-2">{error}</span>}
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
