import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
      .then(() =>
        axios.get("http://127.0.0.1:8000/api/universities")
      )
      .then(res => {
        const data = res.data?.data || [];
        setUniversities(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Ошибка загрузки университетов:", err.response || err);
        setError("Не удалось загрузить университеты");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка университетов...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Список университетов</h1>

      {universities.length === 0 ? (
        <p>Университеты не найдены</p>
      ) : (
        <ul>
          {universities.map(u => {

            // ✔ Безопасная обработка requirements
            const requirements =
              typeof u.requirements === "object" && u.requirements !== null
                ? Object.entries(u.requirements)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(", ")
                : "";

            return (
              <li key={u.id} style={{ marginBottom: "1rem" }}>
                <strong>{u.name}</strong>
                <br />

                {u.website && (
                  <span>
                    Сайт:{" "}
                    <a href={u.website} target="_blank" rel="noreferrer">
                      {u.website}
                    </a>
                    <br />
                  </span>
                )}

                {u.description && <span>{u.description}<br /></span>}
                {u.level && <span>Уровень: {u.level}<br /></span>}

                {(u.cost_min || u.cost_max) && (
                  <span>
                    Стоимость: {u.cost_min ?? "?"} — {u.cost_max ?? "?"}
                    <br />
                  </span>
                )}

                {requirements && (
                  <span>Требования: {requirements}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
