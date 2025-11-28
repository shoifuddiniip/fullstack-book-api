package main

import (
	"log"
	"net/http"

	"backend/router"
)

func main() {
	// Setup router dengan semua endpoints dan middleware
	r := router.SetupRouter()

	// Konfigurasi server
	port := ":8080"
	log.Printf("🚀 Server is running on http://localhost%s", port)
	log.Println("📚 Book Management API is ready!")
	log.Println("Endpoints:")
	log.Println("  GET    /books")
	log.Println("  GET    /books/{id}")
	log.Println("  POST   /books")
	log.Println("  PUT    /books/{id}")
	log.Println("  DELETE /books/{id}")

	// Start server
	if err := http.ListenAndServe(port, r); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
