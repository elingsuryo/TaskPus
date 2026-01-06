<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Petugas_Lain extends Model
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
     * Relasi One-to-Many ke Lpd
     */
    public function lpd()
    {
        return $this->hasMany(Lpd::class, 'petugas_lain_id');
    }
}
