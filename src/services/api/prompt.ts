import apiClient from "./apiClient";

export const promptServices = {
  generateMagicPrompt: async (prompt: any) => {
    try {
      const resposne: any = await apiClient.post("/post/magic-prompt", prompt);
      return resposne.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance prompt");
    }
  },
  generateHashtags: async (prompt: any) => {
    try {
      const resposne: any = await apiClient.post("/post/generate-hashtags", prompt);
      return resposne.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance hashtags");
    }
  },
  enhanceCaption: async (data: { promptText: string; actions: string[] }) => {
    try {
      const resposne: any = await apiClient.post("/post/enchance-prompt", data);
      return resposne.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance caption");
    }
  },
  regeneratePostVariant: async (data) => {
    try {
      const resposne: any = await apiClient.put("/post/regenerate-variation", data);
      return resposne.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance caption");
    }
  },
};
