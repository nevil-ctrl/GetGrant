<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Postgres: пересоздаём check-constraint с нужными значениями
        DB::statement("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_profile_type_check;");
        DB::statement("ALTER TABLE users ADD CONSTRAINT users_profile_type_check CHECK (profile_type IN ('student','parent','manager','admin'));");
    }

    public function down(): void
    {
        // Возвращаем исходный набор значений
        DB::statement("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_profile_type_check;");
        DB::statement("ALTER TABLE users ADD CONSTRAINT users_profile_type_check CHECK (profile_type IN ('student','parent'));");
    }
};


