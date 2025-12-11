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

// Countries (only index + show)
Route::apiResource('countries', CountryController::class)->only(['index', 'show']);

// Universities
Route::apiResource('universities', UniversityController::class);

// Programs
Route::apiResource('programs', ProgramController::class);

// Courses / Lessons
Route::apiResource('courses', CourseController::class);
Route::apiResource('lessons', LessonController::class);

// Applications + steps
Route::apiResource('applications', ApplicationController::class);
Route::apiResource('application-steps', ApplicationStepController::class);

// Documents system
Route::apiResource('documents', DocumentController::class);
Route::apiResource('user-documents', UserDocumentController::class);

// CRM: Leads + Messages
Route::apiResource('leads', LeadController::class);
Route::apiResource('messages', MessageController::class);
