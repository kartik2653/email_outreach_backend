import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "./input";

const TextQuestion = ({ name, question, control, register }) => {
  console.log(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[
        {
          optionId: 0,
          optionLabel: "",
          optionValue: "",
          _id: `text-response-${question.questionId}`,
          isDisabled: 0,
        },
      ]}
      render={({ field: { value, onChange } }) => {
        // Ensure fallback if somehow value is undefined or not an array

        const currentText = Array.isArray(value) && value.length > 0 ? value[0].optionValue : "";

        const handleChange = (e) => {
          const inputValue = e.target.value;
          const responseObject = {
            optionId: 0,
            optionLabel: inputValue,
            optionValue: inputValue,
            _id: `text-response-${question.questionId}`,
            isDisabled: 0,
          };
          onChange([responseObject]); // Wrap in array to match schema
        };

        return (
          <Input
            type="text"
            value={currentText}
            onChange={handleChange}
            placeholder="Type your answer..."
            className="text-base-grey-600 font-manrope text-md"
          />
        );
      }}
    />
  );
};

export default TextQuestion;
