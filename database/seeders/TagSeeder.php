<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            'Écologie',
            'Climat',
            'Énergie',
            'Pollution',
            'Développement durable',
            'Recyclage',
            'Biodiversité',
            'Transition énergétique',
            'Zéro déchet',
            'Mobilité verte',
        ];

        foreach ($tags as $name) {
            Tag::create(['name' => $name]);
        }
    }
}
