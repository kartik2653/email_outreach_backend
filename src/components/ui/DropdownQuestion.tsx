import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  optionId: number;
  optionLable: string;
  optionValue: string;
  _id: string;
}

interface DropdownQuestionProps {
  id: string;
  options: Option[];
  value: string;
  isMultiple: boolean;
  onChange: (id: string, value: string) => void;
}

const DropdownQuestion = ({ id, options, value,  onChange }: DropdownQuestionProps) => {
  return (
    <div className="relative w-full mt-2">
      <select
        className="w-full px-4 h-[57px] pr-10 rounded-xl border appearance-none"
        onChange={(e) => onChange(id, e.target.value)}
        value={value}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.optionId} value={option.optionValue}>
            {option.optionLable}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
        <ChevronDown className="w-12 h-5 text-gray-500 px-1" />
      </div>
    </div>
  );
};

export default DropdownQuestion;
