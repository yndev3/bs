<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class UniqueCheckController
{

    public function __construct(private Product $product)
    {
    }

    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {

        $request->validate([
            'sku' => 'required|string', // 例として、skuが文字列であるというバリデーションを追加
        ]);

        $sku = $request->input('sku');

        try {
            $exists = $this->product->where('sku', $sku)->exists();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            // エラーハンドリング
            return response()->json([
                'message' => 'A network error has occurred. Please try again.',
            ], 500);
        }

        return response()->json([
            'exists' => $exists,
        ]);
    }
}