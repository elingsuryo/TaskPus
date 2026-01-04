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

func GetPegawai(c *gin.Context) {
	var pegawai []model.Pegawai
	var response []structs.PegawaiResponse

	if err := database.DB.Find(&pegawai).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to fetch pegawai",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	for _, u := range pegawai {
		r := structs.PegawaiResponse{
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
		Message: "List Data Pegawai",
		Data:    response,
	})
}

func CreatePegawai(c *gin.Context) {
	var req = structs.CreatePegawaiRequest{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	pegawai := model.Pegawai{
		Nama:    req.Nama,
		NIP:     req.NIP,
		Jabatan: req.Jabatan,
		Pangkat: req.Pangkat,
		Unit:    req.Unit,
	}

	if err := database.DB.Create(&pegawai).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to create pegawai",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	r := structs.PegawaiResponse{
		Id:      pegawai.Id,
		Nama:    pegawai.Nama,
		NIP:     pegawai.NIP,
		Jabatan: pegawai.Jabatan,
		Pangkat: pegawai.Pangkat,
		Unit:    pegawai.Unit,
	}

	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "Pegawai created successfully",
		Data:    r,
	})
}

func GetPegawaiById(c *gin.Context) {
	id := c.Param("id")

	var pegawai model.Pegawai

	if err := database.DB.First(&pegawai, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "User not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	r := structs.PegawaiResponse{
		Id:      pegawai.Id,
		Nama:    pegawai.Nama,
		NIP:     pegawai.NIP,
		Jabatan: pegawai.Jabatan,
		Pangkat: pegawai.Pangkat,
		Unit:    pegawai.Unit,
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Pegawai found",
		Data:    r,
	})
}

func UpdatePegawai(c *gin.Context) {
	id := c.Param("id")

	var pegawai model.Pegawai
	if err := database.DB.First(&pegawai, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Pegawai not found",
		})
		return
	}

	var req structs.UpdatePegawaiRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	// Update field umum
	pegawai.Nama = req.Nama
	pegawai.NIP = req.NIP
	pegawai.Jabatan = req.Jabatan
	pegawai.Pangkat = req.Pangkat
	pegawai.Unit = req.Unit

	if err := database.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(&pegawai).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update pegawai",
		})
		return
	}

	// Response
	r := structs.PegawaiResponse{
		Id:      pegawai.Id,
		Nama:    pegawai.Nama,
		NIP:     pegawai.NIP,
		Jabatan: pegawai.Jabatan,
		Pangkat: pegawai.Pangkat,
		Unit:    pegawai.Unit,
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Pegawai updated successfully",
		Data:    r,
	})
}

func DeletePegawai(c *gin.Context) {
	id := c.Param("id")

	var pegawai model.Pegawai

	if err := database.DB.First(&pegawai, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Pegawai not found",
		})
		return
	}

	if err := database.DB.Delete(&pegawai).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to delete pegawai",
		})
		return
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Pegawai deleted successfully",
	})
}
