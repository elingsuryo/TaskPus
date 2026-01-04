package controller

import (
	"TaskPus/database"
	"TaskPus/helpers"
	"TaskPus/model"
	"TaskPus/structs"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetSurat(c *gin.Context) {
	var surat []model.Surat

	if err := database.DB.Find(&surat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to fetch surat",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	var response []structs.SuratResponse
	for _, k := range surat {
		response = append(response, structs.PetugasSuratRequest(k))
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "List Data Surat",
		Data:    response,
	})
}

func CreateSurat(c *gin.Context) {
	var req = structs.CreateSuratRequest{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	surat := model.Surat{
		NomorSurat:      req.NomorSurat,
		Status:          req.Status,
		TanggalBuat:     req.TanggalBuat,
		Lama:            req.Lama,
		TanggalMulai:    req.TanggalMulai,
		TanggalSelesai:  req.TanggalSelesai,
		KepalaPuskesmas: req.KepalaPuskesmas,
		JumlahPetugas:   req.JumlahPetugas,
		JenisPerjadin:   req.JenisPerjadin,
		DalamRangkaId:   req.DalamRangkaId,
		AtasNama:        req.AtasNama,
		TempatId:        req.TempatId,
	}

	// 🔎 Ambil mahasiswa
	var Petugas []model.Pegawai
	if err := database.DB.
		Where("id IN ?", req.PetugasIds).
		Find(&Petugas).Error; err != nil || len(Petugas) == 0 {
		c.JSON(http.StatusBadRequest, structs.ErrorResponse{
			Success: false,
			Message: "Petugas tidak ditemukan",
		})
		return
	}

	// 🔗 Tambahkan relasi
	if err := database.DB.
		Model(&surat).
		Association("Petugas").
		Append(&Petugas); err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal menambahkan petugas ke surat",
		})
		return
	}

	if err := database.DB.Create(&surat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to create surat",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	var response []structs.SuratResponse
	response = append(response, structs.PetugasSuratRequest(surat))

	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "Surat created successfully",
		Data:    response,
	})
}

func GetSuratById(c *gin.Context) {
	id := c.Param("id")

	var surat model.Surat

	if err := database.DB.First(&surat, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Surat not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	var response []structs.SuratResponse
	response = append(response, structs.PetugasSuratRequest(surat))

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Surat found",
		Data:    response,
	})
}

func UpdateSurat(c *gin.Context) {
	id := c.Param("id")

	var surat model.Surat
	if err := database.DB.First(&surat, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Surat not found",
		})
		return
	}

	var req structs.UpdateSuratRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Update field umum
	surat.Status = req.Status
	surat.TanggalBuat = req.TanggalBuat
	surat.Lama = req.Lama
	surat.TanggalMulai = req.TanggalMulai
	surat.TanggalSelesai = req.TanggalSelesai
	surat.KepalaPuskesmas = req.KepalaPuskesmas
	surat.JumlahPetugas = req.JumlahPetugas
	surat.JenisPerjadin = req.JenisPerjadin
	surat.DalamRangkaId = req.DalamRangkaId
	surat.AtasNama = req.AtasNama
	surat.TempatId = req.TempatId

	var Petugas []model.Pegawai
	//update petugas
	if err := database.DB.
		Where("id IN ?", surat.Petugas).
		Find(&Petugas).Error; err != nil || len(Petugas) == 0 {
		c.JSON(http.StatusBadRequest, structs.ErrorResponse{
			Success: false,
			Message: "Petugas tidak ditemukan",
		})
		return
	}
	surat.Petugas = Petugas

	// Update relasi
	if err := database.DB.
		Model(&surat).
		Association("Petugas").
		Replace(&Petugas); err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal memperbarui petugas di surat",
		})
		return
	}

	if err := database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&surat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update surat",
		})
		return
	}

	var response []structs.SuratResponse
	response = append(response, structs.PetugasSuratRequest(surat))

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "User updated successfully",
		Data:    response,
	})
}

func DeleteSurat(c *gin.Context) {
	id := c.Param("id")
	role := c.GetString("role")
	if role != "admin" {
		c.JSON(http.StatusForbidden, structs.ErrorResponse{
			Success: false,
			Message: "Anda tidak memiliki izin menghapus surat",
		})
		return
	}

	var surat model.Surat
	if err := database.DB.First(&surat, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Surat tidak ditemukan",
		})
		return
	}

	// 🔗 Hapus relasi mahasiswa terlebih dahulu
	if err := database.DB.
		Model(&surat).
		Association("Petugas").
		Clear(); err != nil {

		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal menghapus relasi Petugas",
		})
		return
	}

	// ❌ Hapus kelas
	if err := database.DB.Delete(&surat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Gagal menghapus surat",
		})
		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Surat berhasil dihapus",
	})
}
