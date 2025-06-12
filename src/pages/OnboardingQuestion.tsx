import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { onboardingService, type OnboardingResponse } from "@/services/api/onboardingService";
import logo from "@/assests/svg/appLogo.svg";
import { Check } from "lucide-react";

const OnboardingQuestion = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [questionData, setQuestionData] = useState<OnboardingResponse["data"] | null>(null);
  const [selectedResponseId, setSelectedResponseId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questionId ? parseInt(questionId) : 1;
  const totalQuestions = 4;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setIsLoading(true);
        const response = await onboardingService.getQuestion(currentQuestion);
        setQuestionData(response.data);

        // Set previously selected answer if exists
        if (response.data.response) {
          setSelectedResponseId(response.data.response.responseId);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load question",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [currentQuestion, toast]);

  const handleSubmit = async () => {
    if (!selectedResponseId || !questionData) return;

    try {
      setIsSubmitting(true);
      await onboardingService.submitAnswer({
        questionId: questionData.questionId,
        responseId: selectedResponseId,
      });

      // Navigate to next question or dashboard
      if (currentQuestion < totalQuestions) {
        navigate(`/onboarding-questions/${currentQuestion + 1}`);
      } else {
        // For the 4th question, redirect to appropriate dashboard based on selection
        const dashboardRoutes = {
          1: "/dashboard/create",
          2: "/dashboard/professional",
          3: "/dashboard/agency",
        };

        // Use first 3 response IDs for dashboard routing, fallback to personal
        const dashboardRoute =
          dashboardRoutes[selectedResponseId as keyof typeof dashboardRoutes] || "/dashboard";
        navigate(dashboardRoute);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit answer",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!questionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Question not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex p-8">
      {/* Left Side - Question */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full relative h-full flex items-center justify-center">
          <h1 className="text-3xl font-bold absolute top-0 left-0 text-gray-900">
            <img src={logo} alt="Logo" />
          </h1>

          <div className="w-full space-y-8">
            {/* Progress Indicator */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Step {currentQuestion} of {totalQuestions}
              </p>
              <div className="flex space-x-2">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded ${
                      index < currentQuestion
                        ? "bg-yellow-green"
                        : index === currentQuestion - 1
                          ? "bg-yellow-green"
                          : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 font-bricolage-grotesque">
                {questionData.questionText}
              </h2>
              <p className="text-gray-600">{questionData.promptText}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {questionData.responseOptions.map((option) => (
                <button
                  key={option.responseId}
                  onClick={() => setSelectedResponseId(option.responseId)}
                  className={`w-full 
                    ${
                      selectedResponseId === option.responseId
                        ? "border-[3px] border-yellow-green bg-gray-50"
                        : "border-gray-200"
                    }
                    p-4 
                    text-left 
                    rounded-[60px] 
                    border-2 
                    transition-colors
                    hover:border-yellow-green
                    hover:bg-light-yellow-green`}
                >
                  <div className="flex items-center">
                    {option.responseText}
                    {selectedResponseId === option.responseId && (
                      <Check
                        color="#000"
                        size={24}
                        className="ml-auto bg-yellow-green rounded-full p-1"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              onClick={handleSubmit}
              disabled={!selectedResponseId || isSubmitting}
              className="bg-black text-white py-3 px-10 rounded-3xl h-12 font-semibold"
            >
              {"Next"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Static Image */}
      <div className="flex-[0.7] bg-gray-600 rounded-xl flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-full h-full bg-gray-600 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestion;
