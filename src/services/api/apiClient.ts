/**
 * API Client for handling HTTP requests using axios
 */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: options?.headers,
        params: options?.params,
        withCredentials: true,
      };

      const response = await this.axiosInstance.get<T>(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching from ${endpoint}:`, error);
      if (error?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }

      throw error;
    }
  }

  async post<T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: options?.headers,
        params: options?.params,
        withCredentials: true,
      };

      const response = await this.axiosInstance.post<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      if (error?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }

      throw error;
    }
  }

  async put<T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: options?.headers,
        params: options?.params,
        withCredentials: true,
      };

      const response = await this.axiosInstance.put<T>(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      if (error?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }

      throw error;
    }
  }

  async delete<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: options?.headers,
        params: options?.params,
        withCredentials: true,
      };

      const response = await this.axiosInstance.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      if (error?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }

      throw error;
    }
  }
}

// Create and export a default instance
const apiClient = new ApiClient("https:///spotboi.demandtech.org/backend/api/v1");
export default apiClient;
