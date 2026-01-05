<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lpd extends Model
{
    use HasFactory;

    protected $table = 'lpd';

    public $timestamps = false;

    protected $fillable = [
        'surat_id',
        'hasil_kegiatan',
        'dokumentasi',
    ];

    /**
     * Relasi ke Surat (Many LPD belongs to One Surat)
     */
    public function surat()
    {
        return $this->belongsTo(Surat::class, 'surat_id');
    }

    /**
     * Relasi Many-to-Many ke PetugasLain
     * lpd_petugas_lain (pivot)
     */
    public function petugasLain()
    {
        return $this->belongsToMany(Petugas_Lain::class, 'lpd_petugas_lain', 'lpd_id', 'petugas_lain_id');
    }
}
