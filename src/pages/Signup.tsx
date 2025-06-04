import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signupSchema, type SignupFormData } from "@/schemas/authSchemas";
import { authService } from "@/services/api/authService";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthLink from "@/components/auth/AuthLink";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const carouselSlides = [
    {
      title: "your AI social media team",
      subtitle: "Complete automation",
      hashtag: "#Automate",
      description:
        "From content creation to community management, let AI handle your entire social media presence while you focus on growing your business.",
    },
    {
      title: "viral content made easy",
      subtitle: "AI-powered creativity",
      hashtag: "#Create",
      description:
        "Create engaging posts, stories, and campaigns that resonate with your audience using advanced AI that understands trends and engagement.",
    },
    {
      title: "scale your social presence",
      subtitle: "Growth optimization",
      hashtag: "#Grow",
      description:
        "Optimize posting times, hashtags, and content strategy with AI insights that drive real engagement and follower growth.",
    },
  ];

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await authService.signupUser(data);

      toast({
        title: "Account created successfully!",
        description: response.message || "Welcome to SpotBoi",
      });
      navigate("/onboarding-questions/1");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSocialSignup = async (provider: string) => {
    try {
      let response;

      if (provider === "Google") {
        // response = await loginWithGoogle();
      } else if (provider === "LinkedIn") {
        // response = await loginWithLinkedIn();
      }

      if (response?.redirectUrl) {
        window.location.href = response.redirectUrl;
      } else if (response?.success) {
        toast({
          title: `${provider} signup successful!`,
          description: "Welcome to SpotBoi",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: `${provider} signup failed`,
        description: error.message || `${provider} authentication failed`,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout
      title="Hey there!"
      subtitle="Welcome to Spotboi.ai"
      description="Our AI powered Social Media Platform!"
      carouselSlides={carouselSlides}
    >
      {/* Signup Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Enter your work email"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <PasswordInput
            id="password"
            placeholder="Create your password"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput
            id="confirmPassword"
            placeholder="Re-enter your password"
            {...register("confirmPassword")}
            error={errors?.["confirm-password"]?.message}
          />
        </div>

        <Button
          type="submit"
          className="h-12 rounded-standard w-full bg-black hover:bg-gray-800 text-white py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      {/* Social Signup */}
      <SocialAuthButtons
        mode="signup"
        onGoogleAuth={() => handleSocialSignup("Google")}
        onLinkedInAuth={() => handleSocialSignup("LinkedIn")}
      />

      {/* Login Link */}
      <AuthLink text="Have an account?" linkText="Login" to="/login" />
    </AuthLayout>
  );
};

export default Signup;
