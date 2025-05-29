import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      <div className="text-center text-white space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">
            Spot<span className="bg-lime-400 text-black px-2 rounded">BOI</span>
          </h1>
          <p className="text-xl opacity-90">AI-Powered Social Media Platform</p>
        </div>

        <div className="space-x-4">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link to="/login">Login</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-600"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
