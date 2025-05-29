import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Eye, EyeOff } from "lucide-react";
import FeatureCarousel from "@/components/FeatureCarousel";
import { signupSchema, type SignupFormData } from "@/schemas/authSchemas";
import { authService } from "@/services/api/authService";
import logo from "@/assests/svg/appLogo.svg";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

      if (response.success) {
        toast({
          title: "Account created successfully!",
          description: response.message || "Welcome to SpotBoi",
        });
        navigate("/");
      }
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
    <div className="min-h-screen flex p-8">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full relative h-full flex items-center justify-center">
          <h1 className="text-3xl font-bold absolute top-0 left-0 text-gray-900">
            <img src={logo} alt="Logo" />
          </h1>
          <div className="w-full space-y-8">
            {/* Logo */}
            <div className="space-y-2">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 font-bricolage-grotesque">
                  Hey there!
                </h2>
                <h3 className="text-5xl font-bold text-gray-900 font-bricolage-grotesque">
                  Welcome to Spotboi.ai
                </h3>
                <p className="text-gray-600">Our AI powered Social Media Platform!</p>
              </div>
            </div>

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
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create your password"
                    {...register("password")}
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 rounded-[1rem] w-full bg-black hover:bg-gray-800 text-white py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "SIGNUP"}
              </Button>
            </form>

            {/* Social Signup */}
            <div className="space-y-4">
              <div className="text-center text-gray-500">Or continue with</div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignup("Google")}
                  className="flex items-center justify-center space-x-2 rounded-[1rem]"
                >
                  <span>Google</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialSignup("LinkedIn")}
                  className="flex items-center justify-center space-x-2 rounded-[1rem]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>LinkedIn</span>
                </Button>
              </div>
            </div>

            {/* Login Link */}
            <div>
              <span className="text-gray-600">Have an account? </span>
              <Link to="/login" className="text-black font-semibold hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Feature Carousel */}
      <div className="flex-[0.7] bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-[1rem]">
        <FeatureCarousel slides={carouselSlides} />
      </div>
    </div>
  );
};

export default Signup;
