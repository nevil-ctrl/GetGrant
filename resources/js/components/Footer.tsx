import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  const footerSections = [
    {
      title: 'Образование',
      links: [
        { name: 'Университеты', href: '#universities' },
        { name: 'Страны', href: '#countries' },
        { name: 'Программы', href: '#programs' },
        { name: 'Онлайн-подготовка', href: '#courses' }
      ]
    },
    {
      title: 'Компания',
      links: [
        { name: 'О нас', href: '#about' },
        { name: 'Наша команда', href: '#team' },
        { name: 'Отзывы', href: '#reviews' },
        { name: 'Партнёры', href: '#partners' }
      ]
    },
    {
      title: 'Поддержка',
      links: [
        { name: 'FAQ', href: '#faq' },
        { name: 'Контакты', href: '#contacts' },
        { name: 'Блог', href: '#blog' },
        { name: 'Документы', href: '#documents' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#1055b2] rounded-lg flex items-center justify-center">
                <span className="text-[#1A1A1A] font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-bold">GetGrant</span>
            </div>
            <p className="text-[#6D7A89] mb-6 max-w-sm">
              Онлайн-сервис для подготовки и сопровождения поступления студентов 9–11 классов за рубеж.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+74951234567" className="flex items-center gap-2 text-[#6D7A89] hover:text-[#1055b2] transition-colors">
                <Phone className="w-4 h-4" />
                <span>+996 554 123 456 </span>
              </a>
              <a href="mailto:info@getgrant.ru" className="flex items-center gap-2 text-[#6D7A89] hover:text-[#1055b2] transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@getgrant.kg</span>
              </a>
              <div className="flex items-center gap-2 text-[#6D7A89]">
                <MapPin className="w-4 h-4" />
                <span>Бишкек, ул. Касыма Тыныстанова, 197/1</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#6D7A89] hover:text-[#1055b2] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1055b2] text-white hover:text-[#1A1A1A] transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6D7A89]">
            <p>© 2025 GetGrant. Все права защищены.</p>
            <div className="flex flex-wrap gap-6">
              <a href="#privacy" className="hover:text-[#1055b2] transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#terms" className="hover:text-[#1055b2] transition-colors">
                Условия использования
              </a>
              <a href="#licenses" className="hover:text-[#1055b2] transition-colors">
                Лицензии
              </a>
            </div>
          </div>
          
          {/* Licenses Info */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-[#6D7A89] text-center md:text-left">
              Лицензия на образовательную деятельность № 240000733 от 01.01.2020 | 
              Свидетельство об аккредитации № 654321 от 15.03.2021
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
