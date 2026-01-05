<?php

namespace App\Http\Controllers;

use App\Models\Petugas_Lain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use function App\Helpers\successResponse;
use function App\Helpers\errorResponse;

class PetugasLainController extends Controller
{
    //
    public function GetPetugas_Lain()
    {
        $petugas_Lain = Petugas_Lain::get();

        $response = $petugas_Lain->map(function ($u) {
            return [
                'id'         => $u->id,
                'nama'       => $u->nama,
                'nip'       => $u->nip,
                'jabatan'       => $u->jabatan,
                'pangkat'       => $u->pangkat,
                'unit'      => $u->unit,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'List Data Petugas_Lain',
            'data'    => $response
        ]);
    }

    public function CreatePetugas_Lain(Request $request)
    {
        $data = $request->validate([
            'nama'     => 'required|string',
            'nip'     => 'required|string',
            'jabatan'     => 'required|string',
            'pangkat'     => 'required|string',
            'unit'     => 'required|string',
        ]);

        $petugas_Lain = Petugas_Lain::create($data);

        return successResponse('Petugas_Lain created successfully', [
            'id'         => $petugas_Lain->id,
            'nama'       => $petugas_Lain->nama,
            'nip'   => $petugas_Lain->nip,
            'jabatan'   => $petugas_Lain->jabatan,
            'pangkat'   => $petugas_Lain->pangkat,
            'unit'   => $petugas_Lain->unit,
        ]);
    }

    public function GetPetugas_LainById($id)
    {
        $petugas_Lain = Petugas_Lain::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Petugas_Lain found',
            'data'    => $this->Petugas_LainResponse($petugas_Lain)
        ]);
    }

    public function UpdatePetugas_Lain(Request $request, $id)
    {
        $petugas_Lain = Petugas_Lain::findOrFail($id);

        $data = $request->validate([
            'name'     => 'sometimes|required|string' . $petugas_Lain->id,
            'nip'     => 'sometimes|required|string' . $petugas_Lain->id,
            'jabatan'     => 'sometimes|required|string' . $petugas_Lain->id,
            'pangkat'     => 'sometimes|required|string' . $petugas_Lain->id,
            'unit'     => 'sometimes|required|string' . $petugas_Lain->id,
        ]);

        $petugas_Lain->update($data);

        return successResponse('Petugas_Lain updated successfully', $this->Petugas_LainResponse($petugas_Lain));
    }

    public function DeletePetugas_Lain($id)
    {
        $petugas_Lain = Petugas_Lain::findOrFail($id);
        $petugas_Lain->delete();

        return successResponse('Petugas_Lain deleted successfully');
    }

    private function Petugas_LainResponse(Petugas_Lain $petugas_Lain)
    {
        return [
            'id'         => $petugas_Lain->id,
            'nama'       => $petugas_Lain->nama,
            'nip'   => $petugas_Lain->nip,
            'jabatan'   => $petugas_Lain->jabatan,
            'pangkat'   => $petugas_Lain->pangkat,
            'unit'   => $petugas_Lain->unit,
        ];
    }
}
