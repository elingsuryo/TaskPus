package structs

type DalamRangkaResponse struct {
	Id   uint   `json:"id"`
	Nama string `json:"nama"`
}

type CreateDalamRangkaRequest struct {
	Nama string `json:"nama" validate:"required"`
}

type UpdateDalamRangkaRequest struct {
	Nama string `json:"nama" validate:"required"`
}
