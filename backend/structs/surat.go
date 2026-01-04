package structs

import "TaskPus/model"

type SuratResponse struct {
	Id              uint              `json:"id"`
	NomorSurat      string            `json:"nomor_surat"`
	Status          string            `json:"status"`
	TanggalBuat     string            `json:"tanggal_buat"`
	Lama            string            `json:"lama"`
	TanggalMulai    string            `json:"tanggal_mulai"`
	TanggalSelesai  string            `json:"tanggal_selesai"`
	KepalaPuskesmas string            `json:"kepala_puskesmas"`
	JumlahPetugas   int               `json:"jumlah_petugas"`
	Petugas         []PegawaiResponse `json:"petugas"`
	JenisPerjadin   string            `json:"jenis_perjadin"`
	DalamRangkaId   uint              `json:"dalam_rangka_id"`
	AtasNama        string            `json:"atas_nama"`
	TempatId        uint              `json:"tempat_id"`
}

type CreateSuratRequest struct {
	NomorSurat      string `json:"nomor_surat" validate:"required"`
	Status          string `json:"status" validate:"required"`
	TanggalBuat     string `json:"tanggal_buat" validate:"required"`
	Lama            string `json:"lama" validate:"required"`
	TanggalMulai    string `json:"tanggal_mulai" validate:"required"`
	TanggalSelesai  string `json:"tanggal_selesai" validate:"required"`
	KepalaPuskesmas string `json:"kepala_puskesmas" validate:"required"`
	JumlahPetugas   int    `json:"jumlah_petugas" validate:"required"`
	JenisPerjadin   string `json:"jenis_perjadin" validate:"required"`
	DalamRangkaId   uint   `json:"dalam_rangka_id" validate:"required"`
	AtasNama        string `json:"atas_nama" validate:"required"`
	TempatId        uint   `json:"tempat_id" validate:"required"`
	PetugasIds      []uint `json:"petugas_id" validate:"required,dive,required"`
}

type UpdateSuratRequest struct {
	Status          string `json:"status" validate:"required"`
	TanggalBuat     string `json:"tanggal_buat" validate:"required"`
	Lama            string `json:"lama" validate:"required"`
	TanggalMulai    string `json:"tanggal_mulai" validate:"required"`
	TanggalSelesai  string `json:"tanggal_selesai" validate:"required"`
	KepalaPuskesmas string `json:"kepala_puskesmas" validate:"required"`
	JumlahPetugas   int    `json:"jumlah_petugas" validate:"required"`
	JenisPerjadin   string `json:"jenis_perjadin" validate:"required"`
	DalamRangkaId   uint   `json:"dalam_rangka_id" validate:"required"`
	AtasNama        string `json:"atas_nama" validate:"required"`
	TempatId        uint   `json:"tempat_id" validate:"required"`
	PetugasIds      []uint `json:"petugas_id" validate:"required,dive,required"`
}

func PetugasSuratRequest(k model.Surat) SuratResponse {
	var petugas []PegawaiResponse
	for _, p := range k.Petugas {
		petugas = append(petugas, PegawaiResponse{
			Id:   p.Id,
			Nama: p.Nama,
		})
	}
	return SuratResponse{
		Id:              k.Id,
		NomorSurat:      k.NomorSurat,
		Status:          k.Status,
		TanggalBuat:     k.TanggalBuat,
		Lama:            k.Lama,
		TanggalMulai:    k.TanggalMulai,
		TanggalSelesai:  k.TanggalSelesai,
		KepalaPuskesmas: k.KepalaPuskesmas,
		JumlahPetugas:   k.JumlahPetugas,
		Petugas:         petugas,
		JenisPerjadin:   k.JenisPerjadin,
		DalamRangkaId:   k.DalamRangkaId,
		AtasNama:        k.AtasNama,
		TempatId:        k.TempatId,
	}
}

func PetugasCreateSuratResponse(k model.Surat) SuratResponse {
	var petugas []PegawaiResponse
	for _, p := range k.Petugas {
		petugas = append(petugas, PegawaiResponse{
			Id:   p.Id,
			Nama: p.Nama,
		})
	}

	return SuratResponse{
		Id:              k.Id,
		NomorSurat:      k.NomorSurat,
		Status:          k.Status,
		TanggalBuat:     k.TanggalBuat,
		Lama:            k.Lama,
		TanggalMulai:    k.TanggalMulai,
		TanggalSelesai:  k.TanggalSelesai,
		KepalaPuskesmas: k.KepalaPuskesmas,
		JumlahPetugas:   k.JumlahPetugas,
		Petugas:         petugas,
		JenisPerjadin:   k.JenisPerjadin,
		DalamRangkaId:   k.DalamRangkaId,
		AtasNama:        k.AtasNama,
		TempatId:        k.TempatId,
	}
}
