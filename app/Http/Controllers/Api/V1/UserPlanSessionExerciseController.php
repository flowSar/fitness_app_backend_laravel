<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserPlanSessionExerciseResource;
use App\Models\UserPlanSession;
use App\Models\UserPlanSessionExercise;
use Illuminate\Http\Request;

class UserPlanSessionExerciseController extends Controller
{

    public function index(UserPlanSession $userplansession)
    {

        $userPlanSessionExercises = UserPlanSessionExercise::with('planSessionExercise.exercise')->where('user_plan_session_id', $userplansession->id)->get();
        // return Response()->json($userPlanSessionExercises);
        return UserPlanSessionExerciseResource::collection($userPlanSessionExercises);
    }
    public function update(Request $request, UserPlanSessionExercise $userplansessionexercise)
    {
        $request->validate([
            'complete' => ['boolean'],
        ]);


        $userplansessionexercise->complete = true;
        $userplansessionexercise->save();
        if (!$userplansessionexercise->save()) {
            return response()->json([
                'success' => false,
            ], 500);
        }

        //calculete the progress of the session each time exercise completed

        $userPlanSession = $userplansessionexercise->userPlanSession;
        $totalExercises = $userPlanSession->userSessionExercises()->count();
        $progress = ($userPlanSession->completeExerciseCount() / $totalExercises) * 100;

        $userPlanSession->progress = $progress;
        $userPlanSession->save();

        return new UserPlanSessionExerciseResource($userplansessionexercise);
    }
}
