<?php

namespace app\Http\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class UserController
{
    public function __construct()
    {
    }

    public function fetchUserNFTList(): \Illuminate\Http\JsonResponse
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
}
