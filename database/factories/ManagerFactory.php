<?php

namespace Database\Factories;

use App\Models\Manager;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ManagerFactory extends Factory
{
    protected $model = Manager::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'specialization' => $this->faker->randomElement(['USA', 'UK', 'General']),
            'workload' => 0,
            'max_workload' => 50,
            'status' => 'active',
        ];
    }
}
