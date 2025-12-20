<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashBoardController extends Controller
{

    public function index()
    {
        $plansNumber = Plan::all()->count();
        $usersNumber = User::where('role', 'user')->count();
        $exercisesNumber = Exercise::all()->count();
        return Inertia::render('Dashboard', ['plansNumber' => $plansNumber, 'usersNumber' => $usersNumber, 'exercisesNumber' => $exercisesNumber,]);
    }
}
