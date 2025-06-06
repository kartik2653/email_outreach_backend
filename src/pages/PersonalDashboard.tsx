import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ContentCreation from "@/components/dashboard/ContentCreation";
import RightSidebar from "@/components/dashboard/RightSidebar";
import arrowLogo from "@/assests/svg/arrow.svg";

const PersonalDashboard = () => {
  const [activeSection, setActiveSection] = useState("create");
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case "create":
        return <ContentCreation />;
      case "profile":
        return (
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold text-gray-900">Profile View</h1>
            <p className="text-gray-600 mt-4">Profile management coming soon...</p>
          </div>
        );
      case "calendar":
        return (
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-4">Content scheduling coming soon...</p>
          </div>
        );
      case "spot-plan":
        return (
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold text-gray-900">Spot Plan</h1>
            <p className="text-gray-600 mt-4">Planning tools coming soon...</p>
          </div>
        );
      case "drafts":
        return (
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold text-gray-900">Drafts</h1>
            <p className="text-gray-600 mt-4">Saved drafts coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="flex-1 p-8">
            <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-4">Account settings coming soon...</p>
          </div>
        );
      default:
        return <ContentCreation />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-row w-full bg-white">
        <DashboardSidebar activeItem={activeSection} onItemSelect={setActiveSection} />
        <div className="flex-1 flex flex-col h-full">
          <DashboardHeader
            isRightSidebarOpen={isRightSidebarOpen}
            onToggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          />
          <div className="flex flex-1">
            <div className="flex-1">{renderContent()}</div>
            {isRightSidebarOpen && <RightSidebar onClose={() => setIsRightSidebarOpen(false)} />}
            {!isRightSidebarOpen && (
              <div
                onClick={() => setIsRightSidebarOpen(true)}
                className="cursor-pointer w-[32px] h-[40px] bg-gray-100 flex justify-center items-center rounded-tl-md rounded-bl-md"
              >
                <img src={arrowLogo} alt="expand" className="rotate-180 w-[6px] h-[12px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PersonalDashboard;
