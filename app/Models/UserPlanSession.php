<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class UserPlanSession extends Model
{
    use HasUuids;

    protected $fillable = ['plan_session_id', 'user_plan_id', 'complete', 'progress'];

    public function userPlan()
    {
        return $this->belongsTo(UserPlan::class);
    }

    public function session()
    {
        return $this->belongsTo(PlanSession::class);
    }

    public function userSessionExercises()
    {
        return $this->hasMany(UserPlanSessionExercise::class);
    }
}
