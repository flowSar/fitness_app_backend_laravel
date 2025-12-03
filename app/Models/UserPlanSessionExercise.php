<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class UserPlanSessionExercise extends Model
{
    use HasUuids;

    protected $fillable = ['plan_session_exercise_id', 'user_plan_session_id', 'complete'];

    public function userPlanSession()
    {
        return $this->belongsTo(UserPlanSession::class);
    }

    public function planSessionExercise()
    {
        return $this->belongsTo(PlanSessionExercise::class);
    }
}
