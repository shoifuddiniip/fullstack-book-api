/**
 * BookForm Component - Material UI Version
 * Form untuk menambah atau mengedit buku
 * Komponen ini reusable untuk create dan update operations
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: new Date().getFullYear(),
  });

  const [errors, setErrors] = useState({});

  // Update form ketika prop book berubah (untuk edit mode)
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        published_year: book.published_year,
      });
    }
  }, [book]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'published_year' ? parseInt(value) || '' : value,
    }));
    // Clear error untuk field yang sedang diubah
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validasi form
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.published_year || formData.published_year < 1000 || formData.published_year > 2100) {
      newErrors.published_year = 'Published year must be between 1000 and 2100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
      // Reset form setelah submit (hanya untuk add mode)
      if (!book) {
        setFormData({
          title: '',
          author: '',
          published_year: new Date().getFullYear(),
        });
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {book ? (
          <>
            <EditIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Edit Book
            </Typography>
          </>
        ) : (
          <>
            <AddIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Add New Book
            </Typography>
          </>
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
              placeholder="Enter book title"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              error={!!errors.author}
              helperText={errors.author}
              required
              placeholder="Enter author name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Published Year"
              name="published_year"
              type="number"
              value={formData.published_year}
              onChange={handleChange}
              error={!!errors.published_year}
              helperText={errors.published_year}
              required
              placeholder="Enter published year"
              variant="outlined"
              inputProps={{
                min: 1000,
                max: 2100,
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={book ? <EditIcon /> : <AddIcon />}
            sx={{ minWidth: 150 }}
          >
            {book ? 'Update Book' : 'Add Book'}
          </Button>

          {book && (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<CancelIcon />}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default BookForm;
