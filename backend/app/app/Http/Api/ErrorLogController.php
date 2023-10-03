<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\ErrorLog;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

final class ErrorLogController
{
    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        // リクエストのバリデーション
        $data = $request->validate([
            'level' => 'nullable|string',
            'message' => 'required|string',
            'stack' => 'required|string',
            'additional_info' => 'nullable|array'
        ]);
        $user = Auth::user();

        try {
            // DB保存処理
            ErrorLog::create([
                'user_address' => $user->address ?? null,
                'level' => $data['level'] ?? 'warning',
                'message' => $data['message'],
                'stack' => $data['stack'],
                'additional_info' => $data['additional_info'] ? json_encode($data['additional_info']) : null
            ]);
            return response()->json(['message' => 'Error logged successfully'], 200);

        } catch (QueryException $e) {  // データベースエラーをキャッチ
            // エラーログに出力
            Log::error(__FILE__.':'. __LINE__.'=>'.'Failed to save error log:', ['error' => $e->getMessage()]);

            // フロントエンドにエラーメッセージを返す
            return response()->json(['message' => 'Failed to log error'], 500);
        } catch (\Exception $e) {  // その他の例外をキャッチ
            // エラーログに出力
            Log::error(__FILE__.':'. __LINE__.'=>'.'An unexpected error occurred:', ['error' => $e->getMessage()]);

            // フロントエンドにエラーメッセージを返す
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }
}