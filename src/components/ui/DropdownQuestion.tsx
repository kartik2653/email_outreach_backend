import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Controller } from "react-hook-form";

const DropdownQuestion = ({ name, question, control }) => {
  const { responseOptions: options, isMultipleSelect } = question;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => {
        const toggleOption = (option) => {
          const isSelected = value.some((v) => v.optionValue === option.optionValue);

          if (isMultipleSelect) {
            const updated = isSelected
              ? value.filter((v) => v.optionValue !== option.optionValue)
              : [...value, option];
            onChange(updated);
          } else {
            onChange([option]);
            setIsOpen(false);
          }
        };

        const handleRemove = (optionValue) => {
          onChange(value.filter((v) => v.optionValue !== optionValue));
        };

        const selectedLabels =
          value?.length > 0
            ? value.map((val) => (
                <span
                  key={val.optionValue}
                  className="border border-1 border-yellow-green bg-green-100 text-dark-charcoal-500 px-3 py-1 ml-[8px] rounded-full text-md font-manrope"
                >
                  {val.optionLabel}
                  <button
                    className="ml-2 text-sm font-bold ps-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val.optionValue);
                    }}
                    type="button"
                  >
                    <img src="/src/assests/svg/chipsCross.svg" alt="" />
                  </button>
                </span>
              ))
            : "Select option(s)";

        return (
          <div className="relative w-full mt-2">
            {/* Dropdown toggle */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-between items-center w-full px-4 h-[57px] border rounded-2xl cursor-pointer mt-3"
            >
              <span className="text-sm text-gray-700">{selectedLabels}</span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>

            {/* Options list */}
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full border rounded-xl bg-white shadow-md max-h-60 overflow-auto">
                {options.map((option) => {
                  const isSelected = value.some((v) => v.optionValue === option.optionValue);
                  return (
                    <div
                      key={option._id}
                      className={`px-4 py-2 text-md font-manrope cursor-pointer hover:bg-gray-100 ${
                        isSelected
                          ? "bg-light-green text-dark-charcoal-500 text-md"
                          : "text-dark-charcoal-300"
                      }`}
                      onClick={() => toggleOption(option)}
                    >
                      {option.optionLabel}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default DropdownQuestion;
