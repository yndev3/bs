<?php

namespace app\Http\Api;

use App\Mail\CreateBooking;
use App\Models\Product;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

final class UserController
{
    public function __construct()
    {
    }

    public function fetchUserNFTList(): JsonResponse
    {
        // 認証されているユーザーを取得
        $user = Auth::user();

        // ユーザーが認証されていない場合はnullを返すか、エラーメッセージを返す
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // 認証されているユーザーが所有している商品（NFT）のリストを取得
        $nftList = $user->products()->get();

        return response()->json($nftList);
    }

    public function createBooking(Request $request): JsonResponse
    {
        // create booking
        $user = Auth::user();
        $name = $request->input('name');
        $email = $user->email ?? $request->input('email');
        $tg = $request->input('tg') ?? '' ; // telegram
        $tokenId = $request->input('token_id'); // NFTのID
        $storeId = $request->input('store_id');
        // 店舗
        $store = Store::findOrFail($storeId);
        $dateThreshold = Carbon::now()->subDays(90);

        // fetch product by token_id with user
        $product = Product::query()
            ->where('token_id', $tokenId)
            ->first();
         // 商品の取得した日付をどうやって保持するか
        $updatedAt = new Carbon($product->last_hold_at);
        if ($updatedAt->lt($dateThreshold)) {
            // 商品は所有から30日以上経過している必要がある
            return response()->json([
                'error' => 'ou need to have owned the NFT for more than 90 days in order to exchange it.'
            ], 403);
        }

        // 予約内容をメールで送信
        Mail::to($email)
            ->cc($email)
            ->send(new CreateBooking($user, $store, $product, $name, $tg));

        return response()->json([
            'product' => $product,
            'message' => 'Booking created successfully'
        ]);
    }
}
