<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainCategories extends Model
{
    use HasFactory;
    protected $fillable = ['name'];


    public function getProduct()
    {
        return $this->hasMany(Products::class,'products_id');
    }
}

