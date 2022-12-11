<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tmp_store extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'adress',
        'email',
        'tel',
        'user_id',
    ];

    public function getUser()
    {
        return $this->belongsTo(User::class,'user_id');
    }

}
