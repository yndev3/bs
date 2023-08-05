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
            $table->string('name');
            $table->string('description');
            $table->string('image');
            $table->integer('price')->unsigned();
            $table->string('sku')->unique();
            $table->enum('categories', ['Watches', 'Jewelries', 'Materials']);
            $table->string('brand');
            $table->string('color');
            $table->string('material');
            $table->string('size');
            $table->string('accessories');
            $table->boolean('is_sale')->default(false);
            $table->text('note');
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
