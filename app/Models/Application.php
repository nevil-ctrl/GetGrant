<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'university_id',
        'program_id',
        'status',
        'timeline',
        'notes',
    ];

    protected $casts = [
        'timeline' => 'array',
    ];

    // Связи
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function steps()
    {
        return $this->hasMany(ApplicationStep::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function userDocuments()
    {
        return $this->hasMany(UserDocument::class);
    }
}
