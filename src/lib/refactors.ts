type Option = {
  optionId: number;
  optionValue: string;
};
type ResponseInput = {
  questionId: number;
  questionType: string;
  questionResponse: Option[];
};
type ResponseOutput = {
  questionId: number;
  questionType: string;
  questionResponse: number[];
};

export const refactorQuestionResponse = (formData, questions = []) => {
  const refactoredResponses = [];
  questions?.map((question, index) => {
    const questionId = question?.questionId;
    const response = formData?.[`${questionId}`];
    const responseObj = {
      questionId: questionId,
      questionType: question?.questionType,
      questionResponse: response?.map((r) => {
        return {
          optionId: r?.optionId || -1,
          optionValue: r?.optionValue || "",
          optionLabel: r?.optionLabel || "",
        };
      }),
    };
    refactoredResponses.push(responseObj);
  });
  return refactoredResponses;
};
