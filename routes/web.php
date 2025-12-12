<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\CheckRole;

// -------------------------------
// API для React SPA (сессии через Sanctum)
// -------------------------------
Route::middleware(['web', 'auth:sanctum'])->group(function () {
    Route::get('/api/user', fn() => response()->json(Auth::user()));

    Route::post('/api/logout', function () {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return response()->json(['success' => true]);
    });
});

// -------------------------------
// Роуты для гостей (Fortify) - сброс пароля
// -------------------------------
Route::middleware(['web', 'guest'])->group(function () {
    // Форма запроса сброса пароля (email)
    Route::get('/auth/forgot-password', fn() => view('auth.forgot-password'))
        ->name('password.request');

    // Отправка ссылки для сброса пароля
    Route::post('/auth/forgot-password', [\Laravel\Fortify\Http\Controllers\PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // Форма для нового пароля по токену
    Route::get('/auth/reset-password/{token}', function (\Illuminate\Http\Request $request, $token) {
        return view('auth.reset-password', ['request' => $request, 'token' => $token]);
    })->name('password.reset');

    // Сохранение нового пароля
    Route::post('/auth/reset-password', [\Laravel\Fortify\Http\Controllers\NewPasswordController::class, 'store'])
        ->name('password.update');
});

// -------------------------------
// Дашборды по ролям
// -------------------------------
Route::middleware(['web', 'auth', 'verified'])->group(function () {

    // Редирект /dashboard → правильный дашборд по роли
    Route::get('/dashboard', function () {
        $user = Auth::user();
        // Используем role вместо profile_type для редиректа
        return match ($user->role) {
            'student' => redirect()->route('student.dashboard'),
            'parent' => redirect()->route('parent.dashboard'),
            'manager' => redirect()->route('manager.dashboard'),
            'admin' => redirect('/admin'), // Filament админка
            default => redirect('/'),
        };
    });

    Route::get('/student-dashboard', fn() => view('dashboards.student'))
        ->middleware([CheckRole::class . ':student'])->name('student.dashboard');

    Route::get('/parent-dashboard', fn() => view('dashboards.parent'))
        ->middleware([CheckRole::class . ':parent'])->name('parent.dashboard');

    Route::get('/manager-dashboard', fn() => view('dashboards.manager'))
        ->middleware([CheckRole::class . ':manager'])->name('manager.dashboard');

    Route::get('/admin-dashboard', fn() => view('dashboards.admin'))
        ->middleware([CheckRole::class . ':admin'])->name('admin.dashboard');
});

// -------------------------------
// Редирект /home → /dashboard
// -------------------------------
Route::redirect('/home', '/dashboard');

// -------------------------------
// React SPA для всех остальных страниц
// -------------------------------
Route::get('/{any}', fn() => view('index'))
    ->where('any', '^(?!dashboard|api|student-dashboard|parent-dashboard|manager-dashboard|admin-dashboard).*$');
