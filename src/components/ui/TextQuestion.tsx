import React, { useState } from "react";
import { useForm } from "react-hook-form";

// interface TextQuestionProps {
//   value: string;
// }



const TextQuestion = () => {
  const {register} = useForm()
  return (
    <div className="w-full h-[56px] rounded-full border-2 border-base-grey-300">
      <input
        type="text"
        className="rounded-full h-full px-4 w-full outline-none"
        {...register("")}
      />
    </div>
  );
};

export default TextQuestion;
