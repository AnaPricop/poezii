<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Poem;

class PoemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Poem::query()->delete();
        User::query()->delete();

        $this->command->info('Se creează utilizatorii de test...');

        $mainUser = User::factory()->create([
            'name' => 'Ana Pricop',
            'email' => 'ana.pricop@exemplu.com',
            'password' => bcrypt('123123123'),
        ]);

        $otherUsers = User::factory(4)->create();

        $allUsers = $otherUsers->push($mainUser);

        $this->command->info('Utilizatorii au fost creați. Se generează poeziile...');

        Poem::factory(30)->create([
            'user_id' => $mainUser->id,
        ]);

        foreach ($otherUsers as $user) {
            Poem::factory(rand(3, 4))->create([
                'user_id' => $user->id,
            ]);
        }

        $this->command->info('Poeziile au fost generate. Se adaugă like-uri...');

        $poems = Poem::all();

        foreach ($poems as $poem) {
            $usersWhoLiked = $allUsers->random(rand(0, $allUsers->count()));

            foreach ($usersWhoLiked as $user) {
                // Adăugăm like-ul în baza de date
                $poem->likes()->create([
                    'user_id' => $user->id
                ]);
            }
        }

        $this->command->info('Datele de test au fost generate cu succes!');
        $this->command->info('Poți folosi email-ul: ana.pricop@exemplu.com cu parola: parola123');
    }
}
