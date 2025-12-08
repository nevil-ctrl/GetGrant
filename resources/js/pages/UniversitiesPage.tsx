import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

// ----------------------
// Interfaces
// ----------------------
interface Country {
  id: number;
  name: string;
  flag?: string;
}

interface University {
  id: number;
  name: string;
  description?: string | null;
  logo?: string | null;
  website?: string | null;
  level: string | null;
  cost_min: number | null;
  cost_max: number | null;
  requirements?: any | null;
  deadlines?: any | null;
  is_active?: boolean;
  country?: Country;
}

interface ApiResponse {
  data: University[];
  current_page: number;
  last_page: number;
  total: number;
}

// ===================================================
// ФИЛЬТРЫ
// ===================================================
function Filters({
  searchName,
  setSearchName,
  availableCountries,
  selectedCountryIds,
  setSelectedCountryIds,
  selectedLevels,
  setSelectedLevels,
  priceRange,
  setPriceRange,
  onReset,
}: any) {
  const levelsOptions = ["bachelor", "master", "phd"];

  const toggleInArray = (arr: any[], value: any) =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];

  return (
    <aside style={{ width: 280, borderRight: "1px solid #eee", paddingRight: 30 }}>
      <h3>⚙️ Фильтры</h3>

      {/* — Поиск — */}
      <div>
        <label>Название:</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Поиск..."
          style={{ width: "100%", marginTop: 5 }}
        />
      </div>

      {/* — Страны — */}
      <div style={{ marginTop: 20 }}>
        <label>Страна:</label>
        <div style={{ maxHeight: 200, overflowY: "auto", border: "1px solid #eee", padding: 10 }}>
          {availableCountries.length === 0 && <small>Нет стран</small>}
          {availableCountries.map((c: Country) => (
            <label key={c.id} style={{ display: "flex", marginBottom: 4 }}>
              <input
                type="checkbox"
                checked={selectedCountryIds.includes(c.id)}
                onChange={() => setSelectedCountryIds(toggleInArray(selectedCountryIds, c.id))}
              />
              <span style={{ marginLeft: 8 }}>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* — Уровень — */}
      <div style={{ marginTop: 20 }}>
        <label>Уровень:</label>
        {levelsOptions.map((lvl) => (
          <label key={lvl} style={{ display: "flex", marginBottom: 4 }}>
            <input
              type="checkbox"
              checked={selectedLevels.includes(lvl)}
              onChange={() => setSelectedLevels(toggleInArray(selectedLevels, lvl))}
            />
            <span style={{ marginLeft: 8 }}>{lvl}</span>
          </label>
        ))}
      </div>

      {/* — Цена — */}
      <div style={{ marginTop: 20 }}>
        <label>Стоимость (USD):</label>

        <div>
          <span>От: {priceRange.min}</span>
          <input
            type="range"
            min={0}
            max={100000}
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((p: any) => ({ ...p, min: Number(e.target.value) }))
            }
          />
        </div>

        <div>
          <span>До: {priceRange.max}</span>
          <input
            type="range"
            min={0}
            max={100000}
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((p: any) => ({ ...p, max: Number(e.target.value) }))
            }
          />
        </div>
      </div>

      <button
        onClick={onReset}
        style={{ width: "100%", marginTop: 20, padding: 10, background: "#dc3545", color: "white" }}
      >
        Сбросить фильтры
      </button>
    </aside>
  );
}

// ===================================================
// СПИСОК УНИВЕРСИТЕТОВ
// ===================================================
function UniversityList({ universities }: { universities: University[] }) {
  if (universities.length === 0) return <p>Ничего не найдено</p>;

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {universities.map((u) => (
        <li key={u.id} style={{ border: "1px solid #ddd", padding: 15, marginBottom: 15 }}>
          <h2>{u.name}</h2>
          {u.country && (
            <span style={{ background: "#e6f7ff", padding: "4px 10px", borderRadius: 20 }}>
              {u.country.flag} {u.country.name}
            </span>
          )}
          {u.website && (
            <div>
              <a href={u.website} target="_blank">
                🌐 Сайт
              </a>
            </div>
          )}
          {u.description && <p>{u.description}</p>}
          <div>
            {u.level && <strong>🎓 {u.level}</strong>}
            {(u.cost_min || u.cost_max) && (
              <span style={{ marginLeft: 15 }}>
                💰 {u.cost_min} – {u.cost_max}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

// ===================================================
// ПАГИНАЦИЯ
// ===================================================
function Pagination({ currentPage, lastPage, onPage }: any) {
  if (lastPage <= 1) return null;

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
      <button disabled={currentPage === 1} onClick={() => onPage(currentPage - 1)}>
        &lt; Назад
      </button>
      <strong>
        {currentPage} / {lastPage}
      </strong>
      <button disabled={currentPage === lastPage} onClick={() => onPage(currentPage + 1)}>
        Вперед &gt;
      </button>
    </div>
  );
}

// ===================================================
// ОСНОВНОЙ КОМПОНЕНТ
// ===================================================
export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [searchName, setSearchName] = useState("");
  const [selectedCountryIds, setSelectedCountryIds] = useState<number[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  // ------------------------
  // Load countries
  // ------------------------
  useEffect(() => {
    (async () => {
      try {
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        const res = await axios.get("http://127.0.0.1:8000/api/countries");
        setAvailableCountries(res.data);
      } catch (err) {
        setError("Не удалось загрузить страны");
      }
    })();
  }, []);

  // ------------------------
  // Load universities
  // ------------------------
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

// Простой текстовый фильтр
if (searchName) params.append("search", searchName);

// Массив стран
selectedCountryIds.forEach((id) => {
  params.append("country_id[]", String(id));
});

// Массив уровней
selectedLevels.forEach((lvl) => {
  params.append("level[]", lvl);
});

// Цена
if (priceRange.min > 0) params.append("cost_min_range", String(priceRange.min));
if (priceRange.max < 100000)
  params.append("cost_max_range", String(priceRange.max));

// Страница
params.append("page", String(currentPage));

const query = params.toString();


        const res = await axios.get(`http://127.0.0.1:8000/api/universities?${query}`);
        const data: ApiResponse = res.data;

        setUniversities(data.data);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setTotal(data.total);
      } catch (err) {
        setError("Ошибка загрузки университетов");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [searchName, selectedCountryIds, selectedLevels, priceRange, currentPage]);

  // ------------------------
  // Reset filters
  // ------------------------
  const handleReset = () => {
    setSearchName("");
    setSelectedCountryIds([]);
    setSelectedLevels([]);
    setPriceRange({ min: 0, max: 100000 });
    setCurrentPage(1);
  };

  if (error)
    return (
      <p style={{ color: "red", padding: 20 }}>
        ❌ {error}
      </p>
    );

  return (
    <div style={{ display: "flex", gap: 30, padding: 20 }}>
      <Filters
        searchName={searchName}
        setSearchName={setSearchName}
        availableCountries={availableCountries}
        selectedCountryIds={selectedCountryIds}
        setSelectedCountryIds={(arr: number[]) => {
          setCurrentPage(1);
          setSelectedCountryIds(arr);
        }}
        selectedLevels={selectedLevels}
        setSelectedLevels={(arr: string[]) => {
          setCurrentPage(1);
          setSelectedLevels(arr);
        }}
        priceRange={priceRange}
        setPriceRange={(val: any) => {
          setCurrentPage(1);
          setPriceRange(val);
        }}
        onReset={handleReset}
      />

      <main style={{ flex: 1 }}>
        <h1>Университеты ({total})</h1>

        {loading && universities.length === 0 ? (
          <p>⏳ Загрузка...</p>
        ) : (
          <>
            <UniversityList universities={universities} />
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPage={(p: number) => setCurrentPage(p)}
            />
          </>
        )}
      </main>
    </div>
  );
}
