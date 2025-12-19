<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'code', 'flag', 'description', 'is_active', 'selling_points',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'selling_points' => 'array',
    ];

    public function universities() {
        return $this->hasMany(University::class);
    }
}
