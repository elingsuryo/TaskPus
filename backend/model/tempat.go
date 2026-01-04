package model

type Tempat struct {
	Id   uint   `json:"id" gorm:"primaryKey"`
	Nama string `json:"nama" gorm:"not null"`
}

func (Tempat) TableName() string {
	return "tempat"
}
