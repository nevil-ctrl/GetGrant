<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::view('/dashboard', 'dashboard')->name('dashboard');
});

Route::redirect('/home', '/dashboard');

// Legacy auth shortcuts (compatibility after /auth prefix)
Route::redirect('/login', '/auth/login')->name('login.legacy');
Route::redirect('/register', '/auth/register')->name('register.legacy');
Route::redirect('/forgot-password', '/auth/forgot-password')->name('password.request.legacy');
Route::redirect('/reset-password', '/auth/reset-password')->name('password.reset.legacy');
Route::get('/reset-password/{token}', function (string $token) {
    return redirect()->away(url("/auth/reset-password/{$token}"));
})->name('password.reset.token.legacy');
