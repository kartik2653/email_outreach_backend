import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Controller } from "react-hook-form";

interface Option {
  optionId: number;
  optionLabel: string;
  optionValue: string;
  _id: string;
}

interface DropdownQuestionProps {
  name: string;
  control: any;
  question: any;
  error?: any;
}

const DropdownQuestion: React.FC<DropdownQuestionProps> = ({ name, control, error, question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMultiple, _] = useState(question?.isMultipleSelect);
  const [options, __] = useState(question?.responseOptions);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 w-full" ref={dropdownRef}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          const selectedValues = isMultiple ? value || [] : value ? [value] : [];

          const toggleValue = (val: string) => {
            if (isMultiple) {
              if (selectedValues.includes(val)) {
                onChange(selectedValues.filter((v) => v !== val));
              } else {
                onChange([...selectedValues, val]);
              }
            } else {
              onChange(val);
              setIsOpen(false);
            }
          };

          const handleRemove = (val: string) => {
            if (isMultiple) {
              onChange(selectedValues.filter((v) => v !== val));
            } else {
              onChange("");
            }
          };

          return (
            <>
              {/* Chips for selected options */}
              {selectedValues.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 min-h-[56px] border rounded-xl border-gray-300 mt-2">
                  {selectedValues.map((val: string) => {
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

              {/* Dropdown toggle button */}
              <div className="relative inline-block w-full mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex justify-between items-center px-4 h-[57px] pr-10 border rounded-xl text-left mt-2"
                >
                  <span className="text-gray-700">
                    {selectedValues.length === 0 ? "Select an option" : "Update selection"}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>

                {/* Dropdown list */}
                {isOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {options.map((opt) => {
                      const isSelected = selectedValues.includes(opt.optionValue);
                      return (
                        <div
                          key={opt.optionId}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                            isSelected ? "bg-gray-200" : ""
                          }`}
                          onClick={() => toggleValue(opt.optionValue)}
                        >
                          {opt.optionLabel}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
            </>
          );
        }}
      />
    </div>
  );
};

export default DropdownQuestion;
