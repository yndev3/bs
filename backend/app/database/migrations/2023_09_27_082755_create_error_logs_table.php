<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('error_logs', function (Blueprint $table) {
            $table->id();
            $table->string('user_address')->nullable();  // ユーザーアドレス（必須でなければnullable）
            $table->string('level')->default('warning');  // ログレベル
            $table->text('message');  // エラーメッセージ
            $table->text('stack');  // スタックトレース
            $table->text('additional_info')->nullable();  // 追加情報（必須でなければnullable）
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('error_logs');
    }
};
