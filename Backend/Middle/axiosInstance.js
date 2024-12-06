import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Your API base URL
    withCredentials: true, // Send cookies if needed
});

// Add a request interceptor to include the Bearer token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add token to the Authorization header
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default axiosInstance;
