<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="email">Email</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                       class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                @error('email')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="password">Password</label>
                <input id="password" type="password" name="password" required
                       class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                @error('password')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex items-center justify-between mb-4">
                <label class="flex items-center">
                    <input type="checkbox" name="remember" class="mr-2">
                    Remember Me
                </label>
                <a href="{{ route('password.request') }}" class="text-blue-500 text-sm">Forgot password?</a>
            </div>

            <button type="submit"
                    class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Login
            </button>
        </form>

        <p class="text-center mt-4 text-sm">
            Don't have an account? <a href="{{ route('register') }}" class="text-blue-500">Register</a>
        </p>
    </div>
</body>
</html>
