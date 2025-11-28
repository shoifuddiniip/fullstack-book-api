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
- Menampilkan daftar buku dengan **Material UI Table**
- Form tambah buku dengan **Material UI TextField**
- Edit buku dengan inline editing
- Delete buku dengan konfirmasi
- **Material UI (MUI)** components untuk modern design
- Icon buttons dan visual feedback
- Responsive & mobile-friendly
- Professional UI/UX dengan Material Design
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

### **Frontend (React + Vite + Material UI)**
```
/frontend
│── src/
│   ├── components/
│   │   ├── BookList.jsx      # MUI Table component
│   │   └── BookForm.jsx      # MUI TextField & Button
│   ├── services/
│   │   └── api.js
│   ├── App.jsx               # Main app with MUI components
│   ├── theme.js              # MUI custom theme
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│── index.html
│── package.json
└── vite.config.js
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
Menggunakan React + Vite:
```bash
cd frontend
npm install
npm run dev
```
UI berjalan di:
```
http://localhost:5173
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
- React 18
- **Material UI (MUI) v5** - UI Component Library
- @mui/icons-material - Icon library
- Emotion - CSS-in-JS styling
- Vite (Build Tool)
- Fetch API untuk HTTP requests
- Responsive Design

---

## 🎨 Material UI Implementation

Aplikasi ini menggunakan **Material UI (MUI) v5** sebagai UI component library untuk memberikan pengalaman yang konsisten dan professional.

### **Komponen Material UI yang Digunakan**

#### 1. **Layout Components**
- `Container` - Responsive container dengan max-width
- `Box` - Flexible box container dengan sx prop
- `Grid` - Responsive grid system untuk form layout
- `Paper` - Elevated card container

#### 2. **Navigation**
- `AppBar` - Top navigation bar dengan gradient
- `Toolbar` - Container untuk AppBar content

#### 3. **Data Display**
- `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableRow` - Professional data table
- `Typography` - Consistent text styling
- `Chip` - Small info badges (ID, count)

#### 4. **Form Components**
- `TextField` - Material Design text inputs dengan validation
- `Button` - Styled buttons dengan variants (contained, outlined)
- `IconButton` - Icon-only buttons untuk actions

#### 5. **Feedback Components**
- `Alert` - Error/success notifications dengan close button
- `CircularProgress` - Loading spinner

#### 6. **Icons**
- `MenuBookIcon` - Header icon
- `LibraryBooksIcon` - Book list icon
- `AddIcon` - Add button icon
- `EditIcon` - Edit action icon
- `DeleteIcon` - Delete action icon
- `CancelIcon` - Cancel button icon

### **Custom Theme Configuration**

File: `frontend/src/theme.js`

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },    // Purple
    secondary: { main: '#764ba2' },  // Darker purple
    error: { main: '#dc3545' },      // Red
    success: { main: '#28a745' },    // Green
  },
  typography: {
    fontFamily: ['-apple-system', 'Roboto', ...],
  },
  shape: {
    borderRadius: 8,
  },
});
```

### **Material Design Benefits**

✅ **Consistency** - Komponen yang sudah teruji dan konsisten
✅ **Accessibility** - Built-in ARIA attributes dan keyboard navigation
✅ **Responsive** - Grid system dan breakpoints otomatis
✅ **Theming** - Custom color palette dan typography
✅ **Icons** - 2000+ Material icons ready to use
✅ **Animation** - Smooth transitions dan ripple effects
✅ **Documentation** - Extensive docs dan examples

---

## 📝 UI/UX Design Principles

Desain aplikasi ini dibuat dengan prinsip **user-friendly**, **accessibility**, dan **Material Design**:

### 1. **Clear Visual Hierarchy**
- Header dengan gradient eye-catching untuk branding
- Section yang jelas antara form dan list
- Typography yang konsisten dengan ukuran yang mudah dibaca

### 2. **Intuitive Navigation**
- Form berada di atas untuk akses cepat
- Action buttons (Edit, Delete) langsung tersedia di setiap row
- Single-page application - no page reload needed

### 3. **Color Psychology**
- **Purple gradient** (header) - Professional & modern
- **Blue** (Primary button) - Trust & reliability
- **Green** (Edit button) - Safe action
- **Red** (Delete button) - Caution, requires confirmation
- **Gray** (Cancel button) - Neutral action

### 4. **Form Validation & Feedback**
- Real-time validation dengan error messages yang jelas
- Input fields dengan focus state yang jelas (border + shadow)
- Confirmation dialog untuk delete action (prevent accidental deletion)
- Loading states untuk feedback saat fetching data

### 5. **Responsive Design**
- Mobile-first approach dengan breakpoints di 768px dan 480px
- Table berubah menjadi card layout di mobile
- Touch-friendly button sizes di mobile devices
- Flexible form layout untuk semua screen sizes

### 6. **Consistent Spacing & Alignment**
- Consistent padding dan margin menggunakan rem units
- Card-based layout dengan shadow untuk depth
- White space yang cukup untuk mengurangi cognitive load

### 7. **Accessibility Considerations**
- Semantic HTML elements (header, main, footer, section)
- Proper label-input associations
- High contrast color combinations
- Keyboard-friendly form interactions

### 8. **Performance & User Experience**
- Smooth transitions dan hover effects
- Optimistic UI updates (list refresh after actions)
- Error handling dengan user-friendly messages
- Auto-scroll ke form saat edit (better UX flow)  

---

## 🏗️ Bonus Implementations

### ✅ **Backend Bonus Features**

#### 1. **Singleton Pattern untuk BookStore**
File: `backend/storage/bookstore.go`
- Menggunakan `sync.Once` untuk ensure single instance
- Thread-safe operations dengan `sync.RWMutex`
- Memory efficient - hanya satu instance di seluruh aplikasi

```go
var (
    instance *BookStore
    once     sync.Once
)

func GetInstance() *BookStore {
    once.Do(func() {
        instance = &BookStore{
            books:  make(map[int]*models.Book),
            nextID: 1,
        }
    })
    return instance
}
```

#### 2. **DRY Principle Implementation**
File: `backend/handlers/response.go`
- Centralized response formatting
- Reusable error handling functions
- Consistent API response structure

**Benefits:**
- Mengurangi code duplication
- Consistent response format di semua endpoints
- Mudah untuk maintenance dan update

### ✅ **Frontend Bonus Features**

#### **Komponen Penting React & Alasannya**

##### 1. **useState Hook**
Digunakan di semua komponen untuk state management:
```jsx
const [books, setBooks] = useState([]);
const [editingBook, setEditingBook] = useState(null);
```
**Kenapa Penting:**
- Core React hook untuk reactive state
- Trigger re-render otomatis saat state berubah
- Simple API untuk manage local component state

##### 2. **useEffect Hook**
Digunakan untuk side effects (data fetching):
```jsx
useEffect(() => {
    fetchBooks();
}, []);
```
**Kenapa Penting:**
- Lifecycle management di functional components
- Ideal untuk data fetching saat component mount
- Dependency array untuk control re-run

##### 3. **Component Composition**
Breakdown ke small, reusable components:
- `BookForm` - Reusable untuk add & edit
- `BookList` - Display logic terpisah
- `App` - Orchestration layer

**Kenapa Penting:**
- Separation of concerns
- Reusability (BookForm dipakai untuk create & update)
- Easier testing dan maintenance
- Better code organization

##### 4. **Props & Callbacks**
Pattern passing functions sebagai props:
```jsx
<BookList onEdit={handleEdit} onDelete={handleDelete} />
```
**Kenapa Penting:**
- Unidirectional data flow
- Child components stay presentational
- Parent controls business logic
- Testability & predictability

##### 5. **Controlled Components**
Form inputs managed by React state:
```jsx
<input value={formData.title} onChange={handleChange} />
```
**Kenapa Penting:**
- Single source of truth
- Easy validation
- React controls form state
- Predictable form behavior  

---

## 🧪 Testing Guide

### **Testing Backend API**

1. **Start the backend server:**
   ```bash
   cd backend
   go mod tidy
   go run main.go
   ```

2. **Test endpoints dengan curl atau Postman:**

   ```bash
   # Get all books
   curl http://localhost:8080/books

   # Get book by ID
   curl http://localhost:8080/books/1

   # Create new book
   curl -X POST http://localhost:8080/books \
     -H "Content-Type: application/json" \
     -d '{"title":"New Book","author":"John Doe","published_year":2024}'

   # Update book
   curl -X PUT http://localhost:8080/books/1 \
     -H "Content-Type: application/json" \
     -d '{"title":"Updated Title","author":"Jane Doe","published_year":2024}'

   # Delete book
   curl -X DELETE http://localhost:8080/books/1
   ```

### **Testing Frontend**

1. **Start the backend first** (see above)

2. **Start the frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Open browser:** http://localhost:5173

4. **Test all CRUD operations:**
   - ✅ View list of books (3 dummy books loaded)
   - ✅ Add new book via form
   - ✅ Edit existing book (click Edit button)
   - ✅ Delete book with confirmation (click Delete button)
   - ✅ Form validation (try empty fields)
   - ✅ Responsive design (resize browser window)

---

## 📄 Submission Requirements

- ✅ File `start.txt` telah dibuat
- ✅ File `end.txt` akan dibuat setelah completion
- ✅ Repository siap dikirimkan melalui email: recruitment@sismedika.com  

---

## 🙌 Author

Nama: IIP SHOIFUDDIN  
Email: shoifuddin.arkademy@gmail.com  
Role: Fullstack Developer Candidate
