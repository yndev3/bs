<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemListController extends Controller
{
    const PAGE_SIZE = 10;

    public function __construct(private readonly Product $product)
    {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $sortKey = $request->get('sortKey', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $category = $request->get('category');
        $brand = $request->get('brand');

        $products = $this->product
            ->category($category)
            ->brand($brand)
            ->orderBy($sortKey, $sortOrder)
            ->paginate($this::PAGE_SIZE);

        return response()->json($products);
    }
}
