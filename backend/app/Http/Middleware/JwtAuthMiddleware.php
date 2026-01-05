<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class JwtAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token tidak valid atau tidak ditemukan'
            ], 401);
        }

        // Simpan user ke request (mirip c.Set di Gin)
        $request->merge([
            'auth_user' => $user,
            'role' => $user->role
        ]);

        return $next($request);
    }
}
