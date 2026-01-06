<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SuratController extends Controller
{
    public function GetSurat()
    {
        $surat = Surat::with('petugas')->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Surat',
            'data' => $surat
        ]);
    }

    public function CreateSurat(Request $request)
    {
        $request->validate([
            'nomor_surat' => 'required|unique:surat',
            'status' => 'required',
            'tanggal_buat' => 'required',
            'lama' => 'required',
            'tanggal_mulai' => 'required',
            'tanggal_selesai' => 'required',
            'kepala_puskesmas' => 'required',
            'jumlah_petugas' => 'required|integer',
            'jenis_perjadin' => 'required',
            'dalam_rangka_id' => 'required|integer',
            'tempat_id' => 'required|integer',
            'atas_nama' => 'required',
            'petugas_ids' => 'required|array',
        ]);

        return DB::transaction(function () use ($request) {

            $surat = Surat::create($request->only([
                'nomor_surat',
                'status',
                'tanggal_buat',
                'lama',
                'tanggal_mulai',
                'tanggal_selesai',
                'kepala_puskesmas',
                'jumlah_petugas',
                'jenis_perjadin',
                'dalam_rangka_id',
                'tempat_id',
                'atas_nama',
            ]));

            $data['status'] = "Belum";

            $petugas = Pegawai::whereIn('id', $request->petugas_ids)->get();

            if ($petugas->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Petugas tidak ditemukan',
                ], 400);
            }

            $surat->petugas()->attach($petugas);

            return response()->json([
                'success' => true,
                'message' => 'Surat created successfully',
                'data' => $surat->load('petugas')
            ], 201);
        });
    }

    public function GetSuratById($id)
    {
        $surat = Surat::with('petugas')->find($id);

        if (!$surat) {
            return response()->json([
                'success' => false,
                'message' => 'Surat not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Surat found',
            'data' => $surat
        ]);
    }

    public function UpdateSurat(Request $request, $id)
    {
        $surat = Surat::find($id);

        if (!$surat) {
            return response()->json([
                'success' => false,
                'message' => 'Surat not found'
            ], 404);
        }

        $surat->update($request->only([
            'status',
            'tanggal_buat',
            'lama',
            'tanggal_mulai',
            'tanggal_selesai',
            'kepala_puskesmas',
            'jumlah_petugas',
            'jenis_perjadin',
            'dalam_rangka_id',
            'tempat_id',
            'atas_nama',
        ]));

        if ($request->has('petugas_ids')) {

            $petugas = Pegawai::whereIn('id', $request->petugas_ids)->get();

            if ($petugas->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Petugas tidak ditemukan',
                ], 400);
            }

            $surat->petugas()->sync($petugas);
        }

        return response()->json([
            'success' => true,
            'message' => 'Surat updated successfully',
            'data' => $surat->load('petugas')
        ]);
    }

    public function DeleteSurat(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki izin menghapus surat',
            ], 403);
        }

        $surat = Surat::find($id);

        if (!$surat) {
            return response()->json([
                'success' => false,
                'message' => 'Surat tidak ditemukan',
            ], 404);
        }

        $surat->petugas()->detach();
        $surat->delete();

        return response()->json([
            'success' => true,
            'message' => 'Surat berhasil dihapus',
        ]);
    }
}
