<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'main_category_id',
    ];

    public function getCategory()
    {
        return $this->belongsTo(MainCategories::class, 'main_category_id','id');
    }

    public function getStoreProducts()
    {
        return $this->hasMany(StroreProducts::class,'store_products_id');
    }


}


