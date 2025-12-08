import React, { useState } from 'react';
import { GetGrantCard, GetGrantCardHeader, GetGrantCardContent, GetGrantCardFooter } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  MessageCircle, Phone, Mail, Upload, FileText, CheckCircle, 
  Clock, AlertCircle, Calendar, BookOpen, Video 
} from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const timelineSteps = [
    { 
      id: 1, 
      title: 'Консультация и планирование', 
      status: 'completed', 
      date: '15 сентября 2024',
      description: 'Первая встреча с менеджером'
    },
    { 
      id: 2, 
      title: 'Выбор университетов', 
      status: 'completed', 
      date: '25 сентября 2024',
      description: 'Выбрано 5 университетов'
    },
    { 
      id: 3, 
      title: 'Подготовка документов', 
      status: 'in-progress', 
      date: 'До 15 декабря 2024',
      description: 'Сбор всех необходимых документов'
    },
    { 
      id: 4, 
      title: 'Сдача экзаменов', 
      status: 'pending', 
      date: 'Январь 2025',
      description: 'TOEFL, SAT'
    },
    { 
      id: 5, 
      title: 'Подача заявок', 
      status: 'pending', 
      date: 'Февраль 2025',
      description: 'Отправка документов в университеты'
    },
    { 
      id: 6, 
      title: 'Получение решения', 
      status: 'pending', 
      date: 'Апрель 2025',
      description: 'Ожидание ответов'
    }
  ];

  const documents = [
    { name: 'Transcript.pdf', status: 'approved', uploadDate: '20.10.2024', size: '2.3 MB' },
    { name: 'Recommendation_Letter_1.pdf', status: 'approved', uploadDate: '22.10.2024', size: '1.8 MB' },
    { name: 'Personal_Statement.pdf', status: 'pending', uploadDate: '25.10.2024', size: '850 KB' },
    { name: 'Passport_Copy.pdf', status: 'rejected', uploadDate: '18.10.2024', size: '1.2 MB' }
  ];

  const upcomingCourses = [
    { 
      id: 1, 
      title: 'TOEFL Speaking Practice', 
      teacher: 'Elena Smith', 
      date: '25 ноября', 
      time: '18:00',
      type: 'video'
    },
    { 
      id: 2, 
      title: 'SAT Math', 
      teacher: 'Michael Johnson', 
      date: '27 ноября', 
      time: '19:00',
      type: 'video'
    },
    { 
      id: 3, 
      title: 'Essay Writing Workshop', 
      teacher: 'Sarah Williams', 
      date: '28 ноября', 
      time: '17:00',
      type: 'video'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-[#1055b2]" />;
      default:
        return <div className="w-6 h-6 rounded-full border-2 border-[#6D7A89]" />;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <GetGrantBadge variant="success">Одобрено</GetGrantBadge>;
      case 'pending':
        return <GetGrantBadge variant="warning">На проверке</GetGrantBadge>;
      case 'rejected':
        return <GetGrantBadge variant="default">Требует изменений</GetGrantBadge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container-custom py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            Добро пожаловать, Иван! 👋
          </h1>
          <p className="text-[#6D7A89]">
            Вот обзор вашего прогресса в подготовке к поступлению
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GetGrantCard>
                <GetGrantCardHeader>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">
                    Таймлайн поступления
                  </h2>
                  <p className="text-sm text-[#6D7A89]">
                    Следите за прогрессом вашей подготовки
                  </p>
                </GetGrantCardHeader>
                
                <GetGrantCardContent>
                  <div className="space-y-6">
                    {timelineSteps.map((step, index) => (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(step.status)}
                          {index < timelineSteps.length - 1 && (
                            <div className={`w-0.5 h-16 mt-2 ${
                              step.status === 'completed' ? 'bg-green-500' : 'bg-[#1A1A1A]/10'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold text-[#1A1A1A]">{step.title}</h3>
                            <span className="text-xs text-[#6D7A89]">{step.date}</span>
                          </div>
                          <p className="text-sm text-[#6D7A89]">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GetGrantCard>
                <GetGrantCardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1A1A1A]">Документы</h2>
                      <p className="text-sm text-[#6D7A89]">Загружайте и отслеживайте статус</p>
                    </div>
                    <GetGrantButton variant="primary" size="sm">
                      Загрузить
                    </GetGrantButton>
                  </div>
                </GetGrantCardHeader>
                
                <GetGrantCardContent>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.name}
                        className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg hover:bg-[#e5e5e5] transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-[#6D7A89]" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#1A1A1A] truncate">{doc.name}</p>
                            <p className="text-xs text-[#6D7A89]">
                              {doc.uploadDate} • {doc.size}
                            </p>
                          </div>
                        </div>
                        {getDocumentStatusBadge(doc.status)}
                      </div>
                    ))}
                  </div>

                  {/* Drag & Drop Area */}
                  <div className="mt-4 border-2 border-dashed border-[#1A1A1A]/20 rounded-lg p-8 text-center hover:border-[#1055b2] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-[#6D7A89] mx-auto mb-2" />
                    <p className="text-sm text-[#1A1A1A] font-medium mb-1">
                      Перетащите файлы сюда или нажмите для выбора
                    </p>
                    <p className="text-xs text-[#6D7A89]">
                      PDF, DOC, DOCX до 10 MB
                    </p>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            </motion.div>

            {/* Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GetGrantCard>
                <GetGrantCardHeader>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Предстоящие занятия</h2>
                  <p className="text-sm text-[#6D7A89]">Ваше расписание на эту неделю</p>
                </GetGrantCardHeader>
                
                <GetGrantCardContent>
                  <div className="space-y-3">
                    {upcomingCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 bg-[#1055b2] rounded-lg flex items-center justify-center">
                            <Video className="w-5 h-5 text-[#1A1A1A]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#1A1A1A]">{course.title}</h3>
                            <p className="text-sm text-[#6D7A89]">{course.teacher}</p>
                            <p className="text-xs text-[#6D7A89] mt-1">
                              {course.date} в {course.time}
                            </p>
                          </div>
                        </div>
                        <GetGrantButton variant="outline" size="sm">
                          Присоединиться
                        </GetGrantButton>
                      </div>
                    ))}
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Manager Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GetGrantCard>
                <GetGrantCardHeader>
                  <h3 className="font-semibold text-[#1A1A1A]">Ваш менеджер</h3>
                </GetGrantCardHeader>
                
                <GetGrantCardContent>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA1NjU5OHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Manager"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-[#1A1A1A] mb-1">Анна Петрова</h4>
                    <p className="text-sm text-[#6D7A89] mb-4">Старший консультант</p>
                    
                    <div className="space-y-2 text-sm">
                      <a href="tel:+79991234567" className="flex items-center justify-center gap-2 text-[#6D7A89] hover:text-[#1A1A1A]">
                        <Phone className="w-4 h-4" />
                        +7 (999) 123-45-67
                      </a>
                      <a href="mailto:anna@getgrant.ru" className="flex items-center justify-center gap-2 text-[#6D7A89] hover:text-[#1A1A1A]">
                        <Mail className="w-4 h-4" />
                        anna@getgrant.ru
                      </a>
                    </div>
                  </div>
                </GetGrantCardContent>
                
                <GetGrantCardFooter>
                  <GetGrantButton variant="primary" size="sm" className="w-full">
                    Написать
                  </GetGrantButton>
                </GetGrantCardFooter>
              </GetGrantCard>
            </motion.div>

            {/* Mini Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GetGrantCard>
                <GetGrantCardHeader>
                  <h3 className="font-semibold text-[#1A1A1A]">Календарь</h3>
                </GetGrantCardHeader>
                
                <GetGrantCardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#1055b2]/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-[#1A1A1A]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1A1A1A]">Дедлайн заявки MIT</p>
                        <p className="text-xs text-[#6D7A89]">15 декабря 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                      <Calendar className="w-5 h-5 text-[#6D7A89]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1A1A1A]">TOEFL экзамен</p>
                        <p className="text-xs text-[#6D7A89]">20 января 2025</p>
                      </div>
                    </div>
                  </div>
                  <GetGrantButton variant="outline" size="sm" className="w-full mt-4">
                    Смотреть все
                  </GetGrantButton>
                </GetGrantCardContent>
              </GetGrantCard>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GetGrantCard>
                <GetGrantCardHeader>
                  <h3 className="font-semibold text-[#1A1A1A]">Статистика</h3>
                </GetGrantCardHeader>
                
                <GetGrantCardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#6D7A89]">Прогресс документов</span>
                        <span className="font-medium text-[#1A1A1A]">75%</span>
                      </div>
                      <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1055b2]" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#6D7A89]">Завершенные курсы</span>
                        <span className="font-medium text-[#1A1A1A]">12/20</span>
                      </div>
                      <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
