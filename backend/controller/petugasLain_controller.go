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

func GetPetugasLain(c *gin.Context) {
	var petugas []model.PetugasLain
	var response []structs.PetugasLainResponse

	if err := database.DB.Find(&petugas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to fetch petugas lain",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	for _, u := range petugas {
		r := structs.PetugasLainResponse{
			Id:      u.Id,
			Nama:    u.Nama,
			NIP:     u.NIP,
			Jabatan: u.Jabatan,
			Pangkat: u.Pangkat,
			Unit:    u.Unit,
		}
		response = append(response, r)
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "List Data Petugas Lain",
		Data:    response,
	})
}

func CreatePetugasLain(c *gin.Context) {
	var req = structs.CreatePetugasLainRequest{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	petugas := model.PetugasLain{
		Nama:    req.Nama,
		NIP:     req.NIP,
		Jabatan: req.Jabatan,
		Pangkat: req.Pangkat,
		Unit:    req.Unit,
	}

	if err := database.DB.Create(&petugas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to create petugas lain",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	r := structs.PetugasLainResponse{
		Id:      petugas.Id,
		Nama:    petugas.Nama,
		NIP:     petugas.NIP,
		Jabatan: petugas.Jabatan,
		Pangkat: petugas.Pangkat,
		Unit:    petugas.Unit,
	}

	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "Petugas Lain created successfully",
		Data:    r,
	})
}

func GetPetugasLainById(c *gin.Context) {
	id := c.Param("id")

	var petugas model.PetugasLain

	if err := database.DB.First(&petugas, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "User not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	r := structs.PetugasLainResponse{
		Id:      petugas.Id,
		Nama:    petugas.Nama,
		NIP:     petugas.NIP,
		Jabatan: petugas.Jabatan,
		Pangkat: petugas.Pangkat,
		Unit:    petugas.Unit,
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Petugas Lain found",
		Data:    r,
	})
}

func UpdatePetugasLain(c *gin.Context) {
	id := c.Param("id")

	var petugas model.PetugasLain
	if err := database.DB.First(&petugas, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Petugas Lain not found",
		})
		return
	}

	var req structs.UpdatePetugasLainRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Update field umum
	petugas.Nama = req.Nama
	petugas.NIP = req.NIP
	petugas.Jabatan = req.Jabatan
	petugas.Pangkat = req.Pangkat
	petugas.Unit = req.Unit

	if err := database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&petugas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update petugas lain",
		})
		return
	}

	// Response
	r := structs.PetugasLainResponse{
		Id:      petugas.Id,
		Nama:    petugas.Nama,
		NIP:     petugas.NIP,
		Jabatan: petugas.Jabatan,
		Pangkat: petugas.Pangkat,
		Unit:    petugas.Unit,
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Pegawai updated successfully",
		Data:    r,
	})
}

func DeletePetugasLain(c *gin.Context) {
	id := c.Param("id")

	var petugas model.PetugasLain

	if err := database.DB.First(&petugas, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Petugas Lain not found",
		})
		return
	}

	if err := database.DB.Delete(&petugas).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to delete petugas lain",
		})
		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Pegawai deleted successfully",
	})
}
