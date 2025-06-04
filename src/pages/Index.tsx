import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600"></div>
  );
};

export default Index;
