<?php

namespace App\Http\Controllers;

use App\Models\Golongan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use function App\Helpers\successResponse;
use function App\Helpers\errorResponse;

class GolonganController extends Controller
{
    //
    public function GetGolongan()
    {
        $golongan = Golongan::get();

        $response = $golongan->map(function ($u) {
            return [
                'id'         => $u->id,
                'nama'       => $u->nama,
                'kategori'       => $u->kategori,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'List Data Golongan',
            'data'    => $response
        ]);
    }

    public function CreateGolongan(Request $request)
    {
        $data = $request->validate([
            'nama'     => 'required|string',
            'kategori'     => 'required|string',
        ]);

        $golongan = Golongan::create($data);

        return successResponse('Golongan created successfully', [
            'id'         => $golongan->id,
            'nama'       => $golongan->nama,
            'kategori'   => $golongan->kategori,
        ]);
    }

    public function GetGolonganById($id)
    {
        $golongan = Golongan::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Golongan found',
            'data'    => $this->GolonganResponse($golongan)
        ]);
    }

    public function UpdateGolongan(Request $request, $id)
    {
        $golongan = Golongan::findOrFail($id);

        $data = $request->validate([
            'name'     => 'sometimes|required|string' . $golongan->id,
            'kategori'     => 'sometimes|required|string' . $golongan->id,
        ]);

        $golongan->update($data);

        return successResponse('Golongan updated successfully', $this->GolonganResponse($golongan));
    }

    public function DeleteGolongan($id)
    {
        $golongan = Golongan::findOrFail($id);
        $golongan->delete();

        return successResponse('Golongan deleted successfully');
    }

    private function GolonganResponse(Golongan $golongan)
    {
        return [
            'id'         => $golongan->id,
            'nama'       => $golongan->nama,
            'kategori'   => $golongan->kategori,
            'created_at' => $golongan->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $golongan->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
