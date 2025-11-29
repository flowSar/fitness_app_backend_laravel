<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{

    public function index()
    {
        $exercises = Exercise::all();

        return Inertia::render('exercises/index', ['exercises' => $exercises]);
    }
    public function create()
    {
        return Inertia::render('exercises/create');
    }
    public function store(Request $request)
    {

        $attributes = $request->validate([
            'name' => ['required', 'min:3', 'max:255'],
            'description' => ['required', 'min:10', 'max:500'],
            'image' => ['required', 'url'],
            'level' => ['required'],
        ]);
        $exercise = Exercise::create([
            'name' => $request->all()['name'],
            'description' => $request->all()['description'],
            'notes' => $request->all()['notes'],
            'image' => $request->all()['image'],
            'video' => $request->all()['video'],
            'level' => $request->all()['level'],
        ]);
        if (!$exercise) {
            return back()->with("error", "exercise creation failed");
        }
        return back()->with("success", "exercise created successfully");
        // dd($attributes);
    }
}
