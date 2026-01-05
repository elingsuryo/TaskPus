<?php

namespace App\Http\Controllers;

use App\Models\Tempat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use function App\Helpers\successResponse;
use function App\Helpers\errorResponse;

class TempatController extends Controller
{
    //
    public function GetTempat()
    {
        $tempat = Tempat::get();

        $response = $tempat->map(function ($u) {
            return [
                'id'         => $u->id,
                'nama'       => $u->nama,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'List Data User',
            'data'    => $response
        ]);
    }

    public function CreateTempat(Request $request)
    {
        $data = $request->validate([
            'nama'     => 'required|string',
        ]);

        $user = Tempat::create($data);

        return successResponse('Tempat created successfully', [
            'id'         => $user->id,
            'nama'       => $user->nama,
        ]);
    }

    public function GetTempatById($id)
    {
        $tempat = Tempat::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Tempat found',
            'data'    => $this->tempatResponse($tempat)
        ]);
    }

    public function UpdateTempat(Request $request, $id)
    {
        $tempat = Tempat::findOrFail($id);

        $data = $request->validate([
            'name'     => 'sometimes|required|string' . $tempat->id,
        ]);

        $tempat->update($data);

        return successResponse('Tempat updated successfully', $this->tempatResponse($tempat));
    }

    public function DeleteTempat($id)
    {
        $tempat = Tempat::findOrFail($id);
        $tempat->delete();

        return successResponse('Tempat deleted successfully');
    }

    private function tempatResponse(Tempat $tempat)
    {
        return [
            'id'         => $tempat->id,
            'nama'       => $tempat->nama,
            'created_at' => $tempat->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $tempat->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
