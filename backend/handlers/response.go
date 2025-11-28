package handlers

import (
	"encoding/json"
	"net/http"
)

// APIResponse merepresentasikan struktur response API yang konsisten
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// RespondJSON mengirimkan response JSON dengan format yang konsisten
// Digunakan untuk semua response sukses dan error (DRY principle)
func RespondJSON(w http.ResponseWriter, statusCode int, response APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(response)
}

// RespondSuccess mengirimkan response sukses dengan data
func RespondSuccess(w http.ResponseWriter, message string, data interface{}) {
	RespondJSON(w, http.StatusOK, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// RespondCreated mengirimkan response untuk resource yang baru dibuat
func RespondCreated(w http.ResponseWriter, message string, data interface{}) {
	RespondJSON(w, http.StatusCreated, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// RespondError mengirimkan response error dengan status code dan pesan error
func RespondError(w http.ResponseWriter, statusCode int, errorMessage string) {
	RespondJSON(w, statusCode, APIResponse{
		Success: false,
		Error:   errorMessage,
	})
}

// RespondBadRequest mengirimkan response untuk bad request (400)
func RespondBadRequest(w http.ResponseWriter, errorMessage string) {
	RespondError(w, http.StatusBadRequest, errorMessage)
}

// RespondNotFound mengirimkan response untuk resource not found (404)
func RespondNotFound(w http.ResponseWriter, errorMessage string) {
	RespondError(w, http.StatusNotFound, errorMessage)
}

// RespondInternalError mengirimkan response untuk internal server error (500)
func RespondInternalError(w http.ResponseWriter, errorMessage string) {
	RespondError(w, http.StatusInternalServerError, errorMessage)
}
