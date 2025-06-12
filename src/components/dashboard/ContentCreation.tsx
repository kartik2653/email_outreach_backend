import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { promptServices } from "@/services/api/prompt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postServices } from "@/services/api/post";

const toneOptions = [
  "Inspirational",
  "Quirky",
  "Professional",
  "Empathetic",
  "Bold",
  "Playful",
  "Minimalist",
  "Socratic",
];

const variantOptions = [
  { value: "1", label: "One" },
  { value: "3", label: "Three" },
  { value: "5", label: "Five" },
];

const contentCreationSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters long"),
  selectedTones: z
    .array(z.string())
    .min(1, "Please select at least one tone")
    .max(3, "You can select up to 3 tones"),
  variants: z.enum(["1", "3", "5"], {
    required_error: "Please select the number of variants",
  }),
});

type ContentCreationFormData = z.infer<typeof contentCreationSchema>;

const ContentCreation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEnchanching, setIsEnchancing] = useState(false);

  const form = useForm<ContentCreationFormData>({
    resolver: zodResolver(contentCreationSchema),
    defaultValues: {
      prompt: "",
      selectedTones: [],
      variants: "3",
    },
  });

  const handleMagicPrompt = async () => {
    try {
      const currentPrompt = form.getValues("prompt");
      if (!currentPrompt.trim()) {
        toast({
          title: "Error",
          description: "Please enter a prompt first before using Magic Prompt",
          variant: "destructive",
        });
        return;
      }
      setIsEnchancing(true);
      // const response: any = await promptServices.generateMagicPrompt({ promptText: currentPrompt });
      // form.setValue("prompt", response?.data);
      toast({
        title: "Magic Prompt",
        description: "Your prompt has been enhanced!",
      });
    } catch (error) {
      toast({
        title: "Magic Prompt",
        description: error?.message || "Failed to enchance prompt",
      });
    } finally {
      setIsEnchancing(false);
    }
  };

  const onSubmit = async (data: ContentCreationFormData) => {
    console.log("Generate clicked", data);

    // Navigate to generated posts page with form data
    navigate("/dashboard/generated-posts", {
      state: { formData: data },
    });
  };

  const removeTone = (toneToRemove: string) => {
    const currentTones = form.getValues("selectedTones");
    const updatedTones = currentTones.filter((tone) => tone !== toneToRemove);
    form.setValue("selectedTones", updatedTones);
  };

  const addTone = (toneToAdd: string) => {
    const currentTones = form.getValues("selectedTones");
    if (currentTones.length < 3 && !currentTones.includes(toneToAdd)) {
      form.setValue("selectedTones", [...currentTones, toneToAdd]);
    }
  };

  return (
    <div className="flex-1 p-8 px-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Prompt Input */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-gray-900 mb-4 block font-bricolage-grotesque">
                  What do you want to post about?
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      {...field}
                      placeholder="AR is reshaping design in 2025. Explore the latest trends, challenges, and real-world applications in our latest infographic. Stay ahead in the evolving world of design."
                      className="min-h-[140px] text-gray-700 resize-none border-2 border-gray-200 rounded-xl p-6 pr-36 text-base leading-relaxed bg-white focus:border-yellow-green hover:border-yellow-green font-manrope"
                    />
                    <Button
                      type="button"
                      onClick={isEnchanching ? () => {} : handleMagicPrompt}
                      className="absolute bottom-4 right-4 bg-yellow-green hover:bg-yellow-green text-black font-semibold px-6 py-2 rounded-full text-sm shadow-sm"
                    >
                      {isEnchanching ? "Enchancing..." : "Magic Prompt"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Step 2: Tone Selection */}
          <FormField
            control={form.control}
            name="selectedTones"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-gray-900 mb-4 block font-bricolage-grotesque">
                  Select your Tone
                </FormLabel>

                {/* Selected Tones Display */}
                {field.value.length > 0 && (
                  <div className="flex flex-wrap gap-3 !mt-5 mb-6 p-4 rounded-xl border-[1px]">
                    {field.value.map((tone) => (
                      <Badge
                        key={tone}
                        variant="secondary"
                        className="hover:bg-light-yellow-green bg-light-yellow-green border-yellow-green text-black px-4 py-2 rounded-full flex items-center gap-2 text-base shadow-sm transition-colors font-manrope"
                      >
                        {tone}
                        <X className="w-4 h-4 cursor-pointer" onClick={() => removeTone(tone)} />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Available Tones Grid */}
                <FormControl>
                  <div className="flex flex-wrap gap-3 !mt-5">
                    {toneOptions
                      .filter((tone) => !field.value.includes(tone))
                      .map((tone) => {
                        const isSelected = field.value.includes(tone);
                        const isDisabled = field.value.length >= 3 && !isSelected;

                        return (
                          <Button
                            key={tone}
                            type="button"
                            variant="outline"
                            onClick={() => (isSelected ? removeTone(tone) : addTone(tone))}
                            disabled={isDisabled}
                            className={`px-4 py-3 rounded-standard border-[1px] transition-all font-manrope bg-light-gray text-base
                                      ${
                                        isSelected
                                          ? "bg-yellow-green border-yellow-green text-black shadow-md hover:bg-yellow-green"
                                          : isDisabled
                                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                            : "border-gray-200 text-gray-700 hover:border-yellow-green hover:bg-light-yellow-green"
                                      }`}
                          >
                            {tone}
                          </Button>
                        );
                      })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Step 3: Number of Variants */}
          <FormField
            control={form.control}
            name="variants"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-gray-900 mb-4 block font-bricolage-grotesque">
                  Number of variants
                </FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    {variantOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        onClick={() => field.onChange(option.value)}
                        className={`px-8 py-4 rounded-standard border-[1px] transition-all text-base ${
                          field.value === option.value
                            ? "hover:bg-light-yellow-green hover:border-yellow-green bg-light-yellow-green text-black border-yellow-green shadow-md"
                            : "bg-white border-gray-200 bg-light-gray text-gray-700 hover:border-yellow-green hover:bg-light-yellow-green"
                        }`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Step 4: Generate Button */}
          <div className="pt-6">
            <Button
              type="submit"
              className="px-10 bg-black hover:bg-gray-800 text-white font-semibold py-6 rounded-standard text-lg shadow-lg transition-all hover:shadow-xl"
            >
              Generate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContentCreation;
