<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use function App\Helpers\successResponse;
use function App\Helpers\errorResponse;

class PegawaiController extends Controller
{
    //
    public function GetPegawai()
    {
        $pegawai = Pegawai::get();

        $response = $pegawai->map(function ($u) {
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
            'message' => 'List Data Pegawai',
            'data'    => $response
        ]);
    }

    public function CreatePegawai(Request $request)
    {
        $data = $request->validate([
            'nama'     => 'required|string',
            'nip'     => 'required|string',
            'jabatan'     => 'required|string',
            'pangkat'     => 'required|string',
            'unit'     => 'required|string',
        ]);

        $pegawai = Pegawai::create($data);

        return successResponse('Pegawai created successfully', [
            'id'         => $pegawai->id,
            'nama'       => $pegawai->nama,
            'nip'   => $pegawai->nip,
            'jabatan'   => $pegawai->jabatan,
            'pangkat'   => $pegawai->pangkat,
            'unit'   => $pegawai->unit,
        ]);
    }

    public function GetPegawaiById($id)
    {
        $pegawai = Pegawai::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Pegawai found',
            'data'    => $this->PegawaiResponse($pegawai)
        ]);
    }

    public function UpdatePegawai(Request $request, $id)
    {
        $pegawai = Pegawai::findOrFail($id);

        $data = $request->validate([
            'name'     => 'sometimes|required|string' . $pegawai->id,
            'nip'     => 'sometimes|required|string' . $pegawai->id,
            'jabatan'     => 'sometimes|required|string' . $pegawai->id,
            'pangkat'     => 'sometimes|required|string' . $pegawai->id,
            'unit'     => 'sometimes|required|string' . $pegawai->id,
        ]);

        $pegawai->update($data);

        return successResponse('Pegawai updated successfully', $this->PegawaiResponse($pegawai));
    }

    public function DeletePegawai($id)
    {
        $pegawai = Pegawai::findOrFail($id);
        $pegawai->delete();

        return successResponse('Pegawai deleted successfully');
    }

    private function PegawaiResponse(Pegawai $pegawai)
    {
        return [
            'id'         => $pegawai->id,
            'nama'       => $pegawai->nama,
            'nip'   => $pegawai->nip,
            'jabatan'   => $pegawai->jabatan,
            'pangkat'   => $pegawai->pangkat,
            'unit'   => $pegawai->unit,
        ];
    }
}
