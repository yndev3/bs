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
        Schema::create('watch_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->string('movement');
            $table->enum('gender', ['Men', 'Women', 'Unisex']);
            $table->string('features');
            $table->string('edition');
            $table->string('water_proof');
            $table->string('seral_number');
            $table->enum('state', [
                'N',
                'S',
                'A',
                'AB',
                'B',
                'BC',
                'C'
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watch_options');
    }
};
