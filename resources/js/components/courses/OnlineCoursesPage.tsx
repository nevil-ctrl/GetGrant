import React, { useState } from 'react';
import { GetGrantCard, GetGrantCardContent, GetGrantCardFooter } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { GetGrantModal } from '../GetGrantModal';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Video, Calendar, Clock, Users, Star, BookOpen, 
  CheckCircle, Award, MessageCircle, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { motion } from 'motion/react';

export function OnlineCoursesPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [currentWeek, setCurrentWeek] = useState(0);

  const teachers = [
    {
      id: 1,
      name: 'Elena Smith',
      specialization: 'TOEFL & IELTS',
      experience: '8 лет',
      students: 200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551989745-347c28b620e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwcHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MXx8fHwxNzY0MDU4OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      languages: ['Английский', 'Русский'],
      price: '$50/час',
      credentials: ['Cambridge CELTA', 'IELTS 8.5']
    },
    {
      id: 2,
      name: 'Michael Johnson',
      specialization: 'SAT & ACT',
      experience: '10 лет',
      students: 300,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwcHJvZmVzc2lvbmFsJTIwbWFufGVufDF8fHx8MTc2NDA1ODk2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      languages: ['Английский'],
      price: '$60/час',
      credentials: ['SAT Perfect Score', 'Stanford Alumni']
    },
    {
      id: 3,
      name: 'Sarah Williams',
      specialization: 'Essay Writing & Personal Statement',
      experience: '12 лет',
      students: 250,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551989745-347c28b620e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwcHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MXx8fHwxNzY0MDU4OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      languages: ['Английский', 'Французский'],
      price: '$55/час',
      credentials: ['PhD English Literature', 'Harvard Admissions Expert']
    },
    {
      id: 4,
      name: 'David Chen',
      specialization: 'Math & Sciences',
      experience: '7 лет',
      students: 180,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwcHJvZmVzc2lvbmFsJTIwbWFufGVufDF8fHx8MTc2NDA1ODk2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      languages: ['Английский', 'Китайский'],
      price: '$45/час',
      credentials: ['MIT Graduate', 'AP Calculus Expert']
    }
  ];

  const courses = [
    {
      title: 'TOEFL Preparation',
      description: 'Комплексная подготовка к экзамену TOEFL',
      duration: '12 недель',
      lessons: 24,
      price: '$600',
      students: 45,
      rating: 4.8
    },
    {
      title: 'SAT Math & English',
      description: 'Подготовка к SAT Mathematics и Evidence-Based Reading',
      duration: '10 недель',
      lessons: 20,
      price: '$700',
      students: 60,
      rating: 4.9
    },
    {
      title: 'Personal Statement Workshop',
      description: 'Написание эффективного эссе для поступления',
      duration: '6 недель',
      lessons: 12,
      price: '$400',
      students: 30,
      rating: 5.0
    },
    {
      title: 'IELTS Academic',
      description: 'Подготовка к IELTS для академических целей',
      duration: '12 недель',
      lessons: 24,
      price: '$580',
      students: 50,
      rating: 4.7
    }
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const timeSlots = [
    '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleBookLesson = (teacher: any) => {
    setSelectedTeacher(teacher);
    setShowBookingModal(true);
  };

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
            Онлайн-подготовка
          </h1>
          <p className="text-lg text-[#6D7A89] max-w-2xl mx-auto">
            Занятия с профессиональными преподавателями для успешного поступления
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">Популярные курсы</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <GetGrantCard key={index} hoverable>
                <GetGrantCardContent>
                  <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-2">{course.title}</h3>
                  <p className="text-sm text-[#6D7A89] mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6D7A89]">Длительность</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6D7A89]">Занятий</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6D7A89]">Студентов</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]/10">
                    <div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#1055b2] text-[#1055b2]" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-[#1A1A1A]">{course.price}</div>
                  </div>
                </GetGrantCardContent>
                <GetGrantCardFooter>
                  <GetGrantButton variant="primary" size="sm" className="w-full">
                    Записаться
                  </GetGrantButton>
                </GetGrantCardFooter>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* Teachers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">Наши преподаватели</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, index) => (
              <GetGrantCard key={teacher.id} hoverable>
                <GetGrantCardContent className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">{teacher.name}</h3>
                  <p className="text-sm text-[#6D7A89] mb-3">{teacher.specialization}</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#1055b2] text-[#1055b2]" />
                      <span className="font-semibold">{teacher.rating}</span>
                    </div>
                    <span className="text-[#6D7A89]">•</span>
                    <span className="text-sm text-[#6D7A89]">{teacher.students} студентов</span>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6D7A89]" />
                      <span className="text-[#6D7A89]">Опыт: {teacher.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#6D7A89]" />
                      <span className="text-[#6D7A89]">{teacher.credentials[0]}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {teacher.languages.map((lang) => (
                      <GetGrantBadge key={lang} variant="outline">{lang}</GetGrantBadge>
                    ))}
                  </div>

                  <div className="text-xl font-bold text-[#1A1A1A] mb-4">{teacher.price}</div>
                </GetGrantCardContent>

                <GetGrantCardFooter>
                  <div className="grid grid-cols-2 gap-2">
                    <GetGrantButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBookLesson(teacher)}
                    >
                      Записаться
                    </GetGrantButton>
                    <GetGrantButton variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </GetGrantButton>
                  </div>
                </GetGrantCardFooter>
              </GetGrantCard>
            ))}
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8">Расписание на неделю</h2>
          <GetGrantCard>
            <GetGrantCardContent>
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#1A1A1A]">
                  25 ноября - 1 декабря 2024
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentWeek(currentWeek - 1)}
                    className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentWeek(currentWeek + 1)}
                    className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Days Header */}
                  <div className="grid grid-cols-8 gap-2 mb-2">
                    <div className="p-2"></div>
                    {weekDays.map((day, index) => (
                      <div key={day} className="p-2 text-center font-semibold">
                        <div className="text-[#6D7A89] text-xs mb-1">{day}</div>
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                            index === 2 ? 'bg-[#1055b2] text-white' : 'text-[#1A1A1A]'
                          }`}>
                          {25 + index}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-8 gap-2">
                        <div className="p-2 text-sm text-[#6D7A89]">{time}</div>
                        {weekDays.map((_, dayIndex) => {
                          const hasClass = Math.random() > 0.7;
                          return (
                            <div key={dayIndex} className="p-1">
                              {hasClass ? (
                                <div className="bg-[#1055b2]/20 border border-[#1055b2] rounded p-2 cursor-pointer hover:bg-[#1055b2]/30 transition-colors">
                                  <div className="text-xs font-medium text-[#1A1A1A] truncate">
                                    TOEFL Speaking
                                  </div>
                                  <div className="text-xs text-[#6D7A89] truncate">
                                    Elena S.
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full border border-[#1A1A1A]/5 rounded hover:border-[#1055b2] transition-colors cursor-pointer" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#1A1A1A]/10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1055b2]/20 border border-[#1055b2] rounded"></div>
                  <span className="text-sm text-[#6D7A89]">Занято</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-[#1A1A1A]/20 rounded"></div>
                  <span className="text-sm text-[#6D7A89]">Доступно</span>
                </div>
              </div>
            </GetGrantCardContent>
          </GetGrantCard>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <GetGrantModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Записаться на занятие"
        size="lg"
      >
        {selectedTeacher && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={selectedTeacher.image}
                  alt={selectedTeacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A]">{selectedTeacher.name}</h3>
                <p className="text-sm text-[#6D7A89]">{selectedTeacher.specialization}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Выберите дату и время
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Тип занятия
              </label>
              <select className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]">
                <option>Индивидуальное занятие</option>
                <option>Групповое занятие (2-4 человека)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Комментарий (опционально)
              </label>
              <textarea
                rows={3}
                placeholder="Укажите тему или вопросы для обсуждения..."
                className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]"
              />
            </div>

            <div className="bg-[#1055b2]/10 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-[#6D7A89]">Стоимость занятия:</span>
                <span className="font-semibold text-[#1A1A1A]">{selectedTeacher.price}</span>
              </div>
            </div>

            <GetGrantButton variant="primary" size="lg" className="w-full">
              Подтвердить запись
            </GetGrantButton>
          </div>
        )}
      </GetGrantModal>
    </div>
  );
}
