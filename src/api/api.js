import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-nkyz.onrender.com/api',
});

export default api;
