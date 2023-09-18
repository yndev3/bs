<?php

namespace app\Http\Api;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class TransferController
{
    public function __construct()
    {
    }

    public function __invoke(Request $request): void
    {
        $hex_string = substr($request->input('event.activity.0.erc721TokenId'), 2);

        $hex_string_cleaned = str_replace("0x", "", $hex_string);
        $token_id = hexdec($hex_string_cleaned);
        $owner = $request->input('event.activity.0.toAddress');

        try {
            Product::query()
                ->where('token_id', $token_id)
                ->update([
                    'owner_address' => $owner,
                    'transfer_at' => Carbon::now(),
                ]);
        } catch (\Exception $e) {
            Log::debug($request->all());
            Log::error($e->getMessage());
        }
    }

}
