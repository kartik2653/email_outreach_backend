import apiClient from "./apiClient";

export const postServices = {
  generatePost: async (body: any) => {
    try {
      const resposne = await apiClient.post("/post/create-post", body);
      return resposne;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance prompt");
    }
  },
};
