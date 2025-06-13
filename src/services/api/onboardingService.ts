import apiClient from "./apiClient";

export interface OnboardingResponse {
  statusCode: number;
  data: {
    questionId: number;
    questionText: string;
    isMultipleSelect: number;
    promptText: string;
    responseOptions: {
      responseId: number;
      responseText: string;
      _id: string;
    }[];
    _id: string;
    response?: {
      _id: string;
      questionId: number;
      responseId: number;
    };
    imageUrl?: string;
  };
  success: boolean;
  message: string;
}

export interface SubmitAnswerPayload {
  questionId: number;
  responseId: number;
}

export const onboardingService = {
  getQuestion: async (questionId: number): Promise<OnboardingResponse> => {
    try {
      const response = await apiClient.get<OnboardingResponse>(
        `/onboarding-questions/${questionId}`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch question");
    }
  },

  submitAnswer: async (payload: SubmitAnswerPayload): Promise<any> => {
    try {
      const response = await apiClient.put(`/onboarding-questions/${payload.questionId}`, payload);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to submit answer");
    }
  },
};
