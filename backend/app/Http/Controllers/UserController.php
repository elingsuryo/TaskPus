<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use function App\Helpers\successResponse;
use function App\Helpers\errorResponse;

class UserController extends Controller
{

    public function GetUsers()
    {
        $users = User::get();

        $response = $users->map(function ($u) {
            return [
                'id'         => $u->id,
                'name'       => $u->name,
                'role'       => $u->role,
                'created_at' => $u->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $u->updated_at->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'List Data User',
            'data'    => $response
        ]);
    }

    public function CreateUser(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|unique:users,name',
            'password' => 'required|string|min:6',
            'role'     => 'required|string|in:admin,petugas_lain,tempat',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return successResponse('User created successfully', [
            'id'         => $user->id,
            'name'       => $user->name,
            'role'       => $user->role,
            'created_at' => $user->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
        ]);
    }

    public function GetUserById($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'User found',
            'data'    => $this->userResponse($user)
        ]);
    }

    public function UpdateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name'     => 'sometimes|required|string' . $user->id,
            'password' => 'sometimes|required|string|min:6',
            'role'     => 'sometimes|required|string|in:admin',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return successResponse('User updated successfully', $this->userResponse($user));
    }

    public function DeleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return successResponse('User deleted successfully');
    }

    private function userResponse(User $user)
    {
        return [
            'id'         => $user->id,
            'name'       => $user->name,
            'role'       => $user->role,
            'created_at' => $user->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
