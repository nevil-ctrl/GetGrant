import React from 'react';
import { GetGrantCard, GetGrantCardContent } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { Check, MapPin, Users, DollarSign, Home, Briefcase, GraduationCap, Clock, FileText, Heart } from 'lucide-react';
import { motion } from 'motion/react';

type CountryDetail = {
  id: number;
  name: string;
  fullName?: string;
  flag?: string;
  capital?: string;
  language?: string;
  currency?: string;
  population?: string;
  timezone?: string;
  universities?: number;
  students?: number;
  avgCost?: string;
  topUniversities?: { name: string; ranking?: number; city?: string; tuition?: string }[];
  popularCities?: { name: string; description?: string; universities?: number; cost?: string }[];
  benefits?: string[];
  visaInfo?: { title: string; description: string }[];
};

interface CountryDetailPageProps {
  country: CountryDetail | null;
}

export function CountryDetailPage({ country }: CountryDetailPageProps) {
  if (!country) return <p className="text-center mt-16">Страна не выбрана</p>;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-custom flex items-center gap-6">
          <div className="text-8xl">{country.flag ?? '🏳️'}</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{country.fullName ?? country.name}</h1>
            <div className="flex flex-wrap gap-4 text-[#6D7A89]">
              {country.capital && <span>Столица: {country.capital}</span>}
              {country.language && <span>Язык: {country.language}</span>}
              {country.currency && <span>Валюта: {country.currency}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 space-y-12">
        {/* Quick Stats */}
        <GetGrantCard>
          <GetGrantCardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold text-[#1A1A1A]">{country.universities ?? '-'}</div>
                <div className="text-xs text-[#6D7A89]">ВУЗов</div>
              </div>
              <div>
                <div className="font-bold text-[#1A1A1A]">{country.students ?? '-'}+</div>
                <div className="text-xs text-[#6D7A89]">Студентов</div>
              </div>
              <div>
                <div className="font-bold text-[#1A1A1A]">{country.avgCost ?? '-'}</div>
                <div className="text-xs text-[#6D7A89]">В год</div>
              </div>
            </div>
          </GetGrantCardContent>
        </GetGrantCard>

        {/* Top Universities */}
        {country.topUniversities?.length ? (
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Топ университеты</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.topUniversities.map((uni, idx) => (
                <GetGrantCard key={idx} hoverable>
                  <GetGrantCardContent>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#1A1A1A]">{uni.name}</h3>
                      {uni.ranking && <GetGrantBadge variant="yellow">#{uni.ranking}</GetGrantBadge>}
                    </div>
                    {uni.city && <p className="text-sm text-[#6D7A89]">{uni.city}</p>}
                    {uni.tuition && (
                      <p className="text-sm text-[#1A1A1A]">
                        Стоимость: <span className="font-semibold">{uni.tuition}/год</span>
                      </p>
                    )}
                  </GetGrantCardContent>
                </GetGrantCard>
              ))}
            </div>
          </div>
        ) : null}

        {/* Benefits */}
        {country.benefits?.length ? (
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Преимущества</h2>
            <div className="space-y-2">
              {country.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1055b2] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#1A1A1A]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Popular Cities */}
        {country.popularCities?.length ? (
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Популярные города</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {country.popularCities.map((city, idx) => (
                <GetGrantCard key={idx} hoverable>
                  <GetGrantCardContent>
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">{city.name}</h3>
                    {city.description && <p className="text-sm text-[#6D7A89] mb-2">{city.description}</p>}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6D7A89]">{city.universities ?? '-'} университетов</span>
                      <GetGrantBadge variant="outline">{city.cost ?? '-'}</GetGrantBadge>
                    </div>
                  </GetGrantCardContent>
                </GetGrantCard>
              ))}
            </div>
          </div>
        ) : null}

        {/* Visa Info */}
        {country.visaInfo?.length ? (
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Визовая информация</h2>
            <div className="space-y-4">
              {country.visaInfo.map((visa, idx) => (
                <GetGrantCard key={idx}>
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
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-12 text-center">
          <GetGrantButton variant="primary" size="lg">
            Получить консультацию
          </GetGrantButton>
        </div>
      </div>
    </div>
  );
}
