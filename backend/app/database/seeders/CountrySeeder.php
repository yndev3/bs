<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 任意の国名を挿入できます
        $countries = ['Japan', 'United States', 'Canada', 'United Kingdom', 'Australia'];

        foreach ($countries as $country) {
            DB::table('countries')->insert([
                'name' => $country,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
