package structs

type PegawaiResponse struct {
	Id      uint   `json:"id"`
	Nama    string `json:"nama"`
	NIP     string `json:"nip"`
	Jabatan string `json:"jabatan"`
	Pangkat string `json:"pangkat"`
	Unit    string `json:"unit"`
}

type CreatePegawaiRequest struct {
	Nama    string `json:"nama" validate:"required"`
	NIP     string `json:"nip" validate:"required"`
	Jabatan string `json:"jabatan" validate:"required"`
	Pangkat string `json:"pangkat" validate:"required"`
	Unit    string `json:"unit" validate:"required"`
}

type UpdatePegawaiRequest struct {
	Nama    string `json:"nama" validate:"required"`
	NIP     string `json:"nip" validate:"required"`
	Jabatan string `json:"jabatan" validate:"required"`
	Pangkat string `json:"pangkat" validate:"required"`
	Unit    string `json:"unit" validate:"required"`
}

type DeletePegawaiRequest struct {
	Id uint `json:"id" validate:"required"`
}
