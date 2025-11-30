# 💡 Примеры кода для быстрого старта

## 1. Пример миграции для Country

```php
<?php
// database/migrations/XXXX_XX_XX_create_countries_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 3)->unique(); // ISO код (USA, GBR, etc.)
            $table->string('flag')->nullable(); // URL или путь к изображению
            $table->text('description')->nullable();
            $table->json('selling_points')->nullable(); // ["№1 по безопасности", "Низкая стоимость"]
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
```

## 2. Пример модели Country

```php
<?php
// app/Models/Country.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'flag',
        'description',
        'selling_points',
        'image',
        'is_active',
    ];

    protected $casts = [
        'selling_points' => 'array',
        'is_active' => 'boolean',
    ];

    // Связь с университетами
    public function universities()
    {
        return $this->hasMany(University::class);
    }
}
```

## 3. Пример API контроллера

```php
<?php
// app/Http/Controllers/Api/CountryController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Country::query()->where('is_active', true);

        // Поиск
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $countries = $query->paginate(20);

        return response()->json($countries);
    }

    public function show(int $id): JsonResponse
    {
        $country = Country::with('universities')->findOrFail($id);

        return response()->json($country);
    }
}
```

## 4. Пример Filament ресурса

```php
<?php
// app/Filament/Resources/CountryResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\CountryResource\Pages;
use App\Models\Country;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CountryResource extends Resource
{
    protected static ?string $model = Country::class;
    protected static ?string $navigationIcon = 'heroicon-o-globe-alt';
    protected static ?string $navigationLabel = 'Страны';
    protected static ?string $modelLabel = 'Страна';
    protected static ?string $pluralModelLabel = 'Страны';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->label('Название'),
                Forms\Components\TextInput::make('code')
                    ->required()
                    ->maxLength(3)
                    ->label('Код (ISO)'),
                Forms\Components\Textarea::make('description')
                    ->label('Описание'),
                Forms\Components\Repeater::make('selling_points')
                    ->schema([
                        Forms\Components\TextInput::make('point')
                            ->label('Преимущество'),
                    ])
                    ->label('Преимущества'),
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->label('Изображение'),
                Forms\Components\Toggle::make('is_active')
                    ->default(true)
                    ->label('Активна'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->label('Название'),
                Tables\Columns\TextColumn::make('code')
                    ->label('Код'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->label('Активна'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->label('Создано'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Активность'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCountries::route('/'),
            'create' => Pages\CreateCountry::route('/create'),
            'edit' => Pages\EditCountry::route('/{record}/edit'),
        ];
    }
}
```

## 5. Пример Factory для тестовых данных

```php
<?php
// database/factories/CountryFactory.php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountryFactory extends Factory
{
    protected $model = Country::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->country(),
            'code' => $this->faker->unique()->countryCode(),
            'description' => $this->faker->paragraph(),
            'selling_points' => [
                $this->faker->sentence(),
                $this->faker->sentence(),
            ],
            'is_active' => true,
        ];
    }
}
```

## 6. Пример Seeder

```php
<?php
// database/seeders/GetGrantSeeder.php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\University;
use App\Models\Program;
use App\Models\User;
use Illuminate\Database\Seeder;

class GetGrantSeeder extends Seeder
{
    public function run(): void
    {
        // Создаем страны
        $usa = Country::create([
            'name' => 'США',
            'code' => 'USA',
            'description' => 'Соединенные Штаты Америки',
            'selling_points' => ['№1 по качеству образования', 'Большой выбор университетов'],
            'is_active' => true,
        ]);

        $uk = Country::create([
            'name' => 'Великобритания',
            'code' => 'GBR',
            'description' => 'Соединенное Королевство',
            'selling_points' => ['Престижные университеты', 'Короткие программы'],
            'is_active' => true,
        ]);

        // Создаем университеты
        $harvard = University::create([
            'name' => 'Harvard University',
            'country_id' => $usa->id,
            'description' => 'Один из самых престижных университетов мира',
            'cost_min' => 50000,
            'cost_max' => 70000,
            'requirements' => [
                'ielts' => 7.0,
                'gpa' => 3.8,
            ],
            'deadlines' => [
                'fall' => '2024-01-01',
                'spring' => '2024-09-01',
            ],
            'level' => 'all',
            'is_active' => true,
        ]);

        // Создаем программы
        Program::create([
            'name' => 'Computer Science',
            'university_id' => $harvard->id,
            'field_of_study' => 'Computer Science',
            'description' => 'Программа по компьютерным наукам',
            'is_top' => true,
            'career_info' => [
                'average_salary' => 120000,
                'job_market' => 'excellent',
            ],
            'is_active' => true,
        ]);
    }
}
```

## 7. Пример React компонента для каталога

```tsx
// resources/js/components/CountryCard.tsx

import React from 'react';

interface Country {
    id: number;
    name: string;
    code: string;
    description: string;
    selling_points: string[];
    image?: string;
}

interface CountryCardProps {
    country: Country;
    onClick?: () => void;
}

export default function CountryCard({ country, onClick }: CountryCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
        >
            <h3 className="text-xl font-bold mb-2">{country.name}</h3>
            <p className="text-gray-600 mb-4">{country.description}</p>
            {country.selling_points && (
                <ul className="list-disc list-inside space-y-1">
                    {country.selling_points.map((point, index) => (
                        <li key={index} className="text-sm text-gray-500">
                            {point}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

## 8. Пример использования API в React

```tsx
// resources/js/pages/CountriesPage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';

export default function CountriesPage() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/countries')
            .then((response) => {
                setCountries(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-8">Загрузка...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Каталог стран</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countries.map((country) => (
                    <CountryCard key={country.id} country={country} />
                ))}
            </div>
        </div>
    );
}
```

## 9. Пример расширения модели User

```php
<?php
// database/migrations/XXXX_XX_XX_add_fields_to_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->timestamp('phone_verified_at')->nullable()->after('phone');
            $table->enum('role', ['student', 'parent', 'manager', 'admin'])->default('student')->after('phone_verified_at');
            $table->enum('profile_type', ['student', 'parent'])->nullable()->after('role');
            $table->foreignId('manager_id')->nullable()->after('profile_type')->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['manager_id']);
            $table->dropColumn(['phone', 'phone_verified_at', 'role', 'profile_type', 'manager_id']);
        });
    }
};
```

## 10. Пример автоматического назначения менеджера

```php
<?php
// app/Actions/Fortify/CreateNewUser.php (или в FortifyServiceProvider)

use App\Models\User;
use App\Models\Manager;
use Illuminate\Support\Facades\DB;

// В методе создания пользователя после регистрации:

$user = User::create([...]);

// Автоматическое назначение менеджера
if ($user->role === 'student' || $user->role === 'parent') {
    $manager = Manager::where('status', 'active')
        ->orderBy('workload', 'asc')
        ->first();
    
    if ($manager && $manager->workload < $manager->max_workload) {
        $user->update(['manager_id' => $manager->user_id]);
        $manager->increment('workload');
    }
}
```

---

## 📝 Полезные команды

```bash
# Создать все сразу
php artisan make:model Country -m -f
# -m = migration
# -f = factory

# Создать контроллер с ресурсами
php artisan make:controller Api/CountryController --api --resource

# Создать Filament ресурс со всеми файлами
php artisan make:filament-resource Country --generate

# Очистить все кеши
php artisan optimize:clear
```

