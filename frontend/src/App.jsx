/**
 * App Component - Main application component with Material UI
 * Mengelola state dan orchestrate komunikasi antara komponen dan API
 */

import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import theme from './theme';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { getAllBooks, createBook, updateBook, deleteBook } from './services/api';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books saat component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch semua buku dari API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllBooks();
      setBooks(data || []);
    } catch (err) {
      setError('Failed to fetch books. Please make sure the backend is running.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle submit form (create atau update)
  const handleSubmit = async (bookData) => {
    try {
      setError(null);
      if (editingBook) {
        // Update existing book
        await updateBook(editingBook.id, bookData);
        setEditingBook(null);
      } else {
        // Create new book
        await createBook(bookData);
      }
      // Refresh book list
      await fetchBooks();
    } catch (err) {
      setError(err.message || 'Failed to save book');
      console.error('Error saving book:', err);
    }
  };

  // Handle edit button click
  const handleEdit = (book) => {
    setEditingBook(book);
    // Scroll to top untuk melihat form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  // Handle delete dengan konfirmasi
  const handleDelete = async (id) => {
    const book = books.find(b => b.id === id);
    if (window.confirm(`Are you sure you want to delete "${book?.title}"?`)) {
      try {
        setError(null);
        await deleteBook(id);
        // Refresh book list
        await fetchBooks();
      } catch (err) {
        setError(err.message || 'Failed to delete book');
        console.error('Error deleting book:', err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: 3
        }}>
          <Toolbar>
            <MenuBookIcon sx={{ mr: 2, fontSize: 32 }} />
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                Book Management System
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Manage your book collection with ease
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Form Section */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <BookForm
              book={editingBook}
              onSubmit={handleSubmit}
              onCancel={handleCancelEdit}
            />
          </Paper>

          {/* List Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <BookList
                books={books}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#2d3748',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Built with React + Golang • Fullstack Developer Test
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
