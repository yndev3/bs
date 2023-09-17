<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\WatchOption;
use App\Models\JewelryOption;
use App\Models\MaterialOption;
use Faker\Factory as Faker;
class ProductSeeder extends Seeder
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

        for ($i = 0; $i < 1000; $i++) {
            $product = Product::create([
                'token_id' => $i + 1,
                'owner_address' => strtolower($preset_addresses[array_rand($preset_addresses)]),
                'transfer_at' => now(),
                'meta_url' => $faker->url,
                'name' => $faker->word,
                'description' => $faker->sentence,
                'image' => $faker->imageUrl(),
                'image_list' => json_encode([$faker->imageUrl(), $faker->imageUrl()]),
                'price' => $faker->numberBetween(100, 10000),
                'sku' => 'SKU' . str_pad($i + 1, 5, '0', STR_PAD_LEFT),
                'category' => $faker->randomElement(['Watch', 'Jewelry', 'Material']),
                'brand' => $faker->company,
                'color' => $faker->colorName,
                'material' => $faker->randomElement(['Metal', 'Leather', 'Plastic']),
                'size' => $faker->randomElement(['Small', 'Medium', 'Large']),
                'accessories' => $faker->word,
                'is_sale' => 1,
                'is_burn' => false,
                'note' => $faker->text(50)
            ]);

            // Watch, Jewelry, or Materialデータの生成
            switch ($product->category) {
                case 'Watch':
                    WatchOption::create([
                        'product_id' => $product->id,
                        'movement' => $faker->randomElement(['Automatic', 'Quartz', 'Mechanical']),
                        'gender' => $faker->randomElement(['Men', 'Women', 'Unisex']),
                        'features' => $faker->word,
                        'edition' => $faker->word,
                        'water_proof' => $faker->randomElement(['30m', '50m', '100m']),
                        'serial_number' => 'SN' . str_pad($i + 1, 5, '0', STR_PAD_LEFT),
                        'state' => $faker->randomElement(['N', 'S', 'A', 'AB', 'B', 'BC', 'C'])
                    ]);
                    break;

                case 'Jewelry':
                    JewelryOption::create([
                        'product_id' => $product->id,
                        'gender' => $faker->randomElement(['Men', 'Women', 'Unisex']),
                        'state' => $faker->randomElement(['N', 'S', 'A', 'AB', 'B', 'BC', 'C']),
                        'weight' => $faker->randomFloat(2, 1, 50) . 'g'
                    ]);
                    break;

                case 'Material':
                    MaterialOption::create([
                        'product_id' => $product->id,
                        'weight' => $faker->randomFloat(2, 1, 100) . 'g',
                        'serial_number' => 'SN' . str_pad($i + 1, 5, '0', STR_PAD_LEFT)
                    ]);
                    break;
            }
        }
    }
}
