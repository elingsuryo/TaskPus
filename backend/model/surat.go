package model

type Surat struct {
	Id              uint   `json:"id" gorm:"primaryKey"`
	NomorSurat      string `json:"nomor_surat" gorm:"unique;not null"`
	Status          string `json:"status" gorm:"not null"`
	TanggalBuat     string `json:"tanggal_buat" gorm:"not null"`
	Lama            string `json:"lama" gorm:"not null"`
	TanggalMulai    string `json:"tanggal_mulai" gorm:"not null"`
	TanggalSelesai  string `json:"tanggal_selesai" gorm:"not null"`
	KepalaPuskesmas string `json:"kepala_puskesmas" gorm:"not null"`
	JumlahPetugas   int    `json:"jumlah_petugas" gorm:"not null"`
	JenisPerjadin   string `json:"jenis_perjadin" gorm:"not null"`
	DalamRangkaId   uint   `json:"dalam_rangka_id" gorm:"not null"`
	AtasNama        string `json:"atas_nama" gorm:"not null"`
	TempatId        uint   `json:"tempat_id" gorm:"not null"`

	Petugas []Pegawai `json:"petugas" gorm:"many2many:surat_pegawai;"`
}

func (Surat) TableName() string {
	return "surat"
}
