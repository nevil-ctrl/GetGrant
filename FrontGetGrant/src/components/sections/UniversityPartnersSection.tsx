import React from 'react';
import { motion } from 'motion/react';

interface UniversityPartnersSectionProps {
  onNavigate?: (page: string) => void;
  onCloseSideNav?: () => void;
}

export function UniversityPartnersSection({ onNavigate, onCloseSideNav }: UniversityPartnersSectionProps) {
  const partners = [
    { name: 'Harvard', abbr: 'H' },
    { name: 'MIT', abbr: 'MIT' },
    { name: 'Stanford', abbr: 'S' },
    { name: 'Oxford', abbr: 'OX' },
    { name: 'Cambridge', abbr: 'CB' },
    { name: 'Yale', abbr: 'Y' },
    { name: 'Princeton', abbr: 'P' },
    { name: 'Columbia', abbr: 'C' },
    { name: 'UCL', abbr: 'UCL' },
    { name: 'Imperial', abbr: 'IC' },
    { name: 'ETH Zurich', abbr: 'ETH' },
    { name: 'Toronto', abbr: 'UT' }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#1A1A1A]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Университеты-партнёры
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#6D7A89]"
          >
            Мы работаем с ведущими университетами мира
          </motion.p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="aspect-square bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/10"
              onClick={() => { onNavigate?.('university-detail'); onCloseSideNav?.(); }}
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#1055b2] transition-colors">
                  {partner.abbr}
                </div>
                <div className="text-xs text-[#6D7A89] mt-1">{partner.name}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1055b2] mb-2">50+</div>
              <div className="text-sm text-[#6D7A89]">Университетов-партнёров</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1055b2] mb-2">15+</div>
              <div className="text-sm text-[#6D7A89]">Стран для обучения</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1055b2] mb-2">500+</div>
              <div className="text-sm text-[#6D7A89]">Поступивших студентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#1055b2] mb-2">95%</div>
              <div className="text-sm text-[#6D7A89]">Уровень успеха</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
