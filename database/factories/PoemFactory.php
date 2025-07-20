<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Poem>
 */
class PoemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // user_id va fi setat în seeder
            'title' => fake()->sentence(rand(3, 8)),
            'subtitle' => rand(0, 1) ? fake()->sentence(rand(5, 12)) : null,
            'type' => fake()->randomElement(['poezie', 'proză', 'eseu', 'citate', 'personale']),
            'content' => implode("\n\n", fake()->paragraphs(rand(3, 10))), // Paragrafe separate de o linie goală
            'views' => fake()->numberBetween(0, 25000),
            'created_at' => fake()->dateTimeBetween('-3 years', 'now'),
            'updated_at' => fn (array $attributes) => fake()->dateTimeBetween($attributes['created_at'], 'now'),
        ];
    }
}
