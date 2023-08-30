<?php

use App\Http\Api\AuthController;
use App\Http\Api\ItemRegistrationController;
use App\Http\Api\UniqueCheckController;
use App\Http\Api\ItemListController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/creat-item', ItemRegistrationController::class);
Route::get('/item-page', [ItemListController::class, 'withPagination']);
Route::get('/item-limit', [ItemListController::class, 'withLimit']);
Route::post('/exists-sku', UniqueCheckController::class);
Route::get('/statement', [AuthController::class, 'getStatement']);
Route::post('/login'   , [AuthController::class, 'login']);
Route::post('/logout'   , [AuthController::class, 'logout']);