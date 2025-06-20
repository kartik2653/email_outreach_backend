import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Option {
  optionId: number;
  optionLable: string;
  optionValue: string;
  _id: string;
}

interface McqQuestionProps {
  id: string;
  options: Option[];
  selected: any[];
  isMultiple: boolean;
}

const McqQuestion = ({
  id,
  options,
  selected,
  isMultiple,
}: McqQuestionProps) => {
  const [isSelect, setIsSelect] = useState(false);
  const onselect = () => {
    setIsSelect
  }
  const onRemoveTag = () => {
    setIsSelect(false)
  }
  return (
    <div>
      {isMultiple && selected.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 h-[56px] border rounded-xl border-gray-300 mt-2">
          {selected.map((option: any) => (
            <div
              key={option.optionValue}
              className="flex items-center bg-green-100 text-green-800 border-yellow-green px-3 py-1 font-dark-charcoal-500 font-manrope rounded-full text-sm"
            >
              {option.optionLable}
              <button
                className="ml-2 text-sm font-bold text-dark-charcoal-500"
                onClick={() => onRemoveTag(id, option.optionValue)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-3">
        {options
          .filter(
            (option) =>
              !isMultiple || !selected.some((s: any) => s.optionValue === option.optionValue)
          )
          .map((option) => (
            <Button
              key={option._id}
              type="button"
              onClick={() => onSelect(id, option.optionValue)}
              className="bg-base-grey-100 border border-base-grey-300 text-dark-charcoal-300 hover:bg-base-grey-200 hover:text-dark-charcoal-500 rounded-full px-4 py-2 text-sm"
            >
              {option.optionLable}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default McqQuestion;
