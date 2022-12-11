<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreProducts extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'product_id',
        'price',
        'stock'
    ];

    public function getStores()
    {
        return $this->belongsTo(Stores::class, 'stores_id');
    }

    public function getProducts()
    {
        return $this->belongsTo(Products::class, 'products_id');
    }
    public function getPhotos()
    {
        return $this->morphMany(Photos::class, 'imageable')->orderBy("type","asc");
    }
}
