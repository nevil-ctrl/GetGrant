import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

// Определяем интерфейсы для типизации данных
interface Program {
  id: number;
  name: string;
  field_of_study?: string;
  description?: string;
  is_top?: boolean;
  career_info?: string[] | null;
  university?: {
    name: string;
  };
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Состояние для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');

  // --- Загрузка данных ---
  useEffect(() => {
    // Получение CSRF-cookie и затем данных программ
    axios
      .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
      .then(() =>
        axios.get("http://127.0.0.1:8000/api/programs")
      )
      .then(res => {
        const data = res.data?.data || [];
        // Гарантируем, что устанавливаем массив
        setPrograms(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Ошибка загрузки программ:", err.response || err);
        setError("Не удалось загрузить программы");
      })
      .finally(() => setLoading(false));
  }, []);

  // --- Логика фильтрации: useMemo для оптимизации ---
  const filteredPrograms = useMemo(() => {
    if (!searchTerm) {
      return programs;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return programs.filter(p => {
      // Фильтрация по названию программы (name)
      return p.name.toLowerCase().includes(lowerCaseSearchTerm);
    });
  }, [programs, searchTerm]); // Пересчитываем только при изменении исходных программ или поискового запроса

  // --- Состояния загрузки и ошибки ---
  if (loading) return <p>Загрузка программ...</p>;
  if (error) return <p>{error}</p>;

  // --- Отображение компонента ---
  return (
    <div style={{ padding: 20 }}>
      <h1>Список программ</h1>

      {/* Поле ввода для фильтрации */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Фильтр по названию программы..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '350px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Отображаем отфильтрованный список */}
      {filteredPrograms.length === 0 ? (
        <p>{searchTerm ? `Программы по запросу "${searchTerm}" не найдены.` : 'Программ не найдено'}</p>
      ) : (
        <ul>
          {filteredPrograms.map(p => {
            // Форматирование списка карьерной информации
            const career =
              Array.isArray(p.career_info)
                ? p.career_info.join(", ")
                : "";

            return (
              <li key={p.id} style={{ marginBottom: "1rem", borderBottom: '1px dashed #eee', paddingBottom: '10px' }}>
                <strong>{p.name}</strong><br />

                {p.university?.name && (
                  <span>Университет: {p.university.name}<br /></span>
                )}

                {p.field_of_study && (
                  <span>Направление: {p.field_of_study}<br /></span>
                )}

                {p.description && (
                  <span>{p.description}<br /></span>
                )}

                {career && (
                  <span>Карьера: {career}<br /></span>
                )}

                {p.is_top && <span>⭐ Топ программа<br /></span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}