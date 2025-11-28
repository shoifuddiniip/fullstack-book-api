package router

import (
	"backend/handlers"
	"backend/middleware"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

// SetupRouter mengkonfigurasi dan mengembalikan router dengan semua endpoints
func SetupRouter() *chi.Mux {
	r := chi.NewRouter()

	// Setup middleware
	r.Use(chiMiddleware.Recoverer)       // Recover from panics
	r.Use(middleware.LoggerMiddleware)   // Custom logger middleware

	// Setup CORS untuk komunikasi dengan frontend
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5173"}, // React default ports
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	// Initialize handler
	bookHandler := handlers.NewBookHandler()

	// Setup routes untuk book endpoints
	r.Route("/books", func(r chi.Router) {
		r.Get("/", bookHandler.GetAllBooks)       // GET /books
		r.Post("/", bookHandler.CreateBook)       // POST /books
		r.Get("/{id}", bookHandler.GetBookByID)   // GET /books/{id}
		r.Put("/{id}", bookHandler.UpdateBook)    // PUT /books/{id}
		r.Delete("/{id}", bookHandler.DeleteBook) // DELETE /books/{id}
	})

	return r
}
