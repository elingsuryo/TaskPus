<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surat', function (Blueprint $table) {
             $table->id(); // Id (primary key)

            $table->string('nomor_surat')->unique(); // NomorSurat
            $table->string('status'); // Status
            $table->string('tanggal_buat'); // TanggalBuat
            $table->string('lama'); // Lama
            $table->string('tanggal_mulai'); // TanggalMulai
            $table->string('tanggal_selesai'); // TanggalSelesai
            $table->string('kepala_puskesmas'); // KepalaPuskesmas
            $table->integer('jumlah_petugas'); // JumlahPetugas
            $table->string('jenis_perjadin'); // JenisPerjadin

            $table->unsignedBigInteger('dalam_rangka_id'); // DalamRangkaId
            $table->unsignedBigInteger('tempat_id'); // TempatId

            $table->string('atas_nama'); // AtasNama

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat');
    }
};
