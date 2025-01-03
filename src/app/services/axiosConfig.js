import axios from 'axios';
import { API_BASE_URL } from './config';
import Cookies from 'js-cookie';
import AuthService from '../services/authService';
import { toast } from 'react-toastify';

const axiosConfig = axios.create({
  baseURL: API_BASE_URL,
});

// axiosConfig.defaults.timeout = 1000 * 60 * 10;

// axiosConfig.defaults.withCredentials = true;

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let refreshTokenPromise = null;

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = Cookies.get('refreshToken');
      toast.info("Phiên đăng nhập đã hết hạn");
      await AuthService.logout(refreshToken).then(() => {
        window.location.href = '/signin';
      });
    }

    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message);
    }

    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (!refreshTokenPromise) {
        const refreshToken = Cookies.get('refreshToken');

        refreshTokenPromise = await AuthService.refreshAccessToken(refreshToken)
          .then((response) => {
            console.log('Response:', response);
            const newAccessToken = response.data.access.token;
            const newRefreshToken = response.data.refresh.token;
            Cookies.set('accessToken', newAccessToken);
            Cookies.set('refreshToken', newRefreshToken);
            axiosConfig.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
            window.location.reload();
            return axiosConfig(originalRequest);
          })
          .catch((error) => {
            AuthService.logout(refreshToken).then(() => {
              window.location.href = '/signin';
            });
            throw error;
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      try {
        const newAccessToken = await refreshTokenPromise;

        // Retry the original request with the new token
        originalRequest._retry = true; // Prevent infinite retry loop
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosConfig(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
      // return refreshTokenPromise.then(() => axiosConfig(originalRequest));
    }

    return Promise.reject(error);
  },
);

export default axiosConfig;
