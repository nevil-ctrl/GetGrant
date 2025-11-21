<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>
<body class="bg-gray-50">
    <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">Welcome</h1>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button class="text-red-500 hover:text-red-600 font-semibold">Logout</button>
            </form>
        </div>
    </header>

    <main class="py-10">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow rounded-lg p-6">
                <p class="text-gray-600">Bimboozle</p>
            </div>
        </div>
    </main>
</body>
</html>

