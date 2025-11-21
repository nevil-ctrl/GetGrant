<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
        <form method="POST" action="{{ route('register') }}">
            @csrf
            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="name">Name</label>
                <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus
                       class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
                @error('name')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="email">Email</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required
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

            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="password_confirmation">Confirm Password</label>
                <input id="password_confirmation" type="password" name="password_confirmation" required
                       class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
            </div>

            <button type="submit"
                    class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Register
            </button>
        </form>

        <p class="text-center mt-4 text-sm">
            Already have an account? <a href="{{ route('login') }}" class="text-blue-500">Login</a>
        </p>
    </div>
</body>
</html>
