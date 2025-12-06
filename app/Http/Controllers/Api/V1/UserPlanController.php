<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SimplePlanResource;
use App\Http\Resources\V1\UserPlanResource;
use App\Models\Plan;
use App\Models\UserPlan;
use App\Models\UserPlanSession;
use App\Models\UserPlanSessionExercise;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPlanController extends Controller
{
    use ApiResponse;

    protected $extends = [
        'userPlanSessions',
        'userPlanSessions.userSessionExercises',
        'userPlanSessions.userSessionExercises.planSessionExercise',
        'userPlanSessions.userSessionExercises.planSessionExercise.exercise',
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = UserPlan::with('plan')->get();
        // return response()->json($plans);
        return SimplePlanResource::collection($plans);
        // return UserPlanResource::collection($plans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Plan $plan)
    {
        // create user plan
        $userPlan = UserPlan::create([
            'plan_id' => $plan->id,
            // 'user_id' => Auth::user()->id,
            'user_id' => 3,
        ]);

        // create user plan sessions
        $planSessions = $plan->sessions;



        foreach ($planSessions as $session) {
            $userPlanSession = UserPlanSession::create([
                'user_plan_id' => $userPlan->id,
                'plan_session_id' => $session->id,
            ]);
            $planSessionExercises = $session->sessionExercises;

            foreach ($planSessionExercises as $planSessionExercise) {
                UserPlanSessionExercise::create([
                    'user_plan_session_id' => $userPlanSession->id,
                    'plan_session_exercise_id' => $planSessionExercise->id,
                    // 'plan_session_exercise_id' => '019ae401-d68a-72a0-bdbb-da061aed7840',
                ]);
            }
        }

        return $this->ok('created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPlan $userplan)
    {
        return new UserPlanResource($userplan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPlan $userplan)
    {

        $attributes = $request->validate([
            'complete' => ['boolean'],
            'progress' => ['numeric'],
        ]);

        $result = $userplan->update($attributes);
        if (!$result) {
            return Response()->json([
                'success' => false,
                'message' => 'update plan failed'
            ]);
        }
        return Response()->json([
            'success' => true,
            'date' => [
                'plan' => $userplan,
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
