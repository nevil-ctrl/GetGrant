<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\CheckRole;

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
Route::middleware('guest')->group(function () {
    // Форма запроса сброса пароля (ввод email)
    Route::get('/auth/forgot-password', fn() => view('auth.forgot-password'))
        ->name('password.request');

    // Отправка ссылки для сброса пароля
    Route::post('/auth/forgot-password', [\Laravel\Fortify\Http\Controllers\PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // Форма для нового пароля по токену
    Route::get(
        '/auth/reset-password/{token}',
        fn(\Illuminate\Http\Request $request, $token) =>
        view('auth.reset-password', ['request' => $request, 'token' => $token])
    )->name('password.reset');

    // Сброс пароля (сохранение нового)
    Route::post('/auth/reset-password', [\Laravel\Fortify\Http\Controllers\NewPasswordController::class, 'store'])
        ->name('password.update'); // Обратите внимание на name: password.update
});

// -------------------------------
// Дашборды по ролям с middleware проверки
// -------------------------------
Route::middleware(['auth', 'verified'])->group(function () {

    // Редирект /dashboard → правильный дашборд по роли
    Route::get('/dashboard', function () {
        $user = Auth::user();

        return match ($user->profile_type) {
            'student' => redirect()->route('student.dashboard'),
            'parent' => redirect()->route('parent.dashboard'),
            'manager' => redirect()->route('manager.dashboard'),
            'admin' => redirect()->route('admin.dashboard'),
            default => redirect('/'),
        };
    });

    // Дашборды по ролям (Laravel 12: полное имя класса middleware + параметр)
    Route::get('/student-dashboard', function () {
        return view('dashboards.student');
    })->middleware([CheckRole::class . ':student'])->name('student.dashboard');

    Route::get('/parent-dashboard', function () {
        return view('dashboards.parent');
    })->middleware([CheckRole::class . ':parent'])->name('parent.dashboard');

    Route::get('/manager-dashboard', function () {
        return view('dashboards.manager');
    })->middleware([CheckRole::class . ':manager'])->name('manager.dashboard');

    Route::get('/admin-dashboard', function () {
        return view('dashboards.admin');
    })->middleware([CheckRole::class . ':admin'])->name('admin.dashboard');
});

// -------------------------------
// Редирект /home → /dashboard
// -------------------------------
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
})->where('any', '^(?!dashboard|api|student-dashboard|parent-dashboard|manager-dashboard|admin-dashboard).*$');
