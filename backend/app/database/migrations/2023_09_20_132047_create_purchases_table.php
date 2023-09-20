<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();

            // relationship with users table
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');
            // relationship with products table
            $table->foreignId('product_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('buyer');
            $table->string('price');
            $table->string('transaction_hash');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
