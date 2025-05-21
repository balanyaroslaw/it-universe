import axios from 'axios';
import { bytesToBase64 } from '../../utilities/bytes';
class HttpService {
  constructor() {
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: import.meta.env.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.httpClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.httpClient(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async refreshAccessToken() {
    try {
      const refreshToken = localStorage.getItem('REFRESH_TOKEN');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, { refresh_token: refreshToken });

      const { access_token, refresh_token } = response.data;
      localStorage.setItem('ACCESS_TOKEN', access_token);
      localStorage.setItem('REFRESH_TOKEN', refresh_token);

      return access_token;
    } catch (error) {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      localStorage.removeItem('TREE_ID');
      throw error;
    }
  }

  get(url, config = {}) {
    return this.httpClient.get(url, config);
  }

  post(url, data, config = {}, file) {
    if (config && config['Content-Type'] === 'multipart/form-data') {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      if(file){
        formData.append('file', file);
      }


      const formConfig = {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      return this.httpClient.post(url, formData, formConfig);
    }
    
    return this.httpClient.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.httpClient.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.httpClient.delete(url, config);
  }

  patch(url, data, config = {}, file) {
    if (config && config['Content-Type'] === 'multipart/form-data') {
      const formData = new FormData();
      
      if(data){
        formData.append('data', JSON.stringify(data));
      }
      
      if(file){
        formData.append('file', file);
      }

      const formConfig = {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      return this.httpClient.patch(url, formData, formConfig);
    }
    
    return this.httpClient.patch(url, data, config);
  }
}

export default new HttpService();
