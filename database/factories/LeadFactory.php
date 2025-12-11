<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\User;
use App\Models\Manager;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    protected $model = Lead::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'manager_id' => Manager::factory(),
            'status' => $this->faker->randomElement(['new', 'contacted', 'consultation', 'closed']),
            'source' => $this->faker->word(),
            'notes' => $this->faker->sentence(),
        ];
    }
}
