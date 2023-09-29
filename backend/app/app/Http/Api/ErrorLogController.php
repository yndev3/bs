<?php declare(strict_types=1);

namespace App\Http\Api;

use App\Models\ErrorLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
final class ErrorLogController
{
    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();

        // ユーザーとエラーメッセージが存在するか確認
        if ($user && $request->has('message')) {
            $errorData = $request->input('message');
            ErrorLog::create([
                'user_address' => $user->address ?? null,
                'error_message' => $errorData
            ]);

            return response()->json(['message' => 'Error logged successfully'], 200);
        }

        // エラーメッセージまたはユーザーが存在しない場合
        return response()->json(['message' => 'Could not log error'], 400);
    }
}