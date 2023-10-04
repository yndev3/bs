<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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


    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope('is_sale', function ($query) {
            $query->whereIn('is_sale', [1, 2]);
        });
        static::addGlobalScope('is_burn', function ($query) {
            $query->where('is_burn', false);
        });

    }

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
        return $this->belongsToMany(User::class, 'user_product');
    }

    /**
     * @throws \Exception
     */
    public function productCreate($owner, $tokenId, $metaData, $metaUrl)
    {
        $product = $this->create([
            'token_id' => $tokenId,
            'name' => $metaData->name,
            'owner_address' => $owner,
            'transfer_at' => now(),
            'meta_url' => $metaUrl,
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
            'is_sale' => 1,
            'note' => $metaData->note,
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

    public function scopeCategory(Builder $query, $category = null)
    {
        if (!is_null($category)) {
            return $query->where('category', $category);
        }
        return $query;
    }

    public function scopeBrand(Builder $query, $brand = null)
    {
        if (!is_null($brand)) {
            return $query->where('brand', $brand);
        }
        return $query;
    }
}
