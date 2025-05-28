import axios from 'axios';

// Instance axios dengan base URL MockAPI kamu
const api = axios.create({
  baseURL: 'https://6835be02cd78db2058c2f3cb.mockapi.io/api/foods',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create data baru
export const createItem = (item) => api.post('/', item);

// Get semua data
export const getItems = () => api.get('/');

// Update data berdasarkan ID
export const updateItem = (id, item) => api.put(`/${id}`, item);

// Delete data berdasarkan ID
export const deleteItem = (id) => api.delete(`/${id}`);

export default api;
