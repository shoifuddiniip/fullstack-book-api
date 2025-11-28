package storage

import (
	"errors"
	"sync"

	"backend/models"
)

// BookStore merepresentasikan in-memory storage untuk buku
// Menggunakan Singleton Pattern untuk memastikan hanya ada satu instance
type BookStore struct {
	books  map[int]*models.Book // Map untuk menyimpan buku dengan ID sebagai key
	nextID int                  // Counter untuk generate ID baru
	mu     sync.RWMutex         // Mutex untuk thread-safe operations
}

var (
	instance *BookStore
	once     sync.Once
)

// GetInstance mengembalikan singleton instance dari BookStore
// Menggunakan sync.Once untuk memastikan hanya dibuat satu kali
func GetInstance() *BookStore {
	once.Do(func() {
		instance = &BookStore{
			books:  make(map[int]*models.Book),
			nextID: 1,
		}
		// Menambahkan data dummy untuk testing
		instance.seedData()
	})
	return instance
}

// seedData menambahkan data awal untuk keperluan testing
func (bs *BookStore) seedData() {
	dummyBooks := []*models.Book{
		{ID: 1, Title: "Go Programming", Author: "John Doe", PublishedYear: 2020},
		{ID: 2, Title: "Web Development with React", Author: "Jane Smith", PublishedYear: 2021},
		{ID: 3, Title: "Clean Code", Author: "Robert C. Martin", PublishedYear: 2008},
	}

	for _, book := range dummyBooks {
		bs.books[book.ID] = book
		if book.ID >= bs.nextID {
			bs.nextID = book.ID + 1
		}
	}
}

// GetAll mengembalikan semua buku yang tersimpan
func (bs *BookStore) GetAll() []*models.Book {
	bs.mu.RLock()
	defer bs.mu.RUnlock()

	books := make([]*models.Book, 0, len(bs.books))
	for _, book := range bs.books {
		books = append(books, book)
	}
	return books
}

// GetByID mengembalikan buku berdasarkan ID
// Mengembalikan error jika buku tidak ditemukan
func (bs *BookStore) GetByID(id int) (*models.Book, error) {
	bs.mu.RLock()
	defer bs.mu.RUnlock()

	book, exists := bs.books[id]
	if !exists {
		return nil, errors.New("book not found")
	}
	return book, nil
}

// Create menambahkan buku baru ke storage
// Otomatis generate ID untuk buku baru
func (bs *BookStore) Create(book *models.Book) *models.Book {
	bs.mu.Lock()
	defer bs.mu.Unlock()

	book.ID = bs.nextID
	bs.books[book.ID] = book
	bs.nextID++
	return book
}

// Update memperbarui data buku yang sudah ada
// Mengembalikan error jika buku tidak ditemukan
func (bs *BookStore) Update(id int, book *models.Book) (*models.Book, error) {
	bs.mu.Lock()
	defer bs.mu.Unlock()

	if _, exists := bs.books[id]; !exists {
		return nil, errors.New("book not found")
	}

	book.ID = id
	bs.books[id] = book
	return book, nil
}

// Delete menghapus buku berdasarkan ID
// Mengembalikan error jika buku tidak ditemukan
func (bs *BookStore) Delete(id int) error {
	bs.mu.Lock()
	defer bs.mu.Unlock()

	if _, exists := bs.books[id]; !exists {
		return errors.New("book not found")
	}

	delete(bs.books, id)
	return nil
}
