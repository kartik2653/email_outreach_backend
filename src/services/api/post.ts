import apiClient from "./apiClient";

export const postServices = {
  generatePost: async (body: any) => {
    try {
      const resposne: any = await apiClient.post("/post/create-post", body);
      return resposne.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance prompt");
    }
  },
  updatePost: async (data) => {
    try {
      const { postId, ...rest } = data;
      const resposne: any = await apiClient.put(`/post/${postId}`, rest);
      return resposne.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to enchance prompt");
    }
  },
  updatePostVariant: async (data) => {
    try {
      const { postId, variationIndex, ...rest } = data;
      const response: any = await apiClient.put(
        `/post/${postId}/update-variant/${variationIndex}`,
        rest
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to update post variant");
    }
  },
  getPostById : async (data) => {
    try {
      const { postId} = data;
      const response: any = await apiClient.get(
        `/post/${postId}`,
      )
      return response.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to fetch post")
    }
  }
};
