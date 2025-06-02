
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

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
  "Socratic",
];

const variantOptions = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
];

const contentCreationSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters long").max(500, "Prompt cannot exceed 500 characters"),
  selectedTones: z.array(z.string()).min(1, "Please select at least one tone").max(3, "You can select up to 3 tones"),
  variants: z.enum(["1", "2", "3"], {
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
      selectedTones: ["Friendly", "Authoritative"],
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
    
    // Placeholder for magic prompt functionality
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

  return (
    <div className="flex-1 p-8">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Let's Create</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Prompt Input */}
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-700">
                    What do you want to post about?
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        {...field}
                        placeholder="AR is reshaping design in 2025. Explore the latest trends, challenges, and real-world applications in our latest infographic. Stay ahead in the evolving world of design."
                        className="min-h-[120px] text-gray-600 resize-none border border-gray-300 rounded-lg"
                      />
                      <Button
                        type="button"
                        onClick={handleMagicPrompt}
                        className="absolute bottom-4 right-4 bg-yellow-green hover:bg-yellow-400 text-black font-medium px-4 py-2 rounded-lg"
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
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Select your Tone
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-wrap gap-2 justify-start"
                    >
                      {toneOptions.map((tone) => (
                        <ToggleGroupItem
                          key={tone}
                          value={tone}
                          className={`px-4 py-2 rounded-full border transition-colors ${
                            field.value.includes(tone)
                              ? "bg-purple-200 border-purple-400 text-purple-800"
                              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tone}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
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
                  <FormLabel className="text-lg font-medium text-gray-700">
                    Number of variants
                  </FormLabel>
                  <FormControl>
                    <RadioGroup 
                      value={field.value} 
                      onValueChange={field.onChange} 
                      className="flex gap-4"
                    >
                      {variantOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label
                            htmlFor={option.value}
                            className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
                              field.value === option.value
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Step 4: Generate Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="px-20 bg-black hover:bg-gray-800 text-white font-medium py-4 rounded-3xl text-lg"
              >
                GENERATE
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContentCreation;
