<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('countries')->truncate();

        $countries = [
            [
                'name' => 'United States',
                'code' => 'US',
                'description' => 'Flexible higher education system with a wide range of universities and majors. Strong focus on research and practical experience.',
                'selling_points' => json_encode([
                    'Bachelor: 4 years, Master: 1–2 years',
                    'Strong research ecosystem',
                    'Internships and capstone projects',
                    'Top global university rankings',
                ]),
                'image' => 'countries/us.jpg',
                'is_active' => true,
            ],
            [
                'name' => 'United Kingdom',
                'code' => 'GB',
                'description' => 'Structured education system with early specialization and globally respected degrees.',
                'selling_points' => json_encode([
                    'Bachelor: 3 years (4 in Scotland)',
                    'Master: 1 year',
                    'Early specialization',
                    'Russell Group universities',
                ]),
                'image' => 'countries/gb.jpg',
                'is_active' => true,
            ],
            // добавляем остальные страны по аналогии...
        ];

        foreach ($countries as &$country) {
            $country['flag'] = 'https://flagcdn.com/w40/' . strtolower($country['code']) . '.png';
        }

        DB::table('countries')->insert($countries);
    }
}
