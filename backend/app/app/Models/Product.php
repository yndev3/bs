<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use function PHPUnit\Framework\matches;

class Product extends Model
{
    use HasFactory;

    /**
     * 複数代入不可能な属性
     *
     * @var array
     */
    protected $guarded = [];


    public function watchOptions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(WatchOption::class);
    }

    public function materialOptions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(MaterialOption::class);
    }

    public function jewelryOptions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(JewelryOption::class);
    }

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function productCreate($tokenId, $metaData)
    {
        $product = $this->create([
            'token_id' => $tokenId,
            'name' => $metaData->name,
            'description' => $metaData->description,
            'image' => $metaData->image,
            'image_list' => $metaData->imageList,
            'category' => $metaData->category,
            'sku' => $metaData->sku,
            'brand' => $metaData->option->brand,
            'color' => $metaData->color,
            'material' => $metaData->material,
            'size' => $metaData->size,
            'accessories' => $metaData->accessories,
            'is_sale' => true,
            'note' => $metaData->note,
            'price' => 10,
        ]);

        $option = match ($product->category) {
            'Watch' => new WatchOption(),
            'Jewelry' => new JewelryOption(),
            'Material' => new MaterialOption(),
            default => throw new \Exception('Invalid category'),
        };

        $option->optionSave($product->id, $metaData->option);

        return $product;
    }

    protected function option(): Attribute
    {
        return Attribute::make(
            get: function () {
                match ($this->category) {
                    'Watch' => $this->watchOptions,
                    'Jewelry' => $this->jewelryOptions,
                    'Material' => $this->materialOptions,
                    default => throw new \Exception('Invalid category'),
                };
            }
        );
    }
}
