import axios from "axios";

// Create a new Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend API base URL
});

// Add an interceptor to include the JWT token in request headers
api.interceptors.request.use((config) => {
  // Get the JWT token from localStorage or any other storage where you store the token after successful login
  const token = localStorage.getItem('token'); // Assuming you store the token in 'token' key in localStorage

  // If the token is available, include it in the request headers
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});

export default api;