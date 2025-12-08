import React from 'react';
import { GetGrantCard, GetGrantCardHeader, GetGrantCardContent, GetGrantCardFooter } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface PopularProgramsSectionProps {
  onNavigate?: (page: string) => void;
  onCloseSideNav?: () => void;
}

export function PopularProgramsSection({ onNavigate, onCloseSideNav }: PopularProgramsSectionProps) {
  const programs = [
    {
      id: 1,
      title: 'Бизнес и Менеджмент',
      university: 'Harvard Business School',
      country: '🇺🇸 США',
      duration: '4 года',
      students: '120+ студентов',
      image: 'https://images.unsplash.com/photo-1665979738279-bd2441290e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0dWRpZXMlMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc2NDA1ODM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true
    },
    {
      id: 2,
      title: 'Computer Science',
      university: 'MIT',
      country: '🇺🇸 США',
      duration: '4 года',
      students: '85+ студентов',
      image: 'https://images.unsplash.com/photo-1611648694931-1aeda329f9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzk1MjAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true
    },
    {
      id: 3,
      title: 'Медицина',
      university: 'Oxford University',
      country: '🇬🇧 Великобритания',
      duration: '6 лет',
      students: '45+ студентов',
      image: 'https://images.unsplash.com/photo-1712782390367-6d9a2843d893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2Nob29sJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjQwNTgzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      popular: false
    },
    {
      id: 4,
      title: 'Искусство и Дизайн',
      university: 'Central Saint Martins',
      country: '🇬🇧 Великобритания',
      duration: '3 года',
      students: '60+ студентов',
      image: 'https://images.unsplash.com/photo-1682616323080-b98015597e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkZXNpZ24lMjBzdHVkZW50fGVufDF8fHx8MTc2NDA1ODM2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: false
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2"
            >
              Популярные программы
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#6D7A89]"
            >
              Выбирайте из топовых образовательных программ мира
            </motion.p>
          </div>
          <GetGrantButton variant="outline">Все программы</GetGrantButton>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GetGrantCard hoverable className="h-full">
                <GetGrantCardHeader className="relative p-0 mb-4">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    {program.popular && (
                      <div className="absolute top-3 right-3">
                        <GetGrantBadge variant="yellow">Популярно</GetGrantBadge>
                      </div>
                    )}
                  </div>
                </GetGrantCardHeader>
                
                <GetGrantCardContent>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    {program.title}
                  </h3>
                  <p className="text-sm text-[#6D7A89] mb-1">{program.university}</p>
                  <p className="text-sm text-[#6D7A89] mb-4">{program.country}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-[#6D7A89]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{program.students}</span>
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
                    Подробнее
                  </GetGrantButton>
                </GetGrantCardFooter>
              </GetGrantCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
