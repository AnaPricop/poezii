<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Apelează seeder-ul nostru pentru poezii
        $this->call([
            PoemSeeder::class,
            // Aici poți adăuga și alți seederi, ex: CommentSeeder::class
        ]);
    }
}
