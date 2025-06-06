
import { Bell, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import appLogo from "@/assests/svg/appLogo.svg";

interface DashboardHeaderProps {
  isRightSidebarOpen: boolean;
  onToggleRightSidebar: () => void;
}

const DashboardHeader = ({ isRightSidebarOpen, onToggleRightSidebar }: DashboardHeaderProps) => {
  const handleNotificationClick = () => {
    console.log("Notifications clicked");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-100">
      <div className="flex items-center space-x-8">
        <img src={appLogo} alt="SpotBOI" className="h-8" />
        <h1 className="text-2xl font-bold text-gray-900">Let's Create</h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search for settings, Posting, etc"
            className="pl-10 w-80 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </Button>

        {/* Growth Natives Tag */}
        <div className="text-sm text-gray-600">#GrowthNatives</div>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggleRightSidebar}>
            <ChevronRight 
              className={`w-4 h-4 transition-transform ${isRightSidebarOpen ? 'rotate-180' : ''}`} 
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
