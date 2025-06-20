import apiClient from "./apiClient";

export const brandingServices = {
  getBrandingQuestion: async ({ brandingStep }) => {
    try {
      const response: any = await apiClient.get(
        `/branding/get-branding-questions?brandingStep=${brandingStep}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.message || "Failed to fetch post");
    }
  },
  updateBrandingQuestion: async (formData) => {
    try {
        console.log(formData);
        
      const response: any = await apiClient.put(`/branding/update-responses`, formData);
      return response.formData;
    } catch (error) {
      throw new Error(error?.message || "Failed to update");
    }
  },
};

"Branding validation failed: responses.0.questionResponse.0.optionLabel: Path `optionLabel` is required., responses.1.questionResponse.0.optionLabel: Path `optionLabel` is required., responses.2.questionResponse.0.optionLabel: Path `optionLabel` is required."
statusCode
: 
500
success
: 
false
