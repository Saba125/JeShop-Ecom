import axios from 'axios';
import { API_URL } from '@/constants';
const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
});

// Request interceptor to add access token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});

// Response interceptor to refresh token
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshRes = await axios.post(
                `${API_URL}/api/refresh_token`,
                {},
                { withCredentials: true }
            );
            localStorage.setItem('accessToken', refreshRes.data.accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${refreshRes.data.accessToken}`;
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default api;
