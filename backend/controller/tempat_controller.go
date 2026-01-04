package controller

import (
	"TaskPus/database"
	"TaskPus/helpers"
	"TaskPus/model"
	"TaskPus/structs"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTempat(c *gin.Context) {
	var tempat []model.Tempat
	var response []structs.TempatResponse

	if err := database.DB.Find(&tempat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to fetch tempat",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	for _, t := range tempat {
		r := structs.TempatResponse{
			Id:   t.Id,
			Nama: t.Nama,
		}
		response = append(response, r)
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "List Data Tempat",
		Data:    response,
	})
}

func CreateTempat(c *gin.Context) {
	var req = structs.CreateTempatRequest{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	tempat := model.Tempat{
		Nama: req.Nama,
	}

	if err := database.DB.Create(&tempat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to create tempat",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	r := structs.TempatResponse{
		Id:   tempat.Id,
		Nama: tempat.Nama,
	}

	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "Tempat created successfully",
		Data:    r,
	})
}

func GetTempatByID(c *gin.Context) {
	var tempat model.Tempat
	id := c.Param("id")
	if err := database.DB.First(&tempat, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Tempat not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	r := structs.TempatResponse{
		Id:   tempat.Id,
		Nama: tempat.Nama,
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Tempat found",
		Data:    r,
	})
}

func UpdateTempat(c *gin.Context) {
	var req = structs.UpdateTempatRequest{}
	id := c.Param("id")
	var tempat model.Tempat
	if err := database.DB.First(&tempat, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Tempat not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	tempat.Nama = req.Nama

	if err := database.DB.Save(&tempat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update tempat",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	r := structs.TempatResponse{
		Id:   tempat.Id,
		Nama: tempat.Nama,
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Tempat updated successfully",
		Data:    r,
	})
}

func DeleteTempat(c *gin.Context) {
	id := c.Param("id")
	var tempat model.Tempat
	if err := database.DB.First(&tempat, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Tempat not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	if err := database.DB.Delete(&tempat).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to delete tempat",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Tempat deleted successfully",
	})
}
