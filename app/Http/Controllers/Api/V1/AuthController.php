<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    use ApiResponse;



    public function register(RegisterRequest $request)
    {

        $request->validated();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        if (!$user) {
            return $this->error('register failed', []);
        }
        $token = $user->createToken('apiTokenFor' . $user->name)->plainTextToken;
        return $this->success('user registered successfulyl', ['user' => $user, 'token' => $token]);
    }

    public function login(LoginRequest $request)
    {

        $request->validated();

        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error('Inalid Credentials for ', 401);
        }

        $user = User::firstWhere('email', $request->email);

        return $this->ok('Authenticated', [
            'token' => $user->createToken('Api token for ' . $user->email, ['*'], now()->addMonth())->plainTextToken,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->ok('logged out', ['success' => true]);
    }

    public function validateToken(Request $request)
    {
        return $this->ok('token is valid', data: ['user' => $request->user()]);
    }
}
