<?php

namespace App\Http\Controllers;

use App\Models\Lpd;
use App\Models\Surat;
use App\Models\Petugas_Lain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;


class LpdController extends Controller
{
    public function GetLpd()
    {
        $lpd = Lpd::with(['surat', 'petugasLain'])->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data LPD',
            'data' => $lpd
        ]);
    }

    public function CreateLpd(Request $request)
    {
        $request->validate([
            'surat_id'          => 'required|exists:surat,id',
            'hasil_kegiatan'    => 'required|string',
            'dokumentasi'       => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'petugas_lain_ids'  => 'nullable|array',
            'petugas_lain_ids.*'=> 'exists:petugas_lain,id'
        ]);

        return DB::transaction(function () use ($request) {

            $path = null;

            if ($request->hasFile('dokumentasi')) {
                $path = $request->file('dokumentasi')->store('dokumentasi_lpd', 'public');
            }

            $lpd = Lpd::create([
                'surat_id'        => $request->input('surat_id'),
                'hasil_kegiatan'  => $request->input('hasil_kegiatan'),
                'dokumentasi'     => $path,
            ]);

            if ($request->filled('petugas_lain_ids')) {
                $lpd->petugasLain()->attach($request->petugas_lain_ids);
            }

            // Update status surat → Sudah
        Surat::where('id', $request->surat_id)
            ->update([
                'status' => 'Sudah'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'LPD created successfully',
                'data' => $lpd->load(['surat', 'petugasLain'])
            ], 201);
        });
    }

    public function GenerateLpdPdf($id)
{
    $lpd = Lpd::with(['surat', 'petugasLain'])->find($id);

    if (!$lpd) {
        return response()->json([
            'success' => false,
            'message' => 'LPD not found'
        ], 404);
    }

    $pdf = Pdf::loadView('pdf.lpd', compact('lpd'))
        ->setPaper('a4', 'portrait');

    return $pdf->download('LPD-'.$lpd->id.'.pdf');
}

    public function GetLpdById($id)
    {
        $lpd = Lpd::with(['surat', 'petugasLain'])->find($id);

        if (!$lpd) {
            return response()->json([
                'success' => false,
                'message' => 'LPD not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'LPD found',
            'data' => $lpd
        ]);
    }

    public function UpdateLpd(Request $request, $id)
    {
        $lpd = Lpd::find($id);

        if (!$lpd) {
            return response()->json([
                'success' => false,
                'message' => 'LPD not found'
            ], 404);
        }

        $request->validate([
            'surat_id'           => 'nullable|exists:surat,id',
            'hasil_kegiatan'     => 'nullable|string',
            'dokumentasi'        => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'petugas_lain_ids'   => 'nullable|array',
            'petugas_lain_ids.*' => 'exists:petugas_lain,id'
        ]);

        if ($request->hasFile('dokumentasi')) {
            $path = $request->file('dokumentasi')->store('dokumentasi_lpd', 'public');
            $lpd->dokumentasi = $path;
        }

        $lpd->update($request->only([
            'surat_id',
            'hasil_kegiatan',
        ]));

        if ($request->has('petugas_lain_ids')) {
            $lpd->petugasLain()->sync($request->petugas_lain_ids ?? []);
        }

        return response()->json([
            'success' => true,
            'message' => 'LPD updated successfully',
            'data' => $lpd->load(['surat', 'petugasLain'])
        ]);
    }

    public function DeleteLpd($id)
    {
        $lpd = Lpd::find($id);

        if (!$lpd) {
            return response()->json([
                'success' => false,
                'message' => 'LPD not found'
            ], 404);
        }

        $lpd->petugasLain()->detach();
        $lpd->delete();

        return response()->json([
            'success' => true,
            'message' => 'LPD deleted successfully'
        ]);
    }
}
