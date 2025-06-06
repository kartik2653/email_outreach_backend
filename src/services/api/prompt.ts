import apiClient from "./apiClient";

export const promptServices = {
  generateMagicPrompt: async (prompt: any) => {
    try {
      const resposne = await apiClient.post("/post/magic-prompt", prompt);
      return resposne;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance prompt");
    }
  },
};
