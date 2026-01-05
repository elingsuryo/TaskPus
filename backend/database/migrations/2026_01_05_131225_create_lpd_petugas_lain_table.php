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
        Schema::create('lpd_petugas_lain', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lpd_id');
            $table->unsignedBigInteger('petugas_lain_id');

            $table->foreign('lpd_id')->references('id')->on('lpd')->onDelete('cascade');
            $table->foreign('petugas_lain_id')->references('id')->on('petugas_lain')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lpd_petugas_lain');
    }
};
