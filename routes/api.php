<?php

use App\Http\Controllers\Api\CountryController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::get('/countries', [CountryController::class, 'index']);
    Route::get('/countries/{id}', [CountryController::class, 'show']);
});
