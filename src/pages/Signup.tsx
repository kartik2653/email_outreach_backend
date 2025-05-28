
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import FeatureCarousel from "@/components/FeatureCarousel";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const carouselSlides = [
    {
      title: "your AI social media team",
      subtitle: "Complete automation",
      hashtag: "#Automate",
      description: "From content creation to community management, let AI handle your entire social media presence while you focus on growing your business."
    },
    {
      title: "viral content made easy",
      subtitle: "AI-powered creativity",
      hashtag: "#Create",
      description: "Create engaging posts, stories, and campaigns that resonate with your audience using advanced AI that understands trends and engagement."
    },
    {
      title: "scale your social presence",
      subtitle: "Growth optimization", 
      hashtag: "#Grow",
      description: "Optimize posting times, hashtags, and content strategy with AI insights that drive real engagement and follower growth."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to SpotBoi",
        });
        navigate("/");
      } else {
        toast({
          title: "Signup failed",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialSignup = (provider: string) => {
    toast({
      title: `${provider} signup`,
      description: `${provider} authentication would be implemented here`,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Spot<span className="bg-lime-400 text-black px-1 rounded">BOI</span>
              <span className="text-xs bg-lime-400 text-black px-1 rounded ml-1">AI</span>
            </h1>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Hey there!</h2>
              <h3 className="text-2xl font-bold text-gray-900">Welcome to Spotboi.ai</h3>
              <p className="text-gray-600">Our AI powered Social Media Platform!</p>
            </div>
          </div>

          {/* Signup Form */}
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
                <Label htmlFor="password">Create your password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "SIGNUP"}
            </Button>
          </form>

          {/* Social Signup */}
          <div className="space-y-4">
            <div className="text-center text-gray-500">Or continue with</div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialSignup("Google")}
                className="flex items-center justify-center space-x-2"
              >
                <span>Google</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialSignup("LinkedIn")}
                className="flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">Have a account? </span>
            <Link to="/login" className="text-black font-semibold hover:underline">
              Login
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

export default Signup;
