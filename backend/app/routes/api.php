<?php

use App\Http\Api\AuthController;
use App\Http\Api\ItemRegistrationController;
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
//
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
// user only
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-nft-list', [UserController::class, 'fetchUserNFTList']);
});
// Admin only
Route::post('/exists-sku', UniqueCheckController::class);
Route::post('/creat-item', ItemRegistrationController::class);
// All
Route::get('/item-page', [ItemListController::class, 'withPagination']);
Route::get('/item-limit', [ItemListController::class, 'withLimit']);

Route::get('/statement', [AuthController::class, 'getStatement']);
Route::post('/login'   , [AuthController::class, 'login']);
Route::post('/logout'   , [AuthController::class, 'logout']);




