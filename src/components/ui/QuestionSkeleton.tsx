import { Button } from "@/components/ui/button";
import DropdownQuestion from "./DropdownQuestion";
import McqQuestion from "./McqQuestion";
import TextQuestion from "./TextQuestion";
import { buildSchemaFromQuestions } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ThemeLoader } from "./loader";

/**
 Branding component:
 question initilization
 for each question render question skeleton
 handle resposne change in branding component
 react hook form
 */

const QuestionSkeleton = ({ questions, onSubmit, initialValues, isSubmitting }) => {
  const schema = buildSchemaFromQuestions(questions);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  console.log("Error", errors);

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const renderQuestion = (q) => {
    const key = `${q.questionId}`;

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
    <div className="bg-white py-6 px-12 flex flex-col justify-left">
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((q) => {
          return (
            <div key={q.questionId} className="mb-10">
              <p className="text-xl font-semibold text-dark-charcoal-500 font-bricolage-grotesque">
                {q.questionText}
              </p>
              {q.promptText && (
                <p className="py-[8px] text-md text-base-gray-600 font-manrope">{q.promptText}</p>
              )}
              <div className="">{renderQuestion(q)}</div>
            </div>
          );
        })}
        <div className="pt-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-14 bg-black hover:bg-gray-800 text-white font-semibold py-6 rounded-standard text-lg shadow-lg transition-all hover:shadow-xl"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <ThemeLoader size={16} />
                <span>Submitting...</span>
              </div>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionSkeleton;
