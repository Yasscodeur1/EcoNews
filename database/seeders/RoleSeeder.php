<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['user', 'admin', 'lecteur', 'auteur'];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role],
                ['created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
            );
        }
    }
}
