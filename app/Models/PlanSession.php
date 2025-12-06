<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanSession extends Model
{
    /** @use HasFactory<\Database\Factories\PlanSessionFactory> */
    use HasFactory;
    use HasUuids;

    protected $fillable = ['name', 'complete', 'progress', 'duration', 'plan_id'];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function sessionExercises()
    {
        return $this->hasMany(PlanSessionExercise::class);
    }

    public function userPlanSession()
    {
        return $this->hasMany(UserPlanSession::class);
    }
}
