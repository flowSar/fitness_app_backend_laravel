<?php

namespace App\Http\Services\Api\V1;

use App\Http\Resources\V1\UserPlanSessionExerciseResource;
use App\Models\UserPlanSessionExercise;

class ProgressService
{

    public function completeExercise(UserPlanSessionExercise $userplansessionexercise)
    {
        // exercise recomplete or session complete or plan complete return .
        if ($userplansessionexercise->complete || $userplansessionexercise->userPlanSession->complete || $userplansessionexercise->userPlanSession->userPlan->complete) {
            return new UserPlanSessionExerciseResource($userplansessionexercise);
        }

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

        if ($progress == 100) {
            // mark the session complete 
            $userPlanSession->complete = true;
            $userPlanSession->save();

            // calculate the plan progress
            $totalSessionNumber = $userPlanSession->userPlan->userPlanSessions->count();
            $completedSessionsNumber = $userPlanSession->userPlan->completedSessionsCount();
            $planProgress = ($completedSessionsNumber / $totalSessionNumber) * 100;

            // update the plan progress
            $userPlanSession->userPlan->progress = $planProgress;

            if ($planProgress == 100) {
                $userPlanSession->userPlan->complete = true;
            }
            $userPlanSession->userPlan->save();
        } else {

            $userPlanSession->progress = $progress;
            $userPlanSession->save();
        }


        return $userplansessionexercise;
    }
}
