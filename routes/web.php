<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

// -------------------------------
// API для React
// -------------------------------
Route::get('/api/user', function () {
    return response()->json(Auth::user());
})->middleware('web');

Route::post('/api/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return response()->json(['success' => true]);
})->middleware('web');

// -------------------------------
// Защищённые маршруты
// -------------------------------
Route::middleware(['auth', 'verified'])->group(function () {
    Route::view('/dashboard', 'dashboard')->name('dashboard');
});

Route::redirect('/home', '/dashboard');

// -------------------------------
// Legacy auth shortcuts
// -------------------------------
Route::redirect('/login', '/auth/login')->name('login.legacy');
Route::redirect('/register', '/auth/register')->name('register.legacy');
Route::redirect('/forgot-password', '/auth/forgot-password')->name('password.request.legacy');
Route::redirect('/reset-password', '/auth/reset-password')->name('password.reset.legacy');
Route::get('/reset-password/{token}', function (string $token) {
    return redirect()->away(url("/auth/reset-password/{$token}"));
})->name('password.reset.token.legacy');

// -------------------------------
// React SPA для всех остальных страниц
// -------------------------------
Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!dashboard|api).*$');