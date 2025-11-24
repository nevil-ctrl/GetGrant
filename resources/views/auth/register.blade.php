<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация | GetGrant</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-100 flex items-center justify-center min-h-screen px-4">
<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
    <div class="mb-6 text-center">
        <p class="text-sm uppercase tracking-wide text-slate-400">присоединиться</p>
        <h1 class="text-2xl font-bold text-slate-900">Создать аккаунт</h1>
    </div>

    <form method="POST" action="{{ route('register') }}" class="space-y-4">
        @csrf
        <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700" for="name">Имя</label>
            <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus
                   class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
            @error('name')
            <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700" for="email">Email</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required
                   class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
            @error('email')
            <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700" for="password">Пароль</label>
            <input id="password" type="password" name="password" required
                   class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
            @error('password')
            <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700" for="password_confirmation">Подтверждение</label>
            <input id="password_confirmation" type="password" name="password_confirmation" required
                   class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
        </div>

        <button type="submit"
                class="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700">
            Зарегистрироваться
        </button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-600">
        Уже есть аккаунт?
        <a href="{{ route('login') }}" class="font-semibold text-blue-600 hover:text-blue-500">Войти</a>
    </p>
</div>
</body>
</html>
