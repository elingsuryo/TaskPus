package controller

import (
	"TaskPus/database"
	"TaskPus/helpers"
	"TaskPus/model"
	"TaskPus/structs"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetDalamRangka(c *gin.Context) {
	var dalamRangka []model.DalamRangka
	var response []structs.DalamRangkaResponse

	if err := database.DB.Find(&dalamRangka).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to fetch dalam rangka",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	for _, d := range dalamRangka {
		r := structs.DalamRangkaResponse{
			Id:   d.Id,
			Nama: d.Nama,
		}
		response = append(response, r)
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "List Data Dalam Rangka",
		Data:    response,
	})
}

func CreateDalamRangka(c *gin.Context) {
	var req = structs.CreateDalamRangkaRequest{}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	dalamRangka := model.DalamRangka{
		Nama: req.Nama,
	}

	if err := database.DB.Create(&dalamRangka).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to create dalam rangka",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	r := structs.DalamRangkaResponse{
		Id:   dalamRangka.Id,
		Nama: dalamRangka.Nama,
	}

	c.JSON(http.StatusCreated, structs.SuccessResponse{
		Success: true,
		Message: "Dalam rangka created successfully",
		Data:    r,
	})
}

func GetDalamRangkaByID(c *gin.Context) {
	id := c.Param("id")
	var dalamRangka model.DalamRangka
	if err := database.DB.First(&dalamRangka, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Dalam rangka not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	r := structs.DalamRangkaResponse{
		Id:   dalamRangka.Id,
		Nama: dalamRangka.Nama,
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Dalam rangka found",
		Data:    r,
	})
}

func UpdateDalamRangka(c *gin.Context) {
	var req = structs.UpdateDalamRangkaRequest{}
	id := c.Param("id")

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, structs.ErrorResponse{
			Success: false,
			Message: "Validation Errors",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	var dalamRangka model.DalamRangka
	if err := database.DB.First(&dalamRangka, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Dalam rangka not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	dalamRangka.Nama = req.Nama

	if err := database.DB.Save(&dalamRangka).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to update dalam rangka",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}

	r := structs.DalamRangkaResponse{
		Id:   dalamRangka.Id,
		Nama: dalamRangka.Nama,
	}

	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Dalam rangka updated successfully",
		Data:    r,
	})
}

func DeleteDalamRangka(c *gin.Context) {
	id := c.Param("id")
	var dalamRangka model.DalamRangka
	if err := database.DB.First(&dalamRangka, id).Error; err != nil {
		c.JSON(http.StatusNotFound, structs.ErrorResponse{
			Success: false,
			Message: "Dalam rangka not found",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	if err := database.DB.Delete(&dalamRangka).Error; err != nil {
		c.JSON(http.StatusInternalServerError, structs.ErrorResponse{
			Success: false,
			Message: "Failed to delete dalam rangka",
			Errors:  helpers.TranslateErrorMessage(err),
		})
		return
	}
	c.JSON(http.StatusOK, structs.SuccessResponse{
		Success: true,
		Message: "Dalam rangka deleted successfully",
	})
}
