import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PersonalDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Personal Creator Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Content Creation</h3>
            <p className="text-gray-600">Create engaging content for your personal brand</p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-gray-600">Track your personal content performance</p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Scheduling</h3>
            <p className="text-gray-600">Schedule posts across your platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;
