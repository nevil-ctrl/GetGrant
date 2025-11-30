# 🚀 Быстрый старт для команды GetGrant

## 📊 Текущее состояние проекта

### ✅ Что уже готово:
- ✅ Laravel 12 настроен и работает
- ✅ PostgreSQL + Redis в Docker
- ✅ Авторизация через Fortify + Sanctum работает
- ✅ React SPA с роутингом настроен
- ✅ Filament админ-панель доступна на `/admin`
- ✅ Базовые страницы созданы (пока заглушки)

### ❌ Что нужно сделать в первую очередь:

## 🎯 Первые шаги (на этой неделе)

### 1. База данных (2-3 дня)
Создать модели и миграции для:
- ✅ Расширить User (phone, role, profile_type, manager_id)
- ✅ Country (страны)
- ✅ University (университеты)
- ✅ Program (программы)
- ✅ Manager (менеджеры)
- ✅ Application (заявки на поступление)

**См. примеры в [EXAMPLES.md](./EXAMPLES.md)**

### 2. API (2-3 дня)
Создать API endpoints:
- `GET /api/countries` - список стран
- `GET /api/universities` - список университетов (с фильтрами)
- `GET /api/programs` - список программ (с фильтрами)

**См. примеры в [EXAMPLES.md](./EXAMPLES.md)**

### 3. Filament админ-панель (2 дня)
Создать ресурсы для управления:
- CountryResource
- UniversityResource
- ProgramResource

**См. примеры в [EXAMPLES.md](./EXAMPLES.md)**

### 4. React компоненты (параллельно с бэкендом)
Обновить страницы:
- CountriesPage - подключить к API
- UniversitiesPage - подключить к API
- ProgramsPage - подключить к API

**См. примеры в [EXAMPLES.md](./EXAMPLES.md)**

---

## 📁 Структура проекта

```
GetGrant/
├── app/
│   ├── Models/          # Модели (User, Country, University, etc.)
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/     # API контроллеры
│   └── Filament/
│       └── Resources/   # Filament ресурсы для админки
├── database/
│   ├── migrations/      # Миграции БД
│   ├── factories/       # Фабрики для тестовых данных
│   └── seeders/         # Сидеры
├── resources/
│   ├── js/
│   │   ├── pages/       # React страницы
│   │   ├── components/  # React компоненты
│   │   └── router/      # Роутинг
│   └── views/           # Blade шаблоны
└── routes/
    ├── web.php          # Web маршруты
    └── api.php          # API маршруты
```

---

## 🛠 Полезные команды

```bash
# Запуск проекта
docker-compose up -d
npm run dev
php artisan serve

# Создание миграции
php artisan make:migration create_countries_table

# Создание модели с миграцией и фабрикой
php artisan make:model Country -m -f

# Создание API контроллера
php artisan make:controller Api/CountryController --api

# Создание Filament ресурса
php artisan make:filament-resource Country

# Запуск миграций
php artisan migrate

# Запуск сидера
php artisan db:seed --class=GetGrantSeeder

# Очистка кеша
php artisan optimize:clear
```

---

## 📚 Документация

- **[ROADMAP.md](./ROADMAP.md)** - Полный план разработки (все этапы)
- **[TODO_PRIORITY.md](./TODO_PRIORITY.md)** - Детальный список приоритетных задач
- **[EXAMPLES.md](./EXAMPLES.md)** - Примеры кода для копирования

---

## 🎨 Для дизайнеров

Пока разработчики делают бэкенд, можно работать над:
1. Дизайн-системой (цвета, компоненты)
2. Макетами всех страниц
3. Адаптивными версиями

**Важно:** Используйте TailwindCSS для стилей (уже настроен в проекте)

---

## ⚠️ Важные заметки

1. **Авторизация** - уже работает, не трогать без необходимости
2. **База данных** - PostgreSQL, не MySQL
3. **JSON поля** - использовать для гибких данных (requirements, deadlines)
4. **Фильтры** - делать через React на фронтенде
5. **Чат** - пока заглушка, интеграция позже (нужно уточнить у заказчика)

---

## 🆘 Если что-то не работает

1. Проверить, что Docker контейнеры запущены: `docker-compose ps`
2. Очистить кеш: `php artisan optimize:clear`
3. Перезапустить миграции: `php artisan migrate:fresh`
4. Проверить логи: `docker-compose logs app`

---