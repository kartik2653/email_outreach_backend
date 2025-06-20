import * as z from "zod";

export const buildSchemaFromQuestions = (questions) => {
  const shape = {};

  for (const q of questions) {
    const key = `q_${q.questionId}`;
    const label = q.questionText;

    if (q.questionType === "text") {
      shape[key] = z.string().min(1, `Required`);
    } else if (q.questionType === "mcq") {
      shape[key] = z.array(z.string()).min(1, `Required`);
    } else if (q.questionType === "dropdown") {
      shape[key] = z.array(z.string()).min(1, `Required`);
    } else {
      shape[key] = z.any(); // fallback
    }
  }

  return z.object(shape);
};
