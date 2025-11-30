# 🎯 Приоритетные задачи для немедленного старта

## 🔥 Критически важно (начать прямо сейчас)

### 1. Расширение модели User
**Файлы для создания/изменения:**
- `database/migrations/XXXX_XX_XX_add_fields_to_users_table.php`
- `app/Models/User.php`

**Что добавить:**
- `phone` (string, nullable)
- `role` (enum: student, parent, manager, admin) - по умолчанию 'student'
- `profile_type` (enum: student, parent) - для регистрации
- `manager_id` (foreign key на users, nullable)
- `phone_verified_at` (timestamp, nullable)

### 2. Модель Country
**Файлы:**
- `database/migrations/XXXX_XX_XX_create_countries_table.php`
- `app/Models/Country.php`
- `database/factories/CountryFactory.php`

**Поля:**
```php
- id
- name (string)
- code (string, unique) // ISO код страны
- flag (string, nullable) // URL или путь к флагу
- description (text, nullable)
- selling_points (json, nullable) // ["№1 по безопасности", "Низкая стоимость"]
- image (string, nullable)
- is_active (boolean, default true)
- timestamps
```

### 3. Модель University
**Файлы:**
- `database/migrations/XXXX_XX_XX_create_universities_table.php`
- `app/Models/University.php`
- `database/factories/UniversityFactory.php`

**Поля:**
```php
- id
- name (string)
- country_id (foreign key)
- description (text, nullable)
- logo (string, nullable)
- website (string, nullable)
- cost_min (decimal, nullable)
- cost_max (decimal, nullable)
- requirements (json, nullable) // {"ielts": 6.5, "gpa": 3.0}
- deadlines (json, nullable) // {"fall": "2024-01-15", "spring": "2024-09-01"}
- level (enum: bachelor, master, phd, all)
- is_active (boolean, default true)
- timestamps
```

### 4. Модель Program
**Файлы:**
- `database/migrations/XXXX_XX_XX_create_programs_table.php`
- `app/Models/Program.php`
- `database/factories/ProgramFactory.php`

**Поля:**
```php
- id
- name (string)
- university_id (foreign key)
- description (text, nullable)
- field_of_study (string) // "Computer Science", "Business", etc.
- is_top (boolean, default false)
- career_info (json, nullable) // информация о профессии
- is_active (boolean, default true)
- timestamps
```

### 5. Модель Manager
**Файлы:**
- `database/migrations/XXXX_XX_XX_create_managers_table.php`
- `app/Models/Manager.php`

**Поля:**
```php
- id
- user_id (foreign key на users, unique)
- specialization (string, nullable) // "USA", "UK", "General"
- workload (integer, default 0) // количество активных лидов
- max_workload (integer, default 50)
- status (enum: active, inactive) - default 'active'
- timestamps
```

### 6. Модель Application (заявки на поступление)
**Файлы:**
- `database/migrations/XXXX_XX_XX_create_applications_table.php`
- `app/Models/Application.php`

**Поля:**
```php
- id
- user_id (foreign key)
- university_id (foreign key, nullable)
- program_id (foreign key, nullable)
- status (enum: consultation, documents, submission, offer, visa, departure)
- timeline (json, nullable) // {"consultation": "2024-01-01", "documents": "2024-02-01"}
- notes (text, nullable)
- timestamps
```

### 7. Базовые API контроллеры
**Файлы:**
- `app/Http/Controllers/Api/CountryController.php`
- `app/Http/Controllers/Api/UniversityController.php`
- `app/Http/Controllers/Api/ProgramController.php`
- `routes/api.php` - добавить маршруты

**Маршруты:**
```php
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/countries/{id}', [CountryController::class, 'show']);
Route::get('/universities', [UniversityController::class, 'index']);
Route::get('/universities/{id}', [UniversityController::class, 'show']);
Route::get('/programs', [ProgramController::class, 'index']);
Route::get('/programs/{id}', [ProgramController::class, 'show']);
```

### 8. Filament ресурсы (базовые)
**Файлы:**
- `app/Filament/Resources/CountryResource.php`
- `app/Filament/Resources/UniversityResource.php`
- `app/Filament/Resources/ProgramResource.php`

**Функционал:**
- CRUD операции
- Загрузка изображений (для университетов - логотипы)
- Фильтры и поиск

### 9. Seeder для тестовых данных
**Файл:**
- `database/seeders/GetGrantSeeder.php`

**Что заполнить:**
- 5-10 стран
- 20-30 университетов
- 50+ программ
- 2-3 менеджера

---

## 📋 Чеклист для первого спринта

### День 1-2: База данных
- [ ] Создать все миграции
- [ ] Создать все модели с отношениями
- [ ] Запустить миграции
- [ ] Создать factories
- [ ] Создать seeder с тестовыми данными

### День 3-4: API
- [ ] Создать API контроллеры
- [ ] Настроить API маршруты
- [ ] Добавить фильтрацию для университетов/программ
- [ ] Протестировать API через Postman/Insomnia

### День 5-6: Filament
- [ ] Создать Filament ресурсы
- [ ] Настроить формы и таблицы
- [ ] Добавить загрузку файлов
- [ ] Протестировать CRUD операции

### День 7: Интеграция с фронтендом
- [ ] Подключить API к React компонентам
- [ ] Обновить страницы каталогов
- [ ] Добавить загрузку данных

---

## 🛠 Команды для работы

```bash
# Создание миграции
php artisan make:migration create_countries_table
php artisan make:migration add_fields_to_users_table

# Создание модели
php artisan make:model Country
php artisan make:model University

# Создание контроллера
php artisan make:controller Api/CountryController --api

# Создание Filament ресурса
php artisan make:filament-resource Country

# Запуск миграций
php artisan migrate

# Запуск сидера
php artisan db:seed --class=GetGrantSeeder

# Очистка кеша
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

---

## 📝 Важные заметки

1. **JSON поля** - использовать для гибких данных (requirements, deadlines, selling_points)
2. **Связи** - обязательно настроить `belongsTo`, `hasMany` в моделях
3. **Валидация** - добавить FormRequest для API
4. **Пагинация** - использовать `paginate()` для списков
5. **Индексы** - добавить индексы на часто используемые поля (country_id, university_id, status)

---

## 🎨 Для дизайнеров (параллельно)

1. Создать дизайн-систему (цвета, типографика, компоненты)
2. Сделать макеты для:
   - Каталог университетов (список + детальная)
   - Каталог стран (список + детальная)
   - Каталог программ (список + детальная)
   - Личный кабинет (профиль, заявки, таймлайн, чат)
   - Фильтры для каталогов
3. Адаптивные версии для мобильных устройств

