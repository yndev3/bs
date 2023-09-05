<?php

namespace App\Http\Api;

use App\Models\Store;
use Illuminate\Http\Request;

final class StoreController
{
    public function __construct(readonly Store $store)
    {
    }

    // fetchStores
    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $stores = $this->store->with('country')->get();

        return response()->json($stores);
    }

}
