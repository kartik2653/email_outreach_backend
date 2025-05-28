import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import FeatureCarousel from "@/components/FeatureCarousel";
import { loginSchema, type LoginFormData } from "@/schemas/authSchemas";
import { loginUser, loginWithGoogle, loginWithLinkedIn } from "@/services/authApi";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const carouselSlides = [
    {
      title: "your new favourite crew member",
      subtitle: "AI-powered automation",
      hashtag: "#Automate",
      description: "Streamline your social media workflow with intelligent automation that handles posting, engagement, and analytics."
    },
    {
      title: "content that converts",
      subtitle: "Creative AI assistance",
      hashtag: "#Create", 
      description: "Generate scroll-stopping content with AI that understands your brand voice and audience preferences."
    },
    {
      title: "analytics that matter",
      subtitle: "Growth insights",
      hashtag: "#Grow",
      description: "Track what works with detailed analytics and get AI-powered recommendations for explosive growth."
    }
  ];

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      
      if (response.success) {
        toast({
          title: "Login successful!",
          description: response.message || "Welcome back to SpotBoi",
        });
        navigate("/");
      }
    } catch (error: any) {
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
        response = await loginWithGoogle();
      } else if (provider === "LinkedIn") {
        response = await loginWithLinkedIn();
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
    } catch (error: any) {
      toast({
        title: `${provider} login failed`,
        description: error.message || `${provider} authentication failed`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Spot<span className="bg-lime-400 text-black px-1 rounded">BOI</span>
              <span className="text-xs bg-lime-400 text-black px-1 rounded ml-1">AI</span>
            </h1>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
              <p className="text-gray-600">
                Let's get you back to creating scroll-stopping content!
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Enter your work email</Label>
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
              
              <div>
                <Label htmlFor="password">Enter your password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
                <div className="text-right mt-2">
                  <Link to="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </Button>
          </form>

          {/* Social Login */}
          <div className="space-y-4">
            <div className="text-center text-gray-500">Or continue with</div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center space-x-2"
              >
                <span>Google</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("LinkedIn")}
                className="flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-black font-semibold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Feature Carousel */}
      <div className="flex-1 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
        <FeatureCarousel slides={carouselSlides} />
      </div>
    </div>
  );
};

export default Login;
