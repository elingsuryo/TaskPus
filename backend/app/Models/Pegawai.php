<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;

    protected $table = 'pegawai';

    protected $fillable = [
        'nama',
        'nip',
        'jabatan',
        'pangkat',
        'unit',
    ];

    /**
     * Relasi Many-to-Many ke Surat
     * surat_pegawai (pivot)
     */
    public function surat()
    {
        return $this->belongsToMany(Surat::class, 'surat_pegawai', 'pegawai_id', 'surat_id');
    }

    /**
     * Relasi One-to-Many ke Lpd
     */
    public function lpd()
    {
        return $this->hasMany(Lpd::class, 'petugas_id');
    }
}
