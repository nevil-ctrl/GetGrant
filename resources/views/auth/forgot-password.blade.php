<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Восстановление пароля | GetGrant</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-100 flex items-center justify-center min-h-screen px-4">
<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
    <div class="mb-6 text-center">
        <p class="text-sm uppercase tracking-wide text-slate-400">подтверждение личности</p>
        <h1 class="text-2xl font-bold text-slate-900">Сброс пароля</h1>
        <p class="mt-2 text-sm text-slate-500">Введите email, и мы отправим письмо с инструкциями.</p>
    </div>

    @if (session('status'))
        <div class="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {{ session('status') }}
        </div>
    @endif

    <form method="POST" action="{{ route('password.email') }}" class="space-y-4">
        @csrf
        <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700" for="email">Email</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                   class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
            @error('email')
            <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
            @enderror
        </div>

        <button type="submit"
                class="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700">
            Отправить ссылку
        </button>
    </form>

    <p class="mt-6 text-center text-sm text-slate-600">
        Вспомнили пароль?
        <a href="{{ route('login') }}" class="font-semibold text-blue-600 hover:text-blue-500">Вернуться ко входу</a>
    </p>
</div>
</body>
</html>

