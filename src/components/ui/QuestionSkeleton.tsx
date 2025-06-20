import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import DropdownQuestion from "./DropdownQuestion";
import McqQuestion from "./McqQuestion";
import TextQuestion from "./TextQuestion";

type QuestionType = "text" | "mcq" | "dropdown";

interface ResponeOption {
  optionId: number;
  optionLable: string;
  optionValue: string;
  isDisabled: boolean;
  _id: string;
}

interface Question {
  _id: string;
  questionId: number;
  questionText: string;
  promptText?: string;
  questionType: string;
  isMultipleSelect: number;
  responseOptions: ResponeOption[];
}

const questions = [
  {
    _id: "68525105bf759408439dce43",
    questionId: 1,
    questionText: "What’s your brand/ personal name?",
    promptText: "We’ll use this in your content and captions",
    isMultipleSelect: 0,
    questionType: "text",
    responseOptions: [],
  },
  {
    _id: "68525105bf759408439dce45",
    questionId: 2,
    questionText: "Who are you trying to reach on LinkedIn?",
    promptText: "We’ll use this in your content and captions",
    questionType: "mcq",
    isMultipleSelect: 1,
    responseOptions: [
      {
        optionId: 1,
        optionLable: "Startups",
        optionValue: "Startups",
        isDisabled: false,
        _id: "68525105bf759408439dce46",
      },
      {
        optionId: 2,
        optionLable: "Professionals",
        optionValue: "Professionals",
        isDisabled: false,
        _id: "68525105bf759408439dce47",
      },
      {
        optionId: 3,
        optionLable: "Job Seekers",
        optionValue: "Job Seekers",
        isDisabled: false,
        _id: "68525105bf759408439dce48",
      },
    ],
  },
  {
    _id: "68525105bf759408439dce60",
    questionId: 3,
    questionText: "Select your experience level",
    promptText: "We’ll use this in your content and captions",
    questionType: "dropdown",
    isMultipleSelect: 0,
    responseOptions: [
      {
        optionId: 1,
        optionLable: "Beginner",
        optionValue: "Beginner",
        isDisabled: false,
        _id: "68525105bf759408439dce61",
      },
      {
        optionId: 2,
        optionLable: "Intermediate",
        optionValue: "Intermediate",
        isDisabled: false,
        _id: "68525105bf759408439dce62",
      },
      {
        optionId: 3,
        optionLable: "Expert",
        optionValue: "Expert",
        isDisabled: false,
        _id: "68525105bf759408439dce63",
      },
    ],
  },
];

/**
 Branding component:
 question initilization
 for each question render question skeleton
 handle resposne change in branding component
 react hook form
 */

const QuestionSkeleton = () => {


  return (
    <div className="bg-white p-6 flex flex-col justify-left">
      {questions.map((ques) => {
        const questionId = ques._id;

        return (
          <div key={questionId} className="mb-6">
            <p className="text-xl font-semibold text-dark-charcoal-500 mb-2 font-bricolage-grotesque">
              {ques.questionText}
            </p>
            {ques.promptText && (
              <p className="text-sm text-base-gray-600 mb-4 font-manrope">{ques.promptText}</p>
            )}

            {ques.questionType === "text" && <TextQuestion />}

            {ques.questionType === "mcq" && <McqQuestion />}

            {ques.questionType === "dropdown" && <DropdownQuestion />}
          </div>
        );
      })}
      
    </div>
  );
};

export default QuestionSkeleton;
