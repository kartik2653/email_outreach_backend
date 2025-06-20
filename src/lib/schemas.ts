import { z } from "zod";

const schema = z.object({
  optionId: z.number(),
  optionLabel: z.string(),
  optionValue: z.string(),
  isDisabled: z.number(),
  _id: z.string(),
});

export const buildSchemaFromQuestions = (questions) => {
  const shape = {};
  for (const q of questions) {
    const key = `${q.questionId}`;
    shape[key] = z.array(schema).min(1, {
      message: "Required",
    });
  }
  return z.object(shape);
};
