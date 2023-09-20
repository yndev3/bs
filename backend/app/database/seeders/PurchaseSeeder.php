<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class PurchaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $preset_addresses = [
            '0xD38Eb334caC02650c1Dc01f6f98b78dbdFAC7A67',
            // 他のプリセットアドレス
            '0xF5255246E7BDEBA1CfAE3710Fd0d0a0e6f6FE3AC',
        ];
        $users = User::whereIn('address', $preset_addresses)->get();
        $products = Product::limit(100)->get();

        foreach ($users as $user) {
            foreach ($products as $product) {
                Purchase::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'buyer' => $user->address,
                    'price' =>  $product->price,
                    // random string
                    'transaction_hash' => Str::random(32),
                ]);
            }
        }
    }
}
