# 📚 Book Management System — Fullstack Case Study

Project ini adalah implementasi case study untuk posisi **Fullstack Developer**, sesuai instruksi yang diberikan. Aplikasi ini terdiri dari:

- **Backend:** RESTful API menggunakan **Golang + go-chi v5**
- **Frontend:** Halaman antarmuka user-friendly untuk mengelola data buku

---

## 🚀 Features

### **Backend**
- GET `/books` — Mendapatkan semua buku  
- GET `/books/{id}` — Mengambil detail buku berdasarkan ID  
- POST `/books` — Menambah buku baru  
- PUT `/books/{id}` — Memperbarui buku  
- DELETE `/books/{id}` — Menghapus buku  
- In-memory storage (slice/map)  
- Modular structure (handler, model, router)  
- Custom middleware: **LoggerMiddleware**  
- JSON response formatting  
- Komentar pada setiap fungsi  

### **Frontend**
- Menampilkan daftar buku  
- Form tambah buku  
- Edit buku  
- Delete buku  
- Desain simple & user-friendly  
- Penjelasan alasan desain disertakan  

---

## 🧱 Project Structure

### **Backend (Golang)**
```
/backend
│── main.go
│── router/
│── handlers/
│── models/
│── middleware/
└── storage/
```

### **Frontend (React/Vue/Angular — sesuaikan dengan pilihan Anda)**
```
/frontend
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js / main.js
```

---

## ⚙️ Installation & Running

### **Backend**
```bash
cd backend
go mod tidy
go run main.go
```
Server berjalan di:
```
http://localhost:8080
```

---

### **Frontend**
Jika menggunakan React:
```bash
cd frontend
npm install
npm start
```
UI berjalan di:
```
http://localhost:3000
```

---

## 🧪 API Example

### **POST /books**
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "published_year": 2023
}
```

---

## 🧰 Tech Stack

### **Backend**
- Golang  
- go-chi v5  
- Logger Middleware  
- In-memory storage  

### **Frontend**
Framework yang digunakan: **React / Vue / Angular**

---

## 📝 Reasoning Behind UI/UX Design

- Navigasi sederhana  
- Form minimalis & mudah dipahami  
- Button dengan warna berbeda untuk aksi penting  
- Layout clean & fokus pada konten  

---

## 🏗️ Bonus Implementations (Jika Dikerjakan)

- Singleton Pattern untuk BookStore  
- Refactor untuk menerapkan **DRY principle**  
- Penjelasan komponen penting di frontend  

---

## 📄 Submission Requirements

- File `start.txt` dan `end.txt` telah disertakan  
- Repository dikirimkan melalui email: recruitment@sismedika.com  

---

## 🙌 Author

Nama: IIP SHOIFUDDIN  
Email: shoifuddin.arkademy@gmail.com  
Role: Fullstack Developer Candidate
