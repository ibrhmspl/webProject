<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;


class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use Notifiable;
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'user_level',
	    'store_id',
    ];

    protected $hidden = [
        'password'
    ];

    public function getStore(){
        return $this->hasOne(Stores::class,'id' ,'store_id');
    }
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [
            'id' => $this->id,
            'name'=> $this->name,
            'email' => $this->email,
            'user_level'=>$this->user_level,
            'store_id'=>$this->store_id,
        ];
    }
}


