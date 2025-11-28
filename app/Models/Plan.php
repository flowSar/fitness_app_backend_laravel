<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    /** @use HasFactory<\Database\Factories\PlanFactory> */
    use HasFactory;
    use HasUuids;
    protected $fillable = ['name', 'description', 'sessions_number', 'image', 'level', 'duration'];

    public static array $planLevel = ['Beginner', 'Intermediate', 'Advanced'];


    public function sessions()
    {
        return $this->hasMany(PlanSession::class);
    }
}
