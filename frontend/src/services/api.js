import axios from 'axios';

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const api = axios.create({ baseURL: base });

export default {
  get: (path) => api.get(path),
  patch: (path, data) => api.patch(path, data)
};
