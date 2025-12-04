import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
      .then(() =>
        axios.get("http://127.0.0.1:8000/api/programs")
      )
      .then(res => {
        const data = res.data?.data || [];
        setPrograms(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Ошибка загрузки программ:", err);
        setError("Не удалось загрузить программы");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка программ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Список программ</h1>

      {programs.length === 0 ? (
        <p>Программ не найдено</p>
      ) : (
        <ul>
          {programs.map(p => {
            const career =
              Array.isArray(p.career_info)
                ? p.career_info.join(", ")
                : "";

            return (
              <li key={p.id} style={{ marginBottom: "1rem" }}>
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
