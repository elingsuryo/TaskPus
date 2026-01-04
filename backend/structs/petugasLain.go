package structs

type PetugasLainResponse struct {
	Id      uint   `json:"id"`
	Nama    string `json:"nama"`
	NIP     string `json:"nip"`
	Pangkat string `json:"pangkat"`
	Jabatan string `json:"jabatan"`
	Unit    string `json:"unit"`
}

type CreatePetugasLainRequest struct {
	Nama    string `json:"nama" validate:"required"`
	NIP     string `json:"nip" validate:"required"`
	Pangkat string `json:"pangkat" validate:"required"`
	Jabatan string `json:"jabatan" validate:"required"`
	Unit    string `json:"unit" validate:"required"`
}

type UpdatePetugasLainRequest struct {
	Nama    string `json:"nama" validate:"required"`
	NIP     string `json:"nip" validate:"required"`
	Pangkat string `json:"pangkat" validate:"required"`
	Jabatan string `json:"jabatan" validate:"required"`
	Unit    string `json:"unit" validate:"required"`
}
