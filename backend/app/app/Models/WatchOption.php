<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchOption extends Model
{
    use HasFactory;

    /**
     * 複数代入不可能な属性
     *
     * @var array
     */
    protected $guarded = [];

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function optionSave($productId, $options)
    {
        return $this->create([
            'product_id' => $productId,
            'movement' => $options->movement,
            'gender' => $options->gender,
            'features' => $options->features,
            'edition' => $options->edition,
            'water_proof' => $options->waterproof,
            'serial_number' => $options->serialNumber,
            'state' => $options->state,
        ]);
    }
}
