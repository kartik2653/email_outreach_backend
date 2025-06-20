import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";

interface Option {
  optionId: number;
  optionLabel: string;
  optionValue: string;
  _id: string;
}

interface McqQuestionProps {
  name: string;
  control: any;
  error?: any;
  question: any;
}

const McqQuestion: React.FC<McqQuestionProps> = ({ name, control, error, question }) => {
  const [isMultiple, _] = useState(question?.isMultipleSelect);
  const [options, __] = useState(question?.responseOptions);
  return (
    <div className="mb-4">
      <Controller
        control={control}
        name={name}
        render={({ field: { value = [], onChange } }) => {
          const selected = value;

          const handleSelect = (val: string) => {
            if (isMultiple) {
              if (!value.includes(val)) {
                onChange([...value, val]);
              }
            } else {
              onChange([val]);
            }
          };

          const handleRemove = (val: string) => {
            if (isMultiple) {
              onChange(value.filter((v: string) => v !== val));
            } else {
              onChange([]);
            }
          };

          return (
            <>
              {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 h-auto min-h-[56px] border rounded-xl border-gray-300 mt-2">
                  {selected.map((val: string) => {
                    const opt = options.find((o) => o.optionValue === val);
                    return (
                      <div
                        key={val}
                        className="flex items-center bg-green-100 text-green-800 border-yellow-green px-3 py-1 rounded-full text-sm"
                      >
                        {opt?.optionLabel}
                        <button
                          className="ml-2 text-sm font-bold"
                          onClick={() => handleRemove(val)}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-3">
                {options
                  .filter((opt) => !isMultiple || !selected.includes(opt.optionValue))
                  .map((opt) => (
                    <Button
                      key={opt._id}
                      type="button"
                      onClick={() => handleSelect(opt.optionValue)}
                      className={`${
                        selected.includes(opt.optionValue)
                          ? "bg-green-200 text-green-800"
                          : "bg-base-grey-100 text-dark-charcoal-300"
                      } border border-base-grey-300 hover:bg-base-grey-200 rounded-full px-4 py-2 text-sm`}
                    >
                      {opt.optionLabel}
                    </Button>
                  ))}
              </div>

              {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
            </>
          );
        }}
      />
    </div>
  );
};

export default McqQuestion;
