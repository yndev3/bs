<?php

namespace app\Http\Api;

use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

final class PurchaseController
{
    public function __construct()
    {
    }

    public function fetchPurchase(): JsonResponse
    {
        // fetch all purchases from database sorted by created_at desc
        $purchases = Purchase::query()
            ->with(['product'])
            ->orderBy('id', 'desc')
            ->get();

        if (!$purchases) {
            Log::info('purchases not found');
            return response()->json([
                'error' => 'purchases not found'
            ], 404);
        }

        return response()->json($purchases);
    }
}
