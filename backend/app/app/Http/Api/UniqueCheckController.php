<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\Product;
use Illuminate\Http\Request;

final class UniqueCheckController
{

    public function __construct(private Product $product)
    {
    }

    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $sku = $request->input('sku');
        $exists = $this->product->where('sku', $sku)->exists();

        return response()->json([
            'exists' => $exists,
        ]);
    }
}