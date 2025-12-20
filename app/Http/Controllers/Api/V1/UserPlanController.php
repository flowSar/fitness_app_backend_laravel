<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\SimplePlanResource;
use App\Http\Resources\V1\UserPlanResource;
use App\Models\Plan;
use App\Models\PlanSessionExercise;
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
    public function index(Request $request)
    {

        $plans = UserPlan::with('plan')->where('user_id', $request->user()->id)->get();

        // return response()->json($plans);
        return SimplePlanResource::collection($plans);
        // return UserPlanResource::collection($plans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request, Plan $plan)
    {

        // create user plan
        $userPlan = UserPlan::create([
            'plan_id' => $plan->id,
            'user_id' => $request->user()->id,
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

        // return $this->ok('created successfully');
        return new SimplePlanResource($userPlan);
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


    public function store(Request $request)
    {
        // dd($request->all());
        $attributes = $request->validate([
            'name' => ['required', 'min:3', 'max:255'],
            'visibility' => ['required', 'bool'],
            'exercises' => ['required', 'array'],
        ]);

        $plan = Plan::create([
            'name' => $attributes['name'],
            'description' => 'user plane',
            'image' => 'https://www.crunch.com.au/wp-content/uploads/2019/01/women-tredmill.png',
            'level' => Plan::$planLevel[0],
            'type' => 'single_session',
        ]);

        $userPlan = UserPlan::create([
            'plan_id' => $plan->id,
            // 'user_id' => 2,
            'user_id' => $request->user()->id,
        ]);

        $session = $plan->sessions()->create([
            'plan_id' => $plan->id,
            'name' => 'Day 1',
        ]);
        // dd('here', $session->id);
        $userSession = $userPlan->userPlanSessions()->create([
            'user_plan_id' => $userPlan->id,
            'plan_session_id' => $session->id,
        ]);

        $workoutDuration = 0;
        foreach ($attributes['exercises'] as $exerciseId) {
            $planSessionExercises = PlanSessionExercise::create([
                'plan_session_id' => $session->id,
                'sets' => $exerciseId['sets'] ?? 1,
                'reps' => $exerciseId['reps'] ?? 1,
                'duration' => $exerciseId['duration'] ?? 0,
                'exercise_id' => $exerciseId['id'],
            ]);
            $workoutDuration += $planSessionExercises->duration + 10; // adding 10 seconds rest between exercises

            $userSessionExercises = $userSession->userSessionExercises()->create([
                'plan_session_exercise_id' => $planSessionExercises->id,
                'complete' => false,
            ]);
        }

        $plan->duration = $workoutDuration - 10; // removing last rest time
        $plan->save();

        return new SimplePlanResource($userPlan);
    }
}
