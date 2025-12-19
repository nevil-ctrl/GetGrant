<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CountryFactory extends Factory
{
    protected $model = \App\Models\Country::class;

    public function definition(): array
    {
        $code = strtolower($this->faker->unique()->lexify('??'));
        return [
            'name' => $this->faker->country(),
            'code' => strtoupper($code),
            'flag' => 'https://countryflagsapi.com/png/' . $code,
            'description' => $this->faker->paragraph(),
            'selling_points' => json_encode([
                $this->faker->sentence(),
                $this->faker->sentence()
            ]),
            'image' => 'https://picsum.photos/seed/' . $this->faker->unique()->numberBetween(1, 1000) . '/600/400',
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
