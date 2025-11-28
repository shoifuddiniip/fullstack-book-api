package middleware

import (
	"log"
	"net/http"
	"time"
)

// responseWriter adalah wrapper untuk http.ResponseWriter
// Digunakan untuk menangkap status code dari response
type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

// WriteHeader meng-override method WriteHeader untuk menangkap status code
func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

// LoggerMiddleware adalah custom middleware untuk logging request
// Mencatat method, path, status code, dan response time setiap request
func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Catat waktu mulai request
		start := time.Now()

		// Buat wrapper untuk response writer
		wrapped := &responseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK, // Default status code
		}

		// Panggil handler selanjutnya
		next.ServeHTTP(wrapped, r)

		// Hitung durasi request
		duration := time.Since(start)

		// Log informasi request
		log.Printf(
			"[%s] %s | Status: %d | Duration: %v",
			r.Method,
			r.URL.Path,
			wrapped.statusCode,
			duration,
		)
	})
}
