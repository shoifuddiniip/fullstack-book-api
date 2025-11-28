package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"backend/models"
	"backend/storage"

	"github.com/go-chi/chi/v5"
)

// BookHandler merepresentasikan handler untuk operasi buku
type BookHandler struct {
	store *storage.BookStore
}

// NewBookHandler membuat instance baru BookHandler
func NewBookHandler() *BookHandler {
	return &BookHandler{
		store: storage.GetInstance(),
	}
}

// GetAllBooks menangani request GET /books
// Mengembalikan daftar semua buku yang tersimpan
func (h *BookHandler) GetAllBooks(w http.ResponseWriter, r *http.Request) {
	books := h.store.GetAll()
	RespondSuccess(w, "Books retrieved successfully", books)
}

// GetBookByID menangani request GET /books/{id}
// Mengembalikan detail buku berdasarkan ID
func (h *BookHandler) GetBookByID(w http.ResponseWriter, r *http.Request) {
	// Ambil ID dari URL parameter
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		RespondBadRequest(w, "Invalid book ID")
		return
	}

	// Cari buku berdasarkan ID
	book, err := h.store.GetByID(id)
	if err != nil {
		RespondNotFound(w, "Book not found")
		return
	}

	RespondSuccess(w, "Book retrieved successfully", book)
}

// CreateBook menangani request POST /books
// Menambahkan buku baru ke storage
func (h *BookHandler) CreateBook(w http.ResponseWriter, r *http.Request) {
	var book models.Book

	// Parse request body ke struct Book
	if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
		RespondBadRequest(w, "Invalid request body")
		return
	}

	// Validasi data buku
	if err := book.Validate(); err != nil {
		RespondBadRequest(w, err.Error())
		return
	}

	// Simpan buku baru
	createdBook := h.store.Create(&book)
	RespondCreated(w, "Book created successfully", createdBook)
}

// UpdateBook menangani request PUT /books/{id}
// Memperbarui informasi buku yang sudah ada
func (h *BookHandler) UpdateBook(w http.ResponseWriter, r *http.Request) {
	// Ambil ID dari URL parameter
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		RespondBadRequest(w, "Invalid book ID")
		return
	}

	var book models.Book

	// Parse request body ke struct Book
	if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
		RespondBadRequest(w, "Invalid request body")
		return
	}

	// Validasi data buku
	if err := book.Validate(); err != nil {
		RespondBadRequest(w, err.Error())
		return
	}

	// Update buku
	updatedBook, err := h.store.Update(id, &book)
	if err != nil {
		RespondNotFound(w, "Book not found")
		return
	}

	RespondSuccess(w, "Book updated successfully", updatedBook)
}

// DeleteBook menangani request DELETE /books/{id}
// Menghapus buku berdasarkan ID
func (h *BookHandler) DeleteBook(w http.ResponseWriter, r *http.Request) {
	// Ambil ID dari URL parameter
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		RespondBadRequest(w, "Invalid book ID")
		return
	}

	// Hapus buku
	if err := h.store.Delete(id); err != nil {
		RespondNotFound(w, "Book not found")
		return
	}

	RespondSuccess(w, "Book deleted successfully", nil)
}
