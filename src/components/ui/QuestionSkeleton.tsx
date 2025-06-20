import { Button } from "@/components/ui/button";
import DropdownQuestion from "./DropdownQuestion";
import McqQuestion from "./McqQuestion";
import TextQuestion from "./TextQuestion";
import { buildSchemaFromQuestions } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResponeOption {
  optionId: number;
  optionLable: string;
  optionValue: string;
  isDisabled: boolean;
  _id: string;
}

/**
 Branding component:
 question initilization
 for each question render question skeleton
 handle resposne change in branding component
 react hook form
 */

const QuestionSkeleton = ({ questions }) => {
  const schema = buildSchemaFromQuestions(questions);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  console.log(errors);

  const onSubmit = (data) => {
    console.log("Final Answers:", data);
  };

  const renderQuestion = (q) => {
    const key = `q_${q.questionId}`;

    const commonProps = {
      question: q,
      name: key,
      control,
      setValue,
      error: errors[key],
      register,
    };

    switch (q.questionType) {
      case "text":
        return <TextQuestion key={key} {...commonProps} />;
      case "mcq":
        return <McqQuestion key={key} {...commonProps} />;
      case "dropdown":
        return <DropdownQuestion key={key} {...commonProps} />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-white p-6 flex flex-col justify-left">
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((q) => {
          return (
            <div key={q.questionId}>
              <p className="text-xl font-semibold text-dark-charcoal-500 mb-2 font-bricolage-grotesque">
                {q.questionText}
              </p>
              {q.promptText && (
                <p className="text-sm text-base-gray-600 mb-4 font-manrope">{q.promptText}</p>
              )}
              {renderQuestion(q)}
            </div>
          );
        })}
        <div className="pt-3">
          <Button
            type="submit"
            className="px-10 bg-black hover:bg-gray-800 text-white font-semibold py-6 rounded-standard text-lg shadow-lg transition-all hover:shadow-xl"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionSkeleton;
