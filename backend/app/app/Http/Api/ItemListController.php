<?php

namespace App\Http\Api;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
final class ItemListController
{
    const PAGE_SIZE = 10;

    public function __construct(private readonly Product $product)
    {
    }

    public function items(Request $request)
    {
        $sortKey = $request->get('sortKey', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $category = $request->get('category');
        $brand = $request->get('brand');

        $products = Product::withoutGlobalScopes()
            ->when($category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->when($brand, function ($query, $brand) {
                return $query->where('brand', $brand);
            })
            ->orderBy($sortKey, $sortOrder)
            ->paginate(self::PAGE_SIZE);

        return response()->json($products);
    }

    public function withPagination(Request $request): JsonResponse
    {
        $sortKey = $request->get('sortKey', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $category = $request->get('category');
        $brand = $request->get('brand');

        $products = $this->product
            ->category($category)
            ->brand($brand)
            ->orderBy($sortKey, $sortOrder)
            ->paginate(self::PAGE_SIZE);

        return response()->json($products);
    }

    public function withLimit(Request $request): JsonResponse
    {
        $sortKey = $request->get('sortKey', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $category = $request->get('category');
        $brand = $request->get('brand');
        $limit = $request->get('limit', self::PAGE_SIZE);


        $products = $this->product
            ->category($category)
            ->brand($brand)
            ->orderBy($sortKey, $sortOrder)
            ->limit($limit)
            ->get();
        return response()->json($products);
    }
}
