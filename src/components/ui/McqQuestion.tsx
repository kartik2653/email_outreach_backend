import React from "react";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";

const McqQuestion = ({ name, question, control, setValue }) => {
  const { responseOptions, isMultipleSelect } = question;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => {
        const handleSelect = (option) => {
          const alreadySelected = value.find((v) => v.optionValue === option.optionValue);
          if (isMultipleSelect) {
            if (alreadySelected) {
              onChange(value.filter((v) => v.optionValue !== option.optionValue));
            } else {
              onChange([...value, option]);
            }
          } else {
            onChange([option]);
          }
        };

        const handleRemove = (optionValue) => {
          onChange(value.filter((v) => v.optionValue !== optionValue));
        };

        return (
          <>
            {value.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 border rounded-xl border-gray-300 mt-2">
                {value.map((option) => (
                  <div
                    key={option.optionValue}
                    className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {option.optionLabel}
                    <button
                      className="ml-2 text-sm font-bold"
                      onClick={() => handleRemove(option.optionValue)}
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-3">
              {responseOptions
                .filter(
                  (opt) =>
                    isMultipleSelect ||
                    value.length === 0 ||
                    !value.find((v) => v.optionValue === opt.optionValue)
                )
                .map((option) => (
                  <Button
                    key={option._id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="bg-base-grey-100 border border-base-grey-300 text-dark-charcoal-300 hover:bg-base-grey-200 hover:text-dark-charcoal-500 rounded-full px-4 py-2 text-sm"
                  >
                    {option.optionLabel}
                  </Button>
                ))}
            </div>
          </>
        );
      }}
    />
  );
};

export default McqQuestion;
