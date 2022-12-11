<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Events\Registered;

class Tmp_worker extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'store_id',
    ];
}
