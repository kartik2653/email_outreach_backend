
import axios from 'axios';
import { LoginFormData, SignupFormData } from '@/schemas/authSchemas';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  token?: string;
}

export interface SocialAuthResponse extends AuthResponse {
  redirectUrl?: string;
}

// Login API
export const loginUser = async (credentials: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Signup API
export const signupUser = async (userData: SignupFormData): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/signup', userData);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

// Google OAuth
export const loginWithGoogle = async (): Promise<SocialAuthResponse> => {
  try {
    const response = await api.get('/auth/google');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Google authentication failed');
  }
};

// LinkedIn OAuth
export const loginWithLinkedIn = async (): Promise<SocialAuthResponse> => {
  try {
    const response = await api.get('/auth/linkedin');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'LinkedIn authentication failed');
  }
};

// Logout API
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  } catch (error: any) {
    // Still remove token even if API call fails
    localStorage.removeItem('authToken');
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

// Get current user
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get user data');
  }
};

export default api;
