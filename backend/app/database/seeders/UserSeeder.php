<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // 事前に指定したいウォレットアドレスの配列
        $preset_addresses = [
            '0xD38Eb334caC02650c1Dc01f6f98b78dbdFAC7A67',
            // 他のプリセットアドレス
            '0xF5255246E7BDEBA1CfAE3710Fd0d0a0e6f6FE3AC',
        ];

        // プリセットのアドレスを挿入
        foreach ($preset_addresses as $address) {
            DB::table('users')->insert([
                'address' => strtolower($address),
                'remember_token' => null,  // プリセットの場合はnull
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // ランダムに生成するレコード数（この場合は10件）
        $num_random_records = 10;

        // ランダムなアドレスを挿入
        for ($i = 0; $i < $num_random_records; $i++) {
            $address = '0x' . Str::random(40);
            $remember_token = Str::random(10);

            DB::table('users')->insert([
                'address' => strtolower($address),
                'remember_token' => $remember_token,
                'role' => 'user',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
