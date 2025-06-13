
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeLoader } from "@/components/ui/loader";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/login");
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <ThemeLoader size={32} text="Redirecting..." />
    </div>
  );
};

export default Index;
