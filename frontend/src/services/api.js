/**
 * API Service untuk komunikasi dengan backend
 * Menggunakan Fetch API untuk HTTP requests
 */

const API_BASE_URL = 'http://localhost:8080';

/**
 * Helper function untuk handle response dari API
 * @param {Response} response - Response object dari fetch
 * @returns {Promise} - Parsed JSON response
 */
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

/**
 * Mengambil semua buku dari backend
 * @returns {Promise<Array>} - Array of books
 */
export const getAllBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/books`);
  const data = await handleResponse(response);
  return data.data;
};

/**
 * Mengambil detail buku berdasarkan ID
 * @param {number} id - Book ID
 * @returns {Promise<Object>} - Book object
 */
export const getBookById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  const data = await handleResponse(response);
  return data.data;
};

/**
 * Menambah buku baru
 * @param {Object} book - Book data (title, author, published_year)
 * @returns {Promise<Object>} - Created book object
 */
export const createBook = async (book) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  const data = await handleResponse(response);
  return data.data;
};

/**
 * Memperbarui data buku
 * @param {number} id - Book ID
 * @param {Object} book - Updated book data
 * @returns {Promise<Object>} - Updated book object
 */
export const updateBook = async (id, book) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  const data = await handleResponse(response);
  return data.data;
};

/**
 * Menghapus buku berdasarkan ID
 * @param {number} id - Book ID
 * @returns {Promise<Object>} - Success message
 */
export const deleteBook = async (id) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'DELETE',
  });
  return await handleResponse(response);
};
