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
