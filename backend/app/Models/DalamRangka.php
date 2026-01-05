<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DalamRangka extends Model
{
    use HasFactory;

    protected $table = 'dalam_rangka';

    protected $fillable = [
        'nama',
    ];

    /**
     * Relasi One-to-Many ke Surat
     */
    public function surat()
    {
        return $this->hasMany(Surat::class, 'dalam_rangka_id');
    }
}
