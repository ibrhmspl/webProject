<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photos extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'type',
        'imageable_type',
        'imageable_id'
    ];

    public function imageable()
    {
        return $this->morphTo();
    }

    public function getProduct()
    {
        return $this->hasMany(StroreProducts::class,'store_products_id');
    }

    public function getStores()
    {
        return $this->belongsTo(Stores::class, 'stores_id');
    }
}
