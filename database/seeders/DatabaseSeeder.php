<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Models\Role;
use App\Models\User;
use App\Models\Tag;


class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // $this->call([
        //     RoleSeeder::class, // <-- continue à l'utiliser ici
        // ]);

        // // Insérer un utilisateur de test
        // DB::table('users')->updateOrInsert([
        //     'email' => 'test@example.com'
        // ], [
        //     'name' => 'Test User',
        //     'password' => bcrypt('password'),
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        // ]);

        // // Attache plusieurs rôles (par exemple admin et auteur)
        // $rolesToAttach = Role::whereIn('name', ['admin', 'auteur'])->get();
        // $user->roles()->sync($rolesToAttach->pluck('id'));

        $this->call([
            TagSeeder::class,
        ]);
    }

}
