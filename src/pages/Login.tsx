
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import FeatureCarousel from "@/components/FeatureCarousel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login successful!",
          description: "Welcome back to SpotBoi",
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login`,
      description: `${provider} authentication would be implemented here`,
    });
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Enter your work email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Enter your password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  required
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
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
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
