import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// Определение типов (интерфейсов) для TypeScript
interface SellingPoint {
  value?: string;
}

interface Country {
  id?: number;
  code?: string;
  name?: string;
  flag?: string;
  selling_points?: SellingPoint[];
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 1. Состояние для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка данных (оставлена без изменений)
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
      .then(() => axios.get('http://127.0.0.1:8000/api/countries'))
      .then(res => {
        const data = res.data?.data || [];
        setCountries(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Ошибка при получении стран:', err.response || err);
        setError('Не удалось загрузить страны');
      })
      .finally(() => setLoading(false));
  }, []);

  // 3. Логика фильтрации: использует useMemo для кэширования отфильтрованного списка
  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return countries;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return countries.filter(country => {
      // Фильтрация по полю name
      const nameMatch = country.name 
        ? country.name.toLowerCase().includes(lowerCaseSearchTerm) 
        : false;

      // Фильтрация по полю code
      const codeMatch = country.code
        ? country.code.toLowerCase().includes(lowerCaseSearchTerm)
        : false;

      // Возвращаем страну, если совпадение найдено хотя бы по одному полю
      return nameMatch || codeMatch;
    });
  }, [countries, searchTerm]); // Пересчитывается при изменении стран или поискового запроса

  if (loading) return <p>Загрузка стран...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Список стран</h1>
      
      {/* 2. Поле ввода для фильтрации */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Фильтр по названию или коду страны..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      
      {/* Отображаем отфильтрованный список */}
      {filteredCountries.length === 0 ? (
        <p>{searchTerm ? 'По вашему запросу страны не найдены.' : 'Страны не найдены'}</p>
      ) : (
        <ul>
          {filteredCountries.map(country => {
            const sellingPoints = Array.isArray(country.selling_points)
              ? country.selling_points
                  .map(sp => sp?.value || '')
                  .filter(Boolean)
                  .join(', ')
              : '';

            return (
              <li key={country.id ?? country.code ?? Math.random()} style={{ marginBottom: '1rem', borderBottom: '1px dashed #eee', paddingBottom: '10px' }}>
                <strong>{country.name ?? 'Без названия'} ({country.code ?? '-'})</strong><br />
                {country.flag && <span>Флаг: {country.flag}</span>}<br />
                {sellingPoints && <span>Продающие точки: {sellingPoints}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}