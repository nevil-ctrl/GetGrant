<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'country_id',
        'description',
        'logo',
        'website',
        'cost_min',
        'cost_max',
        'requirements',
        'deadlines',
        'level',
        'is_active',
    ];

    /**
     * Связь с таблицей стран
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
