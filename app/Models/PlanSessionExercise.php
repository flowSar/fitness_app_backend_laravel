<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanSessionExercise extends Model
{
    /** @use HasFactory<\Database\Factories\PlanSessionExerciseFactory> */
    use HasFactory;
    use HasUuids;

    protected $fillable = ['complete', 'sets', 'reps', 'duration',];
}
