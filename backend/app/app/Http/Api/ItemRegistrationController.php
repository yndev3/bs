<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\Product;

class ItemRegistrationController
{

    public function __construct(private Product $product)
    {
        /**
         * todo DB作成
         * todo マイグレーション作成
         * todo モデル作成
         *
         * */

    }

    public function index(): \Illuminate\Http\JsonResponse
    {
        $this->product->save();

        return response()->json([
            'message' => 'Hello World!'
        ]);
    }
}