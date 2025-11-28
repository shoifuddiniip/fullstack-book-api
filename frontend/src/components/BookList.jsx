/**
 * BookList Component - Material UI Version
 * Menampilkan daftar semua buku dalam bentuk Material UI Table
 * Menyediakan aksi edit dan delete untuk setiap buku
 */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LibraryBooksIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Book List
        </Typography>
        <Chip
          label={`${books.length} ${books.length === 1 ? 'book' : 'books'}`}
          color="primary"
          size="small"
          sx={{ ml: 2 }}
        />
      </Box>

      {books.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary'
          }}
        >
          <LibraryBooksIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No books available
          </Typography>
          <Typography variant="body2">
            Add your first book using the form above!
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="books table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Published Year</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow
                  key={book.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>
                    <Chip label={book.id} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {book.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {book.author}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {book.published_year}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(book)}
                      size="small"
                      sx={{ mr: 1 }}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onDelete(book.id)}
                      size="small"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BookList;
