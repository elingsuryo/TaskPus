package main

import (
	"TaskPus/config"
	"TaskPus/database"
	"TaskPus/routes"
)

func main() {

	//load config .env
	config.LoadEnv()

	//inisialisasi database
	database.InitDB()

	//inisialiasai Gin
	r := routes.SetupRouter()

	//mulai server
	r.Run(":" + config.GetEnv("APP_PORT", "3000"))
}
