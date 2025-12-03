<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPlanSessionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'complete' => $this->complete,
            'progress' => $this->progress,
            'sessionExercises' => UserPlanSessionExerciseResource::collection($this->userSessionExercises),
        ];
    }
}
