<?php

namespace app\Http\Api;

use App\Mail\CreateBooking;
use App\Models\Booking;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Store;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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

        $alchemyBaseUrl = config('services.alchemy.base_url');
        $alchemyApiKey = config('services.alchemy.api_key');
        $response = Http::withHeaders([
            "accept" => "application/json"
        ])->get("$alchemyBaseUrl$alchemyApiKey/getNFTs", [
            "owner" => $user->address,
            "contractAddresses[]" => config("services.contract.contract_address"),
        ]);

        // todo エラーステータスを返す
        $tokenIds = [];
        if ($response->failed()) {
            echo "HTTPリクエストエラー: ".$response->status();
        } else {
            $data = $response->json();
            foreach ($data['ownedNfts'] as $nft) {
                $integerTokenId = hexdec($nft['id']['tokenId']);
                $tokenIds[] = $integerTokenId;
            }
        }

        $nftList = Product::query()
            ->whereIn('token_id', $tokenIds)
            ->get();

        return response()->json($nftList);
    }

    public function createBooking(Request $request): JsonResponse
    {
        try {
            // create booking
            $user = Auth::user();
            $name = $request->input('name');
            $email = $user->email ?? $request->input('email');
            $tg = $request->input('tg') ?? ''; // telegram
            $tokenId = $request->input('token_id'); // NFTのID
            $storeId = $request->input('store_id');

            // 店舗
            $store = Store::findOrFail($storeId);
            $dateThreshold = Carbon::now()->subDays(90);

            // fetch product by token_id with user
            $product = Product::query()
                ->where('token_id', $tokenId)
                ->firstOrFail();  // Productが見つからなかった場合のエラーハンドリング

            // 商品の取得した日付をどうやって保持するか
            $updatedAt = new Carbon($product->last_hold_at);
            if ($updatedAt->lt($dateThreshold)) {
                // 商品は所有から90日以上経過している必要がある
                return response()->json([
                    'error' => 'You need to have owned the NFT for more than 90 days in order to exchange it.'
                ], 403);
            }

            // create booking
            $booking = Booking::create([
                'booking_number' => Str::random(13),
                'name' => $name,
                'email' => $email,
                'tg' => $tg,
                'product_id' => $product->id,
                'store_id' => $store->id,
                'user_id' => $user->id
            ]);

            // 予約内容をメールで送信
            Mail::to($email)
                ->bcc(config('mail.from.address'))
                ->send(new CreateBooking($user, $store, $product, $name, $tg));

            return response()->json([
                'message' => 'Booking created successfully'
            ]);
        } catch (QueryException $e) { // QueryExceptionをキャッチ
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'Database error occurred while processing your request.',
            ], 500);
        } catch (\Exception $e) { // その他の例外
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'An unexpected error occurred while processing your request.',
            ], 500);
        }
    }

    public function fetchBooking(): JsonResponse
    {
        $user = Auth::user();
        // get booking from booking table
        $bookings = Booking::with(['product', 'user', 'store'])
            ->where('user_id', $user->id)
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

    public function createPurchase(Request $request): JsonResponse
    {
        $user = Auth::user();
        $tokenId = $request->input('token_id');
        $buyer = $request->input('buyer');
        $price = $request->input('price');
        $transactionHash = $request->input('hash');

        $product = Product::firstWhere('token_id', $tokenId);
        if (!$product) {
            Log::info('Product not found');
            return response()->json([
                'error' => 'Product not found'
            ], 404);
        }

        try {
            // product status update
            $product->update([
                'is_sale' => 2,
            ]);

            $purchase = Purchase::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'buyer' => $buyer,
                'price' => $price,
                'transaction_hash' => $transactionHash
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'Failed to create purchase'
            ], 500);
        }

        return response()->json([
            'purchase' => $purchase,
            'message' => 'purchase created successfully'
        ]);

    }

    public function fetchPurchase(): JsonResponse
    {
        $user = Auth::user();
        $purchases = Purchase::with(['product', 'user'])
            ->where('user_id', $user->id)
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
