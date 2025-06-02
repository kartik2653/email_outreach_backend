import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import appLogo from "@/assests/svg/appLogo.svg";

const DashboardHeader = () => {
  const handleNotificationClick = () => {
    console.log("Notifications clicked");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center p-6 ">
      <div className="flex items-center space-x-4">
        <img src={appLogo} alt="App Logo" />
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </Button>

        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
