package model

type Lpd struct {
	Id            uint   `json:"id" gorm:"primaryKey"`
	SuratId       uint   `json:"surat_id" gorm:"not null"`
	HasilKegiatan string `json:"hasil_kegiatan" gorm:"not null"`
	Dokumentasi   string `json:"dokumentasi" gorm:"not null"`
	PetugasId     uint   `json:"petugas_id" gorm:"not null"`

	Surat Surat `json:"surat" gorm:"foreignKey:SuratId;references:Id"`
}

func (Lpd) TableName() string {
	return "lpd"
}
