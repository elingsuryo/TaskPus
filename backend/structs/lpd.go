package structs

type LpdResponse struct {
	Id            uint          `json:"id"`
	SuratId       uint          `json:"surat_id"`
	HasilKegiatan string        `json:"hasil_kegiatan"`
	Dokumentasi   string        `json:"dokumentasi"`
	PetugasId     uint          `json:"petugas_id"`
	Surat         SuratResponse `json:"surat"`
}

type CreateLpdRequest struct {
	SuratId       uint   `form:"surat_id" validate:"required"`
	HasilKegiatan string `form:"hasil_kegiatan" validate:"required"`
	Dokumentasi   string `form:"dokumentasi" validate:"required"`
	PetugasId     uint   `form:"petugas_id" validate:"required"`
}

type UpdateLpdRequest struct {
	SuratId       uint   `form:"surat_id"`
	HasilKegiatan string `form:"hasil_kegiatan"`
	Dokumentasi   string `form:"dokumentasi"`
	PetugasId     uint   `form:"petugas_id"`
}
