<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Stores extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'adress',
        'email',
        'tel',
    ];

    public function getUser()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function getStoreProducts()
    {
        return $this->hasMany(StoreProducts::class,'store_products_id');
    }

    public function getPhotos()
    {
        return $this->morphMany(Photos::class, 'imageable');
    }
}
