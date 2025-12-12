<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\UniversityController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\ApplicationStepController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\UserDocumentController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\AuthController;

// Auth (Sanctum, React SPA)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Countries (only index + show) - публичные
Route::apiResource('countries', CountryController::class)->only(['index', 'show']);

// Universities - чтение публично, мутации требуют авторизации
Route::apiResource('universities', UniversityController::class)->only(['index', 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('universities', [UniversityController::class, 'store']);
    Route::put('universities/{university}', [UniversityController::class, 'update']);
    Route::delete('universities/{university}', [UniversityController::class, 'destroy']);
});

// Programs - чтение публично, мутации требуют авторизации
Route::apiResource('programs', ProgramController::class)->only(['index', 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('programs', [ProgramController::class, 'store']);
    Route::put('programs/{program}', [ProgramController::class, 'update']);
    Route::delete('programs/{program}', [ProgramController::class, 'destroy']);
});

// Courses / Lessons - требуют авторизации
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('lessons', LessonController::class);
});

// Applications + steps - требуют авторизации (только свои)
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('applications', ApplicationController::class);
    Route::apiResource('application-steps', ApplicationStepController::class);
});

// Documents system - требуют авторизации
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('documents', DocumentController::class);
    Route::apiResource('user-documents', UserDocumentController::class);
});

// CRM: Leads + Messages - требуют авторизации
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('leads', LeadController::class);
    Route::apiResource('messages', MessageController::class);
});
