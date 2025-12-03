<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    /** @use HasFactory<\Database\Factories\ExerciseFactory> */
    use HasFactory;
    use HasUuids;
    protected $fillable = ['name', 'description', 'notes', 'image', 'video', 'level'];
    public static array $exerciseLevel = ['Beginner', 'Intermediate', 'Advanced'];


    // public function planSessionExercise()
    // {
    //     return $this->belongsTo(PlanSessionExercise::class);
    // }
}
