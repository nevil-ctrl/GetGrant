<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => $this->passwordRules(),
            'phone' => ['nullable', 'string', 'max:20'],
            'profile_type' => ['nullable', 'in:student,parent'],
            'manager_id' => ['nullable', 'exists:users,id'],
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'phone' => $input['phone'] ?? null,
            'profile_type' => $input['profile_type'] ?? 'student',
            'role' => $input['profile_type'] ?? 'student',
            'manager_id' => $input['manager_id'] ?? null,
        ]);
    }
}
