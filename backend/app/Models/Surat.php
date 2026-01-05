<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Surat extends Model
{
    use HasFactory;

    protected $table = 'surat';

    protected $fillable = [
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
    ];

    /**
     * Relasi Many-to-Many ke Pegawai
     */
    public function petugas()
    {
        return $this->belongsToMany(Pegawai::class, 'surat_pegawai', 'surat_id', 'pegawai_id');
    }

    /**
     * Relasi One-to-Many ke Lpd
     */
    public function lpd()
    {
        return $this->hasMany(Lpd::class, 'surat_id');
    }

    /**
     * Jika dalam_rangka_id refer ke tabel lain
     */
    public function dalamRangka()
    {
        return $this->belongsTo(DalamRangka::class, 'dalam_rangka_id');
    }

    /**
     * Jika tempat_id refer ke tabel lain
     */
    public function tempat()
    {
        return $this->belongsTo(Tempat::class, 'tempat_id');
    }
}
