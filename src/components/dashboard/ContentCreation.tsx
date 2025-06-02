
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const toneOptions = [
  "Friendly",
  "Authoritative", 
  "Inspirational",
  "Quirky",
  "Professional",
  "Empathetic",
  "Bold",
  "Playful",
  "Minimalist",
  "Socratic"
];

const variantOptions = [
  { value: "1", label: "One" },
  { value: "3", label: "Three" },
  { value: "5", label: "Five" }
];

const ContentCreation = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedTones, setSelectedTones] = useState<string[]>(["Friendly", "Authoritative"]);
  const [variants, setVariants] = useState("3");

  const handleMagicPrompt = () => {
    // Placeholder for magic prompt functionality
    console.log("Magic prompt clicked");
  };

  const handleGenerate = () => {
    console.log("Generate clicked", { prompt, selectedTones, variants });
  };

  return (
    <div className="flex-1 p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Let's Create</h1>
        
        {/* Step 1: Prompt Input */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">What do you want to post about?</h2>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="AR is reshaping design in 2025. Explore the latest trends, challenges, and real-world applications in our latest infographic. Stay ahead in the evolving world of design."
              className="min-h-[120px] text-gray-600 resize-none border border-gray-300 rounded-lg"
            />
            <Button
              onClick={handleMagicPrompt}
              className="absolute bottom-4 right-4 bg-yellow-300 hover:bg-yellow-400 text-black font-medium px-4 py-2 rounded-lg"
            >
              Magic Prompt
            </Button>
          </div>
        </div>

        {/* Step 2: Tone Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Select your Tone</h2>
          <ToggleGroup
            type="multiple"
            value={selectedTones}
            onValueChange={setSelectedTones}
            className="flex flex-wrap gap-2 justify-start"
          >
            {toneOptions.map((tone) => (
              <ToggleGroupItem
                key={tone}
                value={tone}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  selectedTones.includes(tone)
                    ? "bg-purple-200 border-purple-400 text-purple-800"
                    : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tone}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Step 3: Number of Variants */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Number of variants</h2>
          <RadioGroup value={variants} onValueChange={setVariants} className="flex gap-4">
            {variantOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value}
                  className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                    variants === option.value
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Step 4: Generate Button */}
        <div className="pt-4">
          <Button
            onClick={handleGenerate}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-lg text-lg"
          >
            GENERATE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCreation;
