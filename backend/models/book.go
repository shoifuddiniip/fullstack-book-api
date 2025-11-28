package models

import (
	"errors"
	"strings"
)

// Book merepresentasikan struktur data buku
// Digunakan untuk menyimpan informasi dasar sebuah buku
type Book struct {
	ID            int    `json:"id"`
	Title         string `json:"title"`
	Author        string `json:"author"`
	PublishedYear int    `json:"published_year"`
}

// Validate melakukan validasi terhadap data buku
// Mengembalikan error jika ada field yang tidak valid
func (b *Book) Validate() error {
	// Validasi title tidak boleh kosong
	if strings.TrimSpace(b.Title) == "" {
		return errors.New("title is required")
	}

	// Validasi author tidak boleh kosong
	if strings.TrimSpace(b.Author) == "" {
		return errors.New("author is required")
	}

	// Validasi published_year harus valid (antara 1000-2100)
	if b.PublishedYear < 1000 || b.PublishedYear > 2100 {
		return errors.New("published year must be between 1000 and 2100")
	}

	return nil
}
