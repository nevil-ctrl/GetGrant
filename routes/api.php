<?php
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\UniversityController;
use App\Http\Controllers\Api\ProgramController;

Route::apiResource('countries', CountryController::class);
Route::apiResource('universities', UniversityController::class);
Route::apiResource('programs', ProgramController::class);
?>