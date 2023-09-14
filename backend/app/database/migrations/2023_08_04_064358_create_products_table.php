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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('token_id')
                ->index()
                ->unsigned();
            $table->string('owner_address')
                ->index();
            $table->timestamp('last_hold_at'); // 最終所有日時
            $table->string('name');
            $table->string('description');
            $table->string('image');
            $table->json('image_list');
            $table->integer('price')->unsigned();
            $table->string('sku')->unique();
            $table->enum('category', ['Watch', 'Jewelry', 'Material']);
            $table->string('brand')->index();
            $table->string('color')->nullable();
            $table->string('material')->nullable();
            $table->string('size')->nullable();
            $table->string('accessories')->nullable();
            $table->tinyInteger('is_sale')->default(0); // 0:販売停止 1:発売中、2:販売済み
            $table->boolean('is_burn')->default(false);
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
