<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\PetugasLainController;
use App\Http\Controllers\LpdController;
use App\Http\Controllers\TempatController;
use App\Http\Controllers\DalamRangkaController;
use App\Http\Controllers\GolonganController;


Route::post('/login', [AuthController::class, 'login'])->name('login');

// User Routes
Route::Get('/users', [UserController::class, 'getUsers']);
Route::Post('/users', [UserController::class, 'CreateUser']);
Route::Get('/users/{id}', [UserController::class, 'GetUserById']);
Route::Put('users/{id}', [UserController::class, 'updateUser']);
Route::Delete('/users/{id}', [UserController::class, 'deleteUser']);

// lpd Routes
Route::Get('/lpd', [LpdController::class, 'GetLpd']);
Route::Post('/lpd', [LpdController::class, 'CreateLpd']);
Route::Get('/lpd/{id}', [LpdController::class, 'GetLpdById']);
Route::Put('lpd/{id}', [LpdController::class, 'UpdateLpd']);
Route::Delete('/lpd/{id}', [LpdController::class, 'DeleteLpd']);
Route::Get('/lpd/{id}/pdf', [LpdController::class, 'GenerateLpdPdf']);

// PetugasLain Routes
Route::Get('/petugaslain', [PetugasLainController::class, 'GetPetugasLain']);
Route::Post('/petugaslain', [PetugasLainController::class, 'CreatePetugasLain']);
Route::Get('/petugaslain/{id}', [PetugasLainController::class, 'GetPetugasLainById']);
Route::Put('petugaslain/{id}', [PetugasLainController::class, 'UpdatePetugasLain']);
Route::Delete('/petugaslain/{id}', [PetugasLainController::class, 'DeletePetugasLain']);

// Tempat Routes
Route::Get('/tempat', [TempatController::class, 'GetTempat']);
Route::Post('/tempat', [TempatController::class, 'CreateTempat']);
Route::Get('/tempat/{id}', [TempatController::class, 'GetTempatById']);
Route::Put('tempat/{id}', [TempatController::class, 'UpdateTempat']);
Route::Delete('/tempat/{id}', [TempatController::class, 'DeleteTempat']);

// DalamRangka Routes
Route::Get('/dalamrangka', [DalamRangkaController::class, 'GetDalamRangka']);
Route::Post('/dalamrangka', [DalamRangkaController::class, 'CreateDalamRangka']);
Route::Get('/dalamrangka/{id}', [DalamRangkaController::class, 'GetDalamRangkaById']);
Route::Put('dalamrangka/{id}', [DalamRangkaController::class, 'UpdateDalamRangka']);
Route::Delete('/dalamrangka/{id}', [DalamRangkaController::class, 'DeleteDalamRangka']);

// Golongan Routes
Route::Get('/golongan', [GolonganController::class, 'GetGolongan']);
Route::Post('/golongan', [GolonganController::class, 'CreateGolongan']);
Route::Get('/golongan/{id}', [GolonganController::class, 'GetGolonganById']);
Route::Put('golongan/{id}', [GolonganController::class, 'UpdateGolongan']);
Route::Delete('/golongan/{id}', [GolonganController::class, 'DeleteGolongan']);


// Kelas Routes

    // Pegawai Routes
Route::Get('/pegawai', [PegawaiController::class, 'GetPegawai']);
Route::Post('/pegawai', [PegawaiController::class, 'CreatePegawai']);
Route::Get('/pegawai/{id}', [PegawaiController::class, 'GetPegawaiById']);
Route::Put('pegawai/{id}', [PegawaiController::class, 'UpdatePegawai']);
Route::Delete('/pegawai/{id}', [PegawaiController::class, 'DeletePegawai']);

// Surat Routes
Route::Get('/surat', [SuratController::class, 'GetSurat']);
Route::Post('/surat', [SuratController::class, 'CreateSurat']);
Route::Get('/surat/{id}', [SuratController::class, 'GetSuratById']);
Route::Put('surat/{id}', [SuratController::class, 'UpdateSurat']);
Route::Delete('/surat/{id}', [SuratController::class, 'DeleteSurat']);

