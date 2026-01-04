package model

type Pegawai struct {
	Id      uint   `json:"id" gorm:"primaryKey"`
	Nama    string `json:"nama" gorm:"not null"`
	NIP     string `json:"nip" gorm:"not null"`
	Jabatan string `json:"jabatan" gorm:"not null"`
	Pangkat string `json:"pangkat" gorm:"not null"`
	Unit    string `json:"unit" gorm:"not null"`
}

func (Pegawai) TableName() string {
	return "pegawai"
}
