
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ContentCreation from "@/components/dashboard/ContentCreation";

const PersonalDashboard = () => {
  const [activeSection, setActiveSection] = useState("create");

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
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar 
          activeItem={activeSection} 
          onItemSelect={setActiveSection} 
        />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          {renderContent()}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PersonalDashboard;
