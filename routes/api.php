<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ExerciseController;
use App\Http\Controllers\Api\V1\PlanController;
use App\Http\Controllers\Api\V1\UserPlanController;
use Illuminate\Support\Facades\Route;


// Route::middleware('api')->group(function () {
//     Route::post('/login', [AuthController::class, 'store']);
// });

Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::post('/register', [AuthController::class, 'register'])->name('api.register');

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'api.logout']);

// exercise
Route::get('/exercises', [ExerciseController::class, 'index']);
Route::get('/exercises/{exercise}', [ExerciseController::class, 'show'])->name('exercise.show');
//plan
Route::get('/user/plans', [PlanController::class, 'index'])->name('plans.index');
Route::post('/user/plans/{plan}/create', [UserPlanController::class, 'create']);
Route::get('/user/plans/{userplan}', [UserPlanController::class, 'show'])->name('api.user.plans.show');


//sessions
