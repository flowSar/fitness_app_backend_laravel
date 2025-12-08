<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ExerciseController;
use App\Http\Controllers\Api\V1\PlanController;
use App\Http\Controllers\Api\V1\UserPlanController;
use App\Http\Controllers\Api\V1\UserPlanSessionController;
use App\Http\Controllers\Api\V1\UserPlanSessionExerciseController;
use Illuminate\Support\Facades\Route;


// Route::middleware('api')->group(function () {
//     Route::post('/login', [AuthController::class, 'store']);
// });

Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::post('/register', [AuthController::class, 'register'])->name('api.register');
Route::middleware('auth:sanctum')->post('/validate-token', [AuthController::class, 'validateToken'])->name('api.validate-token');
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout'])->name('api.user.logout');

// exercise
Route::get('/exercises', [ExerciseController::class, 'index']);
Route::get('/exercises/{exercise}', [ExerciseController::class, 'show'])->name('exercise.show');

//plan
Route::get('/plans', [PlanController::class, 'index'])->name('api.plans.index');
Route::middleware('auth:sanctum')->get('/user/plans', [UserPlanController::class, 'index'])->name('api.user.plans.index');

Route::middleware('auth:sanctum')->post('/user/plans/{plan}/create', [UserPlanController::class, 'create'])->name('api.user.plan.create');

Route::middleware('auth:sanctum')->get('/user/plans/{userplan}', [UserPlanController::class, 'show'])->name('api.user.plans.show');
Route::middleware('auth:sanctum')->put('/user/plans/{userplan}', [UserPlanController::class, 'update'])->name('api.user.plans.update');


//sessions
Route::middleware('auth:sanctum')->put('/user/plans/session/{userplansession}', [UserPlanSessionController::class, 'update'])->name('api.plans.session.update');

Route::middleware('auth:sanctum')->get('/user/plans/{userplan}/sessions', [UserPlanSessionController::class, 'index'])->name('api.user.plans.sessions');


Route::get('/user/plans/sessions/{userplansession}/sessionExercises', [UserPlanSessionExerciseController::class, 'index'])->name('api.user.plans.sessions.sessionexercises');


Route::middleware('auth:sanctum')->put('/user/plans/session/exercise/{userplansessionexercise}', [UserPlanSessionExerciseController::class, 'update'])->name('api.plans.session.exercise.update');
