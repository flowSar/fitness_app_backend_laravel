<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanSessionExerciseResource extends JsonResource
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
            'planSessionExercseId' => $this->id,

            'sets' => $this->sets,
            'reps' => $this->reps,
            'duration' => $this->duration,
            'id' => $this->exercise->id,
            'name' => $this->exercise->name,
            'description' => $this->exercise->description,
            'notes' => $this->exercise->notes,
            'image' => $this->exercise->image,
            'level' => $this->exercise->level,
            // 'exercise' => new ExerciseResource($this->exercise),
        ];
    }
}
