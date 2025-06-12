import apiClient from "./apiClient";

export const linkedInService = {
  linkedInAuth: async () => {
    try {
      const response: any = await apiClient.get("/auth/user/linkedin");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to authenticate with LinkedIn");
    }
  },
};
