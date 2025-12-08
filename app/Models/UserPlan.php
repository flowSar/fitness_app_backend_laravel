<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class UserPlan extends Model
{

    use HasUuids;

    protected $fillable = ['plan_id', 'user_id', 'complete', 'progress'];



    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function userPlanSessions()
    {
        return $this->hasMany(UserPlanSession::class);
    }

    public function completedSessionsCount()
    {
        return $this->userPlanSessions->where('complete', true)->count();
    }
}
