<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

if (!function_exists('successResponse')) {
    function successResponse(
        string $message = 'Success',
        $data = [],
        int $statusCode = 200
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ], $statusCode);
    }
}

if (!function_exists('errorResponse')) {
    function errorResponse(
        string $message = 'Error',
        $errors = [],
        int $statusCode = 400
    ): JsonResponse {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors'  => $errors,
        ], $statusCode);
    }
}