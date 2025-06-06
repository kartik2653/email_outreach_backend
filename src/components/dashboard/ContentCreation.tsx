
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
  prompt: z
    .string()
    .min(10, "Prompt must be at least 10 characters long")
    .max(500, "Prompt cannot exceed 500 characters"),
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

  const form = useForm<ContentCreationFormData>({
    resolver: zodResolver(contentCreationSchema),
    defaultValues: {
      prompt: "",
      selectedTones: ["Authoritative", "Friendly"],
      variants: "3",
    },
  });

  const handleMagicPrompt = () => {
    const currentPrompt = form.getValues("prompt");
    if (!currentPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt first before using Magic Prompt",
        variant: "destructive",
      });
      return;
    }

    console.log("Magic prompt clicked for:", currentPrompt);
    toast({
      title: "Magic Prompt",
      description: "Your prompt has been enhanced!",
    });
  };

  const onSubmit = (data: ContentCreationFormData) => {
    console.log("Generate clicked", data);
    toast({
      title: "Content Generation Started",
      description: `Generating ${data.variants} variant(s) with ${data.selectedTones.join(", ")} tone(s)`,
    });
  };

  const removeTone = (toneToRemove: string) => {
    const currentTones = form.getValues("selectedTones");
    const updatedTones = currentTones.filter(tone => tone !== toneToRemove);
    form.setValue("selectedTones", updatedTones);
  };

  const addTone = (toneToAdd: string) => {
    const currentTones = form.getValues("selectedTones");
    if (currentTones.length < 3 && !currentTones.includes(toneToAdd)) {
      form.setValue("selectedTones", [...currentTones, toneToAdd]);
    }
  };

  return (
    <div className="flex-1 p-8 max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Prompt Input */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-900">
                  What do you want to post about?
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      {...field}
                      placeholder="AR is reshaping design in 2025. Explore the latest trends, challenges, and real-world applications in our latest infographic. Stay ahead in the evolving world of design."
                      className="min-h-[120px] text-gray-600 resize-none border border-gray-200 rounded-lg p-4 pr-32"
                    />
                    <Button
                      type="button"
                      onClick={handleMagicPrompt}
                      className="absolute bottom-4 right-4 bg-yellow-green hover:bg-yellow-400 text-black font-medium px-4 py-2 rounded-full text-sm"
                    >
                      Magic Prompt
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
                <FormLabel className="text-lg font-medium text-gray-900">
                  Select your Tone .
                </FormLabel>
                
                {/* Selected Tones */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {field.value.map((tone) => (
                    <Badge
                      key={tone}
                      variant="secondary"
                      className="bg-yellow-green text-black px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {tone}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeTone(tone)}
                      />
                    </Badge>
                  ))}
                </div>

                {/* Available Tones */}
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {toneOptions.map((tone) => (
                      <Button
                        key={tone}
                        type="button"
                        variant="outline"
                        onClick={() => addTone(tone)}
                        disabled={field.value.includes(tone) || field.value.length >= 3}
                        className={`px-4 py-2 rounded-full border transition-colors ${
                          field.value.includes(tone)
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {tone}
                      </Button>
                    ))}
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
                <FormLabel className="text-lg font-medium text-gray-900">
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
                        className={`px-6 py-3 rounded-full transition-colors ${
                          field.value === option.value
                            ? "bg-yellow-green text-black border-yellow-green"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
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
          <div className="pt-4">
            <Button
              type="submit"
              className="px-12 bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-full text-base"
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
