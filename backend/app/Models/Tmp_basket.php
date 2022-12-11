<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tmp_basket extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'product_id',
        'price',
        'stock',
    ];
    public function getPhotos()
    {
        return $this->morphMany(Photos::class, 'imageable')->orderBy("type","asc");
    }
}
