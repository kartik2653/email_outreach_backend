import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionSkeleton from "./ui/QuestionSkeleton";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "react-day-picker";

const Branding = () => {
  const navigate = useNavigate();

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    navigate("/dashboard/personal/generated-posts", {});
  };
  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <QuestionSkeleton />
      <div className="pt-3">
        <Button
          type="submit" className="px-10 bg-black hover:bg-gray-800 text-white font-semibold py-6 rounded-standard text-lg shadow-lg transition-all hover:shadow-xl">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Branding;
