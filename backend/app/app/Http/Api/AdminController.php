<?php

namespace app\Http\Api;

use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

final class AdminController
{
    public function __construct()
    {
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
