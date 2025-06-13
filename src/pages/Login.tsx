import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Eye, EyeOff } from "lucide-react";
import FeatureCarousel from "@/components/FeatureCarousel";
import { loginSchema, type LoginFormData } from "@/schemas/authSchemas";
import { authService } from "@/services/api/authService";
import logo from "@/assests/svg/appLogo.svg";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthLink from "@/components/auth/AuthLink";
import { useAuthStore } from "@/store";
import { ThemeLoader } from "@/components/ui/loader";

const Login = () => {
  const { toast } = useToast();
  const { setAuthData, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkExistingAuth = () => {
      const accessToken = localStorage.getItem("accessToken");
      
      if (accessToken && isAuthenticated()) {
        // User is already logged in, redirect to dashboard
        navigate("/dashboard/personal", { replace: true });
      } else {
        // No valid auth, show login form
        setIsCheckingAuth(false);
      }
    };

    checkExistingAuth();
  }, [navigate, isAuthenticated]);

  // Show loader while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <ThemeLoader size={32} text="Checking authentication..." />
      </div>
    );
  }

  const carouselSlides = [
    {
      title: "your new favourite crew member",
      subtitle: "AI-powered automation",
      hashtag: "#Automate",
      description:
        "Streamline your social media workflow with intelligent automation that handles posting, engagement, and analytics.",
    },
    {
      title: "content that converts",
      subtitle: "Creative AI assistance",
      hashtag: "#Create",
      description:
        "Generate scroll-stopping content with AI that understands your brand voice and audience preferences.",
    },
    {
      title: "analytics that matter",
      subtitle: "Growth insights",
      hashtag: "#Grow",
      description:
        "Track what works with detailed analytics and get AI-powered recommendations for explosive growth.",
    },
  ];

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.loginUser(data);
      setAuthData(response);
      toast({
        title: "Login successful!",
        description: response.message || "Welcome back to SpotBoi",
      });
      // Redirect to onboarding flow instead of home
      navigate("/onboarding-questions/1");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = async (provider: string) => {
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
          title: `${provider} login successful!`,
          description: "Welcome to SpotBoi",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: `${provider} login failed`,
        description: error.message || `${provider} authentication failed`,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout
      title=""
      subtitle="Welcome back!"
      description="Let's get you back to creating scroll-stopping content!"
      carouselSlides={carouselSlides}
    >
      {/* Login Form */}
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

          <div>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="text-right mt-2">
              <Link to="#" className="text-sm text-gray-600 hover:text-gray-900">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-standard h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <ThemeLoader size={16} />
              <span>Logging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {/* Social Login */}
      <SocialAuthButtons
        mode="login"
        onGoogleAuth={() => handleSocialLogin("Google")}
        onLinkedInAuth={() => handleSocialLogin("LinkedIn")}
      />

      {/* Sign Up Link */}
      <AuthLink text="Don't have an account?" linkText="Sign up" to="/signup" />
    </AuthLayout>
  );
};

export default Login;
