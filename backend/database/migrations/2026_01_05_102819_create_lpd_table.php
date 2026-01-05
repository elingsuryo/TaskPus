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
        Schema::create('lpd', function (Blueprint $table) {
            $table->id(); // Id

            $table->unsignedBigInteger('surat_id'); // SuratId
            $table->text('hasil_kegiatan'); // HasilKegiatan
            $table->string('dokumentasi'); // Dokumentasi (misal path file)

            $table->timestamps();

            // Foreign Keys
            $table->foreign('surat_id')
                ->references('id')
                ->on('surat')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lpd');
    }
};
