<?php

namespace App\Http\Api;

use App\Models\Product;
use Illuminate\Http\Request;

final class ItemController
{
    public function getProductByTokenId(Request $request): \Illuminate\Http\JsonResponse
    {
        $product = Product::where('token_id', $request->token_id)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $options = match ($product->category) {
             'Watch' => $product->watchOptions->toArray(),
             'Material' => $product->materialOptions->toArray(),
             'Jewelry' => $product->jewelryOptions->toArray(),
             default =>  [],
         };

        $product = $product->toArray();
        $product['option'] = $options;

        return response()->json($product);
    }
}
