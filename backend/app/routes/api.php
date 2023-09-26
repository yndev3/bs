<?php

use App\Http\Api\AdminController;
use App\Http\Api\AuthController;
use App\Http\Api\ItemController;
use App\Http\Api\ItemRegistrationController;
use App\Http\Api\PurchaseController;
use App\Http\Api\StoreController;
use App\Http\Api\TransferController;
use App\Http\Api\UniqueCheckController;
use App\Http\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// user only
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-nft-list', [UserController::class, 'fetchUserNFTList']);
    Route::get('/booking', [UserController::class, 'fetchBooking']);
    Route::post('/create-booking', [UserController::class, 'createBooking']);
    Route::get('/purchase', [UserController::class, 'fetchPurchase']);
    Route::post('/purchase', [UserController::class, 'createPurchase']);
});
// Admin only
Route::middleware(['auth:sanctum', 'admin'])
    ->prefix('admin')
    ->group(function (){
        Route::get('items', [AdminController::class, 'items']);
        Route::get('item/{id}', [AdminController::class, 'getProductByTokenId']);
        Route::post('item/{id}/sales', [AdminController::class, 'setSaleStatus']);
        Route::post('item/{id}/burn', [AdminController::class, 'setBurn']);
        Route::get('purchase', [PurchaseController::class, 'fetchPurchase']);
        Route::get('booking', [AdminController::class, 'fetchBooking']);
        Route::post('exists-sku', UniqueCheckController::class);
        Route::post('creat-item', ItemRegistrationController::class);
});

// All
Route::get('/items', [ItemController::class, 'getProducts']);
Route::get('/item', [ItemController::class, 'getProductByTokenId']);
Route::get('/stores', StoreController::class);

// webhooks
Route::post('/transfer', TransferController::class);


Route::get('/isAdmin/{address}', [AuthController::class, 'isAdmin']);
Route::get('/statement', [AuthController::class, 'getStatement']);
Route::post('/login'   , [AuthController::class, 'login']);
Route::post('/logout'   , [AuthController::class, 'logout']);

Route::any('{any}', function () {
    abort(404);
})->where('any', '.*');