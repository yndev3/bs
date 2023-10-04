<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productIds = DB::table('products')->limit(10)->pluck('id')->toArray();
        $storeIds = DB::table('stores')->limit(10)->pluck('id')->toArray();

        if (empty($productIds) || empty($storeIds)) {
            $this->command->info('Products or Stores table is empty. Skipping Bookings seeding.');
            return;
        }

        for ($i = 0; $i < 10; $i++) {  // 10回ループして10件のサンプルデータを作成します
            DB::table('bookings')->insert([
                'booking_number' => Str::random(13),
                'name' => Str::random(10),
                'email' => Str::random(10) . '@example.com',
                'tg' => '@'.Str::random(10),
                'user_id' => 1,
                'product_id' => $productIds[array_rand($productIds)],
                'store_id' => $storeIds[array_rand($storeIds)],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
