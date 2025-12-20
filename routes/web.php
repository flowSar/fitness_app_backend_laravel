<?php

use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PlanSessionExerciseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Models\PlanSessionExercise;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/test', function () {
    return Inertia::render('TestPage');
});

Route::get('/dashboard', [DashBoardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get("/dashboard/plans", [PlanController::class, 'index'])->name('dashboard.plans');
Route::get("/dashboard/plans/create", [PlanController::class, 'create'])->name('dashboard.plans.create');
Route::post("/dashboard/plans", [PlanController::class, 'store'])->name('dashboard.plans.store');
Route::delete("/dashboard/plans/{plan}", [PlanController::class, 'delete'])->name('dashboard.plans.delete');
Route::get("/dashboard/plans/{plan}/edit", [PlanController::class, 'edit'])->name('dashboard.plans.delete');
Route::put("/dashboard/plans/{plan}", [PlanController::class, 'update'])->name('dashboard.plans.update');


Route::get("/dashboard/exercises", [ExerciseController::class, 'index'])->name('dashboard.exercises');
Route::get("/dashboard/exercises/{exercise}/edit", [ExerciseController::class, 'edit'])->name('dashboard.exercises.edit');
Route::delete("/dashboard/exercises/{exercise}", [ExerciseController::class, 'destroy'])->name('dashboard.exercises.delete');

Route::get("/dashboard/exercises/create", [ExerciseController::class, 'create'])->name('dashboard.exercises');
Route::post("/dashboard/exercises", [ExerciseController::class, 'store'])->name('dashboard.exercises');
Route::put("/dashboard/exercises/{exercise}", [ExerciseController::class, 'update'])->name('dashboard.exercises.update');

Route::post('/dashboard/planSessionExercises', [PlanSessionExerciseController::class, 'store']);
Route::get('/dashboard/planSessionExercises', [PlanSessionExerciseController::class, 'index']);
Route::get("/dashboard/planSessionWorkout/create", [PlanSessionExerciseController::class, 'create'])->name('dashboard.planSessionWorkout.create');
Route::get('/dashboard/plans/sessions/{plansession}/exercises', [PlanSessionExerciseController::class, 'edit'])->name('dashboard.plan.session.exercise.edit');

Route::get('/dashboard/nutrition', [RecipeController::class, 'index']);

require __DIR__ . '/auth.php';
// require __DIR__ . '/api.php';
