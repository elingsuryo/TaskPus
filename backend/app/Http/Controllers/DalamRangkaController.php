<?php

namespace App\Http\Controllers;

use App\Models\DalamRangka;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use function App\Helpers\successResponse;
use function App\Helpers\errorResponse;

class DalamRangkaController extends Controller
{
    //
    public function GetDalamRangka()
    {
        $dalamRangka = DalamRangka::get();

        $response = $dalamRangka->map(function ($u) {
            return [
                'id'         => $u->id,
                'nama'       => $u->nama,
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'List Data DalamRangka',
            'data'    => $response
        ]);
    }

    public function CreateDalamRangka(Request $request)
    {
        $data = $request->validate([
            'nama'     => 'required|string',
        ]);

        $dalamRangka = DalamRangka::create($data);

        return successResponse('DalamRangka created successfully', [
            'id'         => $dalamRangka->id,
            'nama'       => $dalamRangka->nama,
        ]);
    }

    public function GetDalamRangkaById($id)
    {
        $dalamRangka = DalamRangka::findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'DalamRangka found',
            'data'    => $this->DalamRangkaResponse($dalamRangka)
        ]);
    }

    public function UpdateDalamRangka(Request $request, $id)
    {
        $dalamRangka = DalamRangka::findOrFail($id);

        $data = $request->validate([
            'name'     => 'sometimes|required|string' . $dalamRangka->id,
        ]);

        $dalamRangka->update($data);

        return successResponse('DalamRangka updated successfully', $this->DalamRangkaResponse($dalamRangka));
    }

    public function DeleteDalamRangka($id)
    {
        $dalamRangka = DalamRangka::findOrFail($id);
        $dalamRangka->delete();

        return successResponse('DalamRangka deleted successfully');
    }

    private function DalamRangkaResponse(DalamRangka $dalamRangka)
    {
        return [
            'id'         => $dalamRangka->id,
            'nama'       => $dalamRangka->nama,
            'created_at' => $dalamRangka->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $dalamRangka->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
