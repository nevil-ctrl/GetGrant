<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Подтверждение почты | GetGrant</title>
        <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-100 flex items-center justify-center min-h-screen px-4">
<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
    <div class="mb-6 text-center space-y-2">
        <p class="text-sm uppercase tracking-wide text-slate-400">шаг безопасности</p>
        <h1 class="text-2xl font-bold text-slate-900">Подтвердите электронную почту</h1>
        <p class="text-sm text-slate-500">Мы отправили ссылку на адрес <strong>{{ auth()->user()->email }}</strong>. Перейдите по ней, чтобы активировать профиль.</p>
    </div>

    @if (session('status') == 'verification-link-sent')
        <div class="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            Новая ссылка отправлена на указанную почту.
        </div>
    @endif

    <div class="space-y-4">
        <form method="POST" action="{{ route('verification.send') }}">
            @csrf
            <button type="submit"
                    class="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700">
                Отправить ссылку ещё раз
            </button>
        </form>

        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit"
                    class="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Выйти
            </button>
        </form>
    </div>
</div>
</body>
</html>

