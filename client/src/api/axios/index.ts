import axios from 'axios';
import { API_URL } from '@/constants';
import { toast } from 'sonner';

const Api = axios.create({
  baseURL: `${API_URL}api`,
  withCredentials: true,
});

// Add token before every request
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers)
    config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// Handle responses + errors
Api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 🔁 Token refresh logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const refreshRes = await axios.post(
          `${API_URL}api/refresh_token`,
          {},
          { withCredentials: true }
        );

        localStorage.setItem('accessToken', refreshRes.data.accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${refreshRes.data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        toast.error('Session expired. Please log in again.');
      }
    }

    // ❌ Handle all other errors
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'An unexpected error occurred.';

    toast.error(message);
    return Promise.reject(error);
  }
);

export default Api;
