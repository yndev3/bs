<?php

namespace app\Http\Api;

use App\Models\Booking;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class AdminController
{
    public function __construct()
    {
    }

    public function items(Request $request): JsonResponse
    {
        $sortKey = $request->get('sortKey', 'id');
        $sortOrder = $request->get('sortOrder', 'asc');
        $category = $request->get('category');
        $brand = $request->get('brand');
        $pageSize = $request->get('pageSize', 1000);

        $products = Product::withoutGlobalScopes()
            ->when($category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->when($brand, function ($query, $brand) {
                return $query->where('brand', $brand);
            })
            ->orderBy($sortKey, $sortOrder)
            ->paginate($pageSize);

        return response()->json($products);
    }


    public function getProductByTokenId(Request $request, string $tokenId): JsonResponse
    {
        $product = Product::withoutGlobalScopes()
            ->where('token_id', $tokenId)->first();

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

    public function setSaleStatus(Request $request, string $tokenId): JsonResponse
    {
        $product = Product::withoutGlobalScopes()
            ->where('token_id', $tokenId)
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // update product
        $product->update([
            'price' => $request->input('price'),
            'is_sale' =>(int)$request->input('saleStatus')
        ]);

        return response()->json($product);
    }

    public function setBurn(Request $request, string $tokenId): JsonResponse
    {
        $product = Product::withoutGlobalScopes()
            ->where('token_id', $tokenId)
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // update product
        $product->update([
            'is_burn' => $request->input('is_burn'),
        ]);

        return response()->json($product);
    }


    public function fetchBooking(): JsonResponse
    {
        // get booking from booking table
        $bookings = Booking::with(['product', 'user', 'store'])
            ->orderBy('id', 'desc')
            ->get();

        if (!$bookings) {
            Log::info('bookings not found');
            return response()->json([
                'error' => 'bookings not found'
            ], 404);
        }

        return response()->json($bookings);

    }
}
