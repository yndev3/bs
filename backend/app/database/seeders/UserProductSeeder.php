<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // 既存のユーザーIDと商品IDを取得
        $userIds = DB::table('users')->pluck('id')->toArray();
        $productIds = DB::table('products')->pluck('id')->toArray();

        // 特定のユーザーに特定の商品を紐づける（例：ユーザーID 1, 2に商品ID 1, 2を紐づける）
        $preset_relations = [
            'user_id' => [1, 2],
            'product_id' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ];

        foreach ($preset_relations['user_id'] as $preset_user_id) {
            foreach ($preset_relations['product_id'] as $preset_product_id) {
                DB::table('user_product')->insert([
                    'user_id' => $preset_user_id,
                    'product_id' => $preset_product_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // それ以外のユーザーにランダムな商品を紐づける
        foreach ($userIds as $userId) {
            if (in_array($userId, $preset_relations['user_id'])) {
                continue;
            }

            $numProductsForThisUser = rand(1, 3);

            for ($i = 0; $i < $numProductsForThisUser; $i++) {
                $productId = $productIds[array_rand($productIds)];

                DB::table('user_product')->insert([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
