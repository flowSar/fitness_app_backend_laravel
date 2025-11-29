<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\PlanSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{

    public function index()
    {
        $plans = Plan::all();
        return Inertia::render("workoutplans/index", ['plans' => $plans]);
    }

    public function create()
    {

        return Inertia::render("workoutplans/create");
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'min:3', 'max:255'],
            'description' => ['required', 'min:10', 'max:500'],
            'image' => ['required', 'url'],
            'level' => ['required'],
            'duration' => ['required', 'numeric', 'gt:0'],
            'sessionsNumber' => ['required'],
        ]);

        $plan = Plan::create([
            'name' => $attributes['name'],
            'description' => $attributes['description'],
            'image' => $attributes['image'],
            'level' => $attributes['level'],
            'duration' => $attributes['duration'],
            'sessions_number' => $attributes['sessionsNumber'],
        ]);
        if (!$plan) {
            return back()->with("error", "plan creation failed");
        }

        for ($i = 0; $i < $attributes['sessionsNumber']; $i++) {
            PlanSession::create([
                'name' => 'Day' . $i + 1,
                'plan_id' => $plan->id,
            ]);
        }

        return back()->with("success", "plan created successfully");
    }
}
