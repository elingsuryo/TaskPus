<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use function App\Helpers\successResponse;
use function App\Helpers\errorResponse;

class AuthController extends Controller
{
    /**
     * LOGIN
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string',
            'password' => 'required'
        ]);

        if (!Auth::attempt($data)) {
            return errorResponse(
                'Invalid credentials',
                ['name' => ['Name or password is incorrect']],
                401
            );
        }

        $user = Auth::user();
        $token = JWTAuth::fromUser($user, [
            'user_id' => $user->id,
            'role'    => $user->role
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'user'    => JWTAuth::user()->load(['admin']),
            'token'   => $token,
        ]);
    }

    /**
     * LOGOUT
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return successResponse('Logout successful', []);
    }

    /**
     * Redirect berdasarkan role
     */

}
