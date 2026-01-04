package helpers

import (
	"TaskPus/config"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte(config.GetEnv("JWT_KEY", "secret_key"))

func JwtGenerateToken(userID uint, role string) string {
	expirationTime := time.Now().Add(1 * time.Hour).Unix()

	claims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     expirationTime,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString(jwtKey)

	return tokenString
}
