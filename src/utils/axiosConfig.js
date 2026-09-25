import axios from 'axios';

// Add a request interceptor to attach JWT token to every outgoing request
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle unauthorized/forbidden responses
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // If token expired or invalid and not on login page, we could clean up
      const isLoginRequest = error.config && error.config.url && error.config.url.includes('/login');
      if (!isLoginRequest) {
        console.warn('Session expired or unauthorized request. Please log in again.');
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
