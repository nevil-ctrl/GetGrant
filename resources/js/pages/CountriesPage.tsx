import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Загрузка стран...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Список стран</h1>
      {countries.length === 0 ? (
        <p>Страны не найдены</p>
      ) : (
        <ul>
          {countries.map(country => {
            const sellingPoints = Array.isArray(country.selling_points)
              ? country.selling_points
                  .map(sp => sp?.value || '')
                  .filter(Boolean)
                  .join(', ')
              : '';

            return (
              <li key={country.id ?? country.code ?? Math.random()}>
                {country.name ?? 'Без названия'} ({country.code ?? '-'})<br />
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
