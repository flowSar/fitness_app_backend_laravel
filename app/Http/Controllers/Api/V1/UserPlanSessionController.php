<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserPlanSessionResource;
use App\Models\UserPlan;
use App\Models\UserPlanSession;
use Illuminate\Http\Request;

class UserPlanSessionController extends Controller
{
    public function index(UserPlan $userplan)
    {
        // $userPlanSessions = UserPlanSession::with('planSession')->where('user_plan_id', $userplan->id)->get();
        $userPlanSessions = $userplan->userPlanSessions;
        return UserPlanSessionResource::collection($userPlanSessions);
    }
    public function update(Request $request, UserPlan $userplan, UserPlanSession $userplansession)
    {

        $attributes = $request->validate([
            'complete' => ['boolean'],
            'progress' => ['numeric'],
        ]);


        $result = $userplansession->update($attributes);
        if (!$result) {
            return Response()->json([
                'success' => false,
            ]);
        }
        return Response()->json([
            'success' => true,
            'date' => [
                'plan' => $userplansession,
            ],
        ]);
    }
}
