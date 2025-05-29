import axios from "axios";
import { LoginFormData, SignupFormData } from "@/schemas/authSchemas";
import apiClient from "./apiClient";

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

export const authService = {
  loginUser: async (credentials: LoginFormData): Promise<AuthResponse> => {
    try {
      const response: any = await apiClient.post("/auth/user/login", credentials);

      if (response?.data?.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  signupUser: async (userData: SignupFormData): Promise<AuthResponse> => {
    try {
      const response: any = await apiClient.post("/auth/user/create-user", userData);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },
  logoutUser: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/user/login", {});
      localStorage.removeItem("authToken");
    } catch (error: any) {
      // Still remove token even if API call fails
      localStorage.removeItem("authToken");
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },
};
