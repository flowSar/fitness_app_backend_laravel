<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Plan;
use App\Models\PlanSession;
use App\Models\PlanSessionExercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class PlanSessionExerciseController extends Controller
{

    public function index()
    {
        $plans = Plan::with('sessions.sessionExercises.exercise')->get();
        $exercises = Exercise::all();

        return Inertia::render('planSessionWorkout/Index', ['plans' => $plans, 'exercises' => $exercises]);
    }

    public function create()
    {
        $exercises = Exercise::all();
        $plans = Plan::with([
            'sessions' => function ($q) {
                $q->where('created', 0);
            }
        ])->get();

        return Inertia::render('planSessionWorkout/Create', ['exercises' => $exercises, 'plans' => $plans]);
    }

    public function edit(PlanSession $plansession)
    {

        dd($plansession);
        $exercises = Exercise::all();
        // $plans = Plan::with('sessions.sessionExercises.exercises')->get();

        // ->sessionExercises->exercises;


        return Inertia::render('planSessionWorkout/Create', ['exercises' => $exercises,]);
    }

    public function store(Request $request)
    {
        dd($request->all());
        $attributes = $request->validate([
            'planId' => ['required'],
            'sessionId' => ['required'],
            'exercises' => ['required', 'array'],
        ]);


        foreach ($attributes['exercises'] as $exercise) {

            $exer = json_decode($exercise, true);
            PlanSessionExercise::create([
                'exercise_id' => $exer['id'],
                'plan_session_id' => $attributes['sessionId'],
                'sets' => $exer['sets'],
                'reps' => $exer['reps'],
                'duration' => $exer['duration']
            ]);
        }

        $planSession = PlanSession::find($attributes['sessionId']);
        $planSession->created = true;
        $planSession->save();


        return back()->with('success', "session workout plan created successfully");
    }

    public function update(Request $request)
    {

        $attributes = $request->validate([
            'planId' => ['required'],
            'sessionId' => ['required'],
            'exercises' => ['required', 'array'],
        ]);


        foreach ($attributes['exercises'] as $exercise) {

            $exer = json_decode($exercise, true);
            PlanSessionExercise::update([
                'exercise_id' => $exer['id'],
                'plan_session_id' => $attributes['sessionId'],
                'sets' => $exer['sets'],
                'reps' => $exer['reps'],
                'duration' => $exer['duration']
            ]);
        }

        return back()->with('success', "session workout plan created successfully");
    }
}
