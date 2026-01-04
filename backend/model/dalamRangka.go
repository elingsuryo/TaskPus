package model

type DalamRangka struct {
	Id   uint   `json:"id" gorm:"primaryKey"`
	Nama string `json:"nama" gorm:"not null"`
}
