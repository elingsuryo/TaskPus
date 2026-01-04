package structs

type TempatResponse struct {
	Id   uint   `json:"id"`
	Nama string `json:"nama"`
}

type CreateTempatRequest struct {
	Nama string `json:"nama"`
}

type UpdateTempatRequest struct {
	Nama string `json:"nama"`
}
