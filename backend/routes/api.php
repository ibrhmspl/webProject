<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', '\App\Http\Controllers\AuthController@login');
    Route::post('logout', '\App\Http\Controllers\AuthController@logout');
    Route::post('me', '\App\Http\Controllers\AuthController@me');
    Route::post('register', '\App\Http\Controllers\AuthController@register');

});
Route::get('user', [\App\Http\Controllers\AuthController::class, 'index']);

Route::get('main_category', [\App\Http\Controllers\MainCategoriesController::class, 'index']);
Route::post('main_category', [\App\Http\Controllers\MainCategoriesController::class, 'store']);
Route::put('main_category/{id}', [\App\Http\Controllers\MainCategoriesController::class, 'update']);
Route::delete('main_category/{id}', [\App\Http\Controllers\MainCategoriesController::class, 'destroy']);


Route::get('product', [\App\Http\Controllers\ProductsController::class, 'index']);
Route::post('product', [\App\Http\Controllers\ProductsController::class, 'store']);
Route::post('product_update/{id}', [\App\Http\Controllers\ProductsController::class, 'update']);
Route::delete('product/{id}', [\App\Http\Controllers\ProductsController::class, 'destroy']);

Route::get("store", [\App\Http\Controllers\StoresController::class, "index"]);
Route::post("store", [\App\Http\Controllers\StoresController::class,"store"]);
Route::put("store/{id}", [\App\Http\Controllers\StoresController::class, "update"]);
Route::delete("store/{id}", [\App\Http\Controllers\StoresController::class,"destroy"]);

Route::get("tmp_store", [\App\Http\Controllers\TmpStoreController::class, "index"]);
Route::post("tmp_store", [\App\Http\Controllers\TmpStoreController::class,"store"]);
Route::put("tmp_store/{id}", [\App\Http\Controllers\TmpStoreController::class,"update"]);
Route::delete("tmp_store/{id}", [\App\Http\Controllers\TmpStoreController::class,"destroy"]);

Route::get("store_product", [\App\Http\Controllers\StoreProductsController::class, "index"]);
Route::post("store_product", [\App\Http\Controllers\StoreProductsController::class,"store"]);
Route::put("store_product/{id}", [\App\Http\Controllers\StoreProductsController::class, "update"]);
Route::delete("store_product/{id}", [\App\Http\Controllers\StoreProductsController::class,"destroy"]);

Route::get("tmp_basket", [\App\Http\Controllers\TmpBasketController::class, "index"]);
Route::post("tmp_basket", [\App\Http\Controllers\TmpBasketController::class,"store"]);
Route::put("tmp_basket/{id}", [\App\Http\Controllers\TmpBasketController::class, "update"]);
Route::delete("tmp_basket/{id}", [\App\Http\Controllers\TmpBasketController::class,"destroy"]);

Route::post("sendMail",[\App\Http\Controllers\mailController::class,"send"]);

