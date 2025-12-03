<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PlanResource;
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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = UserPlan::all();
        return PlanResource::collection($plans);
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


        $userplan->load('userPlanSessions.userSessionExercises.planSessionExercise.exercise');

        return new PlanResource($userplan);
        dd($planSessions);
        // return new PlanResource($planSessions);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
