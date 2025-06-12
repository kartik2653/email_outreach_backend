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
  linkedInVerifyCode: async (data: { code: string; redirectUri: string }) => {
    try {
      const response: any = await apiClient.post("/auth/user/linkedin/verify-code", data);
      console.log("🚀 ~ linkedInVerifyCode: ~ response:", response);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to authenticate with LinkedIn");
    }
  },
};
