import React, { useState } from 'react';
import { GetGrantCard, GetGrantCardContent } from '../GetGrantCard';
import { GetGrantButton } from '../GetGrantButton';
import { GetGrantBadge } from '../GetGrantBadge';
import { GetGrantModal } from '../GetGrantModal';
import { GetGrantInput } from '../GetGrantInput';
import { GetGrantTabs } from '../GetGrantTabs';
import { 
  Users, UserCog, GraduationCap, Globe, BookOpen, 
  FileText, Search, MoreVertical, Edit, Trash2, Plus,
  Filter, Download, Upload, Eye
} from 'lucide-react';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);

  const stats = [
    { icon: Users, label: 'Всего пользователей', value: '1,234', change: '+12%' },
    { icon: UserCog, label: 'Активных менеджеров', value: '24', change: '+2' },
    { icon: GraduationCap, label: 'Заявок на поступление', value: '456', change: '+18%' },
    { icon: Globe, label: 'Университетов', value: '150', change: '+5' }
  ];

  const users = [
    {
      id: 1,
      name: 'Иван Петров',
      email: 'ivan@example.com',
      role: 'Студ��нт',
      status: 'Активный',
      manager: 'Анна Петрова',
      registered: '15.09.2024'
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      role: 'Родитель',
      status: 'Активный',
      manager: 'Елена Иванова',
      registered: '20.09.2024'
    },
    {
      id: 3,
      name: 'Алексей Кузнецов',
      email: 'alexey@example.com',
      role: 'Студент',
      status: 'Неактивный',
      manager: 'Анна Петрова',
      registered: '10.08.2024'
    }
  ];

  const managers = [
    {
      id: 1,
      name: 'Анна Петрова',
      email: 'anna.petrova@getgrant.ru',
      students: 45,
      status: 'Активный',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Елена Иванова',
      email: 'elena.ivanova@getgrant.ru',
      students: 38,
      status: 'Активный',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Дмитрий Смирнов',
      email: 'dmitry.smirnov@getgrant.ru',
      students: 52,
      status: 'Активный',
      rating: 5.0
    }
  ];

  const universities = [
    {
      id: 1,
      name: 'Harvard University',
      country: 'США',
      programs: 120,
      students: 85,
      status: 'Активный'
    },
    {
      id: 2,
      name: 'Oxford University',
      country: 'Великобритания',
      programs: 95,
      students: 62,
      status: 'Активный'
    },
    {
      id: 3,
      name: 'Stanford University',
      country: 'США',
      programs: 110,
      students: 73,
      status: 'Активный'
    }
  ];

  const tabs = [
    {
      id: 'users',
      label: 'Пользователи',
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D7A89]" />
                <input
                  type="text"
                  placeholder="Поиск пользователей..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]"
                />
              </div>
              <GetGrantButton variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Фильтры
              </GetGrantButton>
            </div>
            <div className="flex gap-2">
              <GetGrantButton variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </GetGrantButton>
              <GetGrantButton 
                variant="primary" 
                size="sm"
                onClick={() => setShowUserModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить
              </GetGrantButton>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1A1A]/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Имя</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Роль</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Менеджер</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Статус</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Дата регистрации</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#6D7A89]">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#1A1A1A]/10 hover:bg-[#F5F5F5] transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#1A1A1A]">{user.name}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{user.email}</td>
                    <td className="py-3 px-4">
                      <GetGrantBadge variant="outline">{user.role}</GetGrantBadge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{user.manager}</td>
                    <td className="py-3 px-4">
                      <GetGrantBadge variant={user.status === 'Активный' ? 'success' : 'default'}>
                        {user.status}
                      </GetGrantBadge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{user.registered}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-[#6D7A89]" />
                        </button>
                        <button className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-[#6D7A89]" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-[#6D7A89]">Показано 3 из 1,234</span>
            <div className="flex gap-2">
              <GetGrantButton variant="outline" size="sm">Назад</GetGrantButton>
              <GetGrantButton variant="outline" size="sm">Далее</GetGrantButton>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'managers',
      label: 'Менеджеры',
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#1A1A1A]">Менеджеры</h3>
            <GetGrantButton variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Добавить менеджера
            </GetGrantButton>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1A1A]/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Имя</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Студентов</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Рейтинг</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Статус</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#6D7A89]">Действия</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager) => (
                  <tr key={manager.id} className="border-b border-[#1A1A1A]/10 hover:bg-[#F5F5F5] transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#1A1A1A]">{manager.name}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{manager.email}</td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{manager.students}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-[#1A1A1A]">{manager.rating}</span>
                        <span className="text-[#1055b2]">★</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <GetGrantBadge variant="success">{manager.status}</GetGrantBadge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-[#6D7A89]" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'universities',
      label: 'Университеты',
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#1A1A1A]">Университеты</h3>
            <GetGrantButton 
              variant="primary" 
              size="sm"
              onClick={() => setShowUniversityModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить университет
            </GetGrantButton>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1A1A]/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Название</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Страна</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Программы</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Студентов</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6D7A89]">Статус</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#6D7A89]">Действия</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((uni) => (
                  <tr key={uni.id} className="border-b border-[#1A1A1A]/10 hover:bg-[#F5F5F5] transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#1A1A1A]">{uni.name}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{uni.country}</td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{uni.programs}</td>
                    <td className="py-3 px-4 text-sm text-[#6D7A89]">{uni.students}</td>
                    <td className="py-3 px-4">
                      <GetGrantBadge variant="success">{uni.status}</GetGrantBadge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-[#6D7A89]" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'documents',
      label: 'Документы',
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-[#1A1A1A]">Лицензии и сертификаты</h3>
            <GetGrantButton variant="primary" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Загрузить документ
            </GetGrantButton>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Лицензия на образовательную деятельность', number: '№123456', date: '01.01.2020', expires: '01.01.2030' },
              { name: 'Свидетельство об аккредитации', number: '№654321', date: '15.03.2021', expires: '15.03.2031' },
              { name: 'Сертификат NAFSA', number: '№789012', date: '10.06.2022', expires: '10.06.2027' }
            ].map((doc, index) => (
              <GetGrantCard key={index}>
                <GetGrantCardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1055b2] rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#1A1A1A]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1A1A1A]">{doc.name}</h4>
                        <p className="text-sm text-[#6D7A89]">{doc.number} • Выдан: {doc.date}</p>
                        <p className="text-xs text-[#6D7A89]">Действителен до: {doc.expires}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <GetGrantButton variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Просмотр
                      </GetGrantButton>
                      <GetGrantButton variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </GetGrantButton>
                    </div>
                  </div>
                </GetGrantCardContent>
              </GetGrantCard>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Панель администратора</h1>
          <p className="text-[#6D7A89]">Управление платформой GetGrant</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <GetGrantCard key={index}>
              <GetGrantCardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[#6D7A89] mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#1A1A1A] mb-1">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                    <div className="w-12 h-12 bg-[#1055b2]/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                </div>
              </GetGrantCardContent>
            </GetGrantCard>
          ))}
        </motion.div>

        {/* Main Content */}
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
      </div>

      {/* User Modal */}
      <GetGrantModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="Добавить пользователя"
      >
        <div className="space-y-4">
          <GetGrantInput label="Полное имя" placeholder="Иван Иванов" />
          <GetGrantInput label="Email" type="email" placeholder="email@example.com" />
          <GetGrantInput label="Телефон" type="tel" placeholder="+7 (999) 123-45-67" />
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Роль</label>
              <select className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]">
              <option>Студент</option>
              <option>Родитель</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Менеджер</label>
              <select className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]">
              <option>Анна Петрова</option>
              <option>Елена Иванова</option>
              <option>Дмитрий Смирнов</option>
            </select>
          </div>
          <GetGrantButton variant="primary" size="lg" className="w-full">
            Создать пользователя
          </GetGrantButton>
        </div>
      </GetGrantModal>

      {/* University Modal */}
      <GetGrantModal
        isOpen={showUniversityModal}
        onClose={() => setShowUniversityModal(false)}
        title="Добавить университет"
        size="lg"
      >
        <div className="space-y-4">
          <GetGrantInput label="Название университета" placeholder="Harvard University" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Страна</label>
                <select className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]">
                <option>США</option>
                <option>Великобритания</option>
                <option>Канада</option>
              </select>
            </div>
            <GetGrantInput label="Город" placeholder="Cambridge, MA" />
          </div>
          <GetGrantInput label="Веб-сайт" placeholder="harvard.edu" />
          <div className="grid grid-cols-2 gap-4">
            <GetGrantInput label="Рейтинг" type="number" placeholder="1" />
            <GetGrantInput label="Процент поступления" placeholder="4.5%" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Описание</label>
              <textarea
              rows={4}
              placeholder="Краткое описание университета..."
                className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1055b2]"
            />
          </div>
          <GetGrantButton variant="primary" size="lg" className="w-full">
            Создать университет
          </GetGrantButton>
        </div>
      </GetGrantModal>
    </div>
  );
}
