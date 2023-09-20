<?php

use App\Http\Api\AuthController;
use App\Http\Api\ItemController;
use App\Http\Api\ItemRegistrationController;
use App\Http\Api\PurchaseController;
use App\Http\Api\StoreController;
use App\Http\Api\TransferController;
use App\Http\Api\UniqueCheckController;
use App\Http\Api\ItemListController;
use App\Http\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
Route::middleware('auth:sanctum')
    ->prefix('admin')
    ->group(function (){
        Route::get('items', [ItemListController::class, 'items']);
        Route::get('purchase', [PurchaseController::class, 'fetchPurchase']);
});
Route::post('/exists-sku', UniqueCheckController::class);
Route::post('/creat-item', ItemRegistrationController::class);
// All
Route::get('/item-page', [ItemListController::class, 'withPagination']);
Route::get('/item-limit', [ItemListController::class, 'withLimit']);
Route::get('/item', [ItemController::class, 'getProductByTokenId']);
// fetchRegisteredStores
Route::get('/stores', StoreController::class);

Route::post('/transfer', TransferController::class);


Route::get('/statement', [AuthController::class, 'getStatement']);
Route::post('/login'   , [AuthController::class, 'login']);
Route::post('/logout'   , [AuthController::class, 'logout']);

Route::any('{any}', function () {
    abort(404);
})->where('any', '.*');