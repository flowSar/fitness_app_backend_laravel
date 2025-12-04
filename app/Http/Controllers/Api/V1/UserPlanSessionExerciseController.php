<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\UserPlanSessionExercise;
use Illuminate\Http\Request;

class UserPlanSessionExerciseController extends Controller
{
    public function update(Request $request, UserPlanSessionExercise $userplansessionexercise)
    {
        $attributes = $request->validate([
            'complete' => ['boolean'],
        ]);


        $result = $userplansessionexercise->update($attributes);
        if (!$result) {
            return Response()->json([
                'success' => false,
            ]);
        }
        return Response()->json([
            'success' => true,
            'date' => [
                'plan' => $userplansessionexercise,
            ],
        ]);
    }
}
