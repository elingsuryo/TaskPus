package routes

import (
	"TaskPus/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {

	//initialize gin
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	// route login
	router.POST("/api/login", controller.Login)
	router.POST("/api/users", controller.CreateUser)
	router.GET("/api/users", controller.GetUser)
	router.GET("/api/users/:id", controller.GetUserById)
	router.PUT("/api/users/:id", controller.UpdateUser)
	router.DELETE("/api/users/:id", controller.DeleteUser)

	// route pegawai
	router.POST("/api/pegawai", controller.CreatePegawai)
	router.GET("/api/pegawai", controller.GetPegawai)
	router.GET("/api/pegawai/:id", controller.GetPegawaiById)
	router.PUT("/api/pegawai/:id", controller.UpdatePegawai)
	router.DELETE("/api/pegawai/:id", controller.DeletePegawai)

	// route Surat
	router.POST("/api/surat", controller.CreateSurat)
	router.GET("/api/surat", controller.GetSurat)
	router.GET("/api/surat/:id", controller.GetSuratById)
	router.PUT("/api/surat/:id", controller.UpdateSurat)
	router.DELETE("/api/surat/:id", controller.DeleteSurat)

	// route LPD
	router.POST("/api/lpd", controller.CreateLpd)
	router.GET("/api/lpd", controller.GetLpd)
	router.GET("/api/lpd/:id", controller.GetLpdById)
	router.PUT("/api/lpd/:id", controller.UpdateLpd)
	router.DELETE("/api/lpd/:id", controller.DeleteLpd)

	// route DalamRangka
	router.POST("/api/dalamrangka", controller.CreateDalamRangka)
	router.GET("/api/dalamrangka", controller.GetDalamRangka)
	router.GET("/api/dalamrangka/:id", controller.GetDalamRangkaByID)
	router.PUT("/api/dalamrangka/:id", controller.UpdateDalamRangka)
	router.DELETE("/api/dalamrangka/:id", controller.DeleteDalamRangka)

	// route Tempat
	router.POST("/api/tempat", controller.CreateTempat)
	router.GET("/api/tempat", controller.GetTempat)
	router.GET("/api/tempat/:id", controller.GetTempatByID)
	router.PUT("/api/tempat/:id", controller.UpdateTempat)
	router.DELETE("/api/tempat/:id", controller.DeleteTempat)

	// route PetugasLain
	router.POST("/api/petugaslain", controller.CreatePetugasLain)
	router.GET("/api/petugaslain", controller.GetPetugasLain)
	router.GET("/api/petugaslain/:id", controller.GetPetugasLainById)
	router.PUT("/api/petugaslain/:id", controller.UpdatePetugasLain)
	router.DELETE("/api/petugaslain/:id", controller.DeletePetugasLain)

	return router
}
