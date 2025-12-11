<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\UniversityController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ApplicationStepController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\UserDocumentController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\MessageController;

Route::middleware('api')->group(function () {

    // Countries
    Route::get('/countries', [CountryController::class, 'index']);
    Route::get('/countries/{id}', [CountryController::class, 'show']);

    // Universities
    Route::get('/universities', [UniversityController::class, 'index']);
    Route::get('/universities/{id}', [UniversityController::class, 'show']);
    Route::post('/universities', [UniversityController::class, 'store']);
    Route::put('/universities/{id}', [UniversityController::class, 'update']);
    Route::delete('/universities/{id}', [UniversityController::class, 'destroy']);

    // Programs
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/{id}', [ProgramController::class, 'show']);
    Route::post('/programs', [ProgramController::class, 'store']);
    Route::put('/programs/{id}', [ProgramController::class, 'update']);
    Route::delete('/programs/{id}', [ProgramController::class, 'destroy']);


    Route::apiResource('courses', CourseController::class);
    Route::apiResource('lessons', LessonController::class);
    Route::apiResource('application-steps', ApplicationStepController::class);
    Route::apiResource('documents', DocumentController::class);
    Route::apiResource('user-documents', UserDocumentController::class);
    Route::apiResource('leads', LeadController::class);
    Route::apiResource('messages', MessageController::class);

});
