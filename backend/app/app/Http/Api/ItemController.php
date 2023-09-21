<?php

namespace App\Http\Api;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class ItemController
{
    public function getProducts(Request $request): JsonResponse
    {
        $sortKey = $request->get('sortKey', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $category = $request->get('category');
        $brand = $request->get('brand');
        $pageSize = $request->get('pageSize', 1000);
        $limit = $request->get('limit');

        // validate sort parameters
        $validSortKeys = $this->getValidSortKeys();
        $validSortOrders = ['asc', 'desc'];
        if (!in_array($sortKey, $validSortKeys) || !in_array($sortOrder, $validSortOrders)) {
            return response()->json(['error' => 'Invalid sort parameters.'], 400);
        }

        $products = Product::when($category, function ($query, $category) {
            return $query->where('category', $category);
        })
            ->when($brand, function ($query, $brand) {
                return $query->where('brand', $brand);
            })
            ->orderBy($sortKey, $sortOrder);

        if ($limit) {
            $products = $products->limit($limit)->get();
        } else {
            $products = $products->paginate($pageSize);
        }

        return response()->json($products);
    }

    private function getValidSortKeys(): array
    {
        return [
            'id',
            'name',
            'price',
            'transfer_at',
            'created_at',
            'sku',
            'category',
            'brand',
            'is_sale',
            'is_burn',
        ];
    }

    public function getProductByTokenId(Request $request): JsonResponse
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
