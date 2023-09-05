<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countryIds = DB::table('countries')->pluck('id')->toArray(); // countriesテーブルから全ての'id'を取得

        foreach(range(1, 50) as $index) { // 50レコード作成しますが、必要な数に変更できます。
            DB::table('stores')->insert([
                'name' => 'Store ' . $index,
                'street_address' => Str::random(10),
                'city' => Str::random(10),
                'state' => Str::random(2),
                'zip_code' => mt_rand(10000, 99999),
                'country_id' => $countryIds[array_rand($countryIds)], // ランダムなcountry_idを設定
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
