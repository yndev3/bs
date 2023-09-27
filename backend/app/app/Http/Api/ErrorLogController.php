<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\ErrorLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class ErrorLogController
{
    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();

        // エラーメッセージや他の情報を取得
        $errorData = $request->get('error');

        ErrorLog::create([
            'user_address' => $user->address ?? null, // ユーザーのアドレス（存在しなければnull）
            'error_message' => $errorData  // エラー内容
        ]);

        return response()->json(['message' => 'Error logged successfully'], 200);
    }
}