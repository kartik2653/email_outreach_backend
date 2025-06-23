import { postServices } from "@/services/api/post";
import QuestionSkeleton from "./ui/QuestionSkeleton";
import { brandingServices } from "@/services/api/brandingServices";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { refactorQuestionResponse } from "@/lib/refactors";
import { useToast } from "@/hooks/use-toast";
import contentPlanBanner from "@/assests/svg/contentplanbanner.svg";

const Branding = () => {
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({});
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [brandingStep, setBrandindStep] = useState<number>(null);

  const navigate = useNavigate();
  const fetchQuestion = async () => {
    try {
      const brandingStep = new URLSearchParams(window.location.search).get("brandingStep");
      const questions = await brandingServices.getBrandingQuestion({ brandingStep });
      const initialFormValues = {};
      questions.forEach((q) => {
        const responseList = q.matchedResponses?.[0]?.responses?.questionResponse || [];
        const refactoredList = responseList.map((r) => {
          return {
            ...r,
            isDisabled: 0,
            _id: "-1",
          };
        });
        initialFormValues[`${q.questionId}`] = refactoredList;
      });

      setQuestions(questions);
      setInitialValues(initialFormValues);
      toast({
        title: "Questions fetching successful",
        description: "Questions are fetched successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to fetch the question",
        description: "Error while fetching branding question",
        variant: "destructive",
      });
    }
  };
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const questionResponse = refactorQuestionResponse(formData, questions);
      let brandingStep: any = new URLSearchParams(window.location.search).get("brandingStep");
      brandingStep = parseInt(brandingStep);
      const payload = {
        responses: questionResponse,
        brandingStep: brandingStep,
      };
      await brandingServices.updateBrandingQuestion(payload);
      toast({
        title: "Response updated successfully",
        description: "Response update successful",
        variant: "default",
      });
      if (brandingStep === 3) {
        navigate("/create/generated-calendar", {
          state: { month: "june" },
        });
      } else {
        navigate(`${location.pathname}?brandingStep=${brandingStep + 1}`);
      }
    } catch (error) {
      toast({
        title: "Response updation failed",
        description: "An error occured while updating responses",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    let brandingStep: any = new URLSearchParams(window.location.search).get("brandingStep");
    setBrandindStep(brandingStep);
    fetchQuestion();
  }, [location.search]);
  return (
    <>
      {brandingStep == 1 && (
        <img
          src={contentPlanBanner}
          alt="banner"
          className="bg-white py-6 px-12 flex flex-col justify-left w-full"
        />
      )}
      <QuestionSkeleton
        questions={questions}
        onSubmit={(formData) => handleSubmit(formData)}
        initialValues={initialValues}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default Branding;
