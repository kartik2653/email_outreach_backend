import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RightSidebar from "@/components/dashboard/RightSidebar";
import arrowLogo from "@/assests/svg/arrow.svg";

const PersonalDashboard = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-row w-full bg-white">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col h-full">
          <DashboardHeader
            isRightSidebarOpen={isRightSidebarOpen}
            onToggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          />
          <div className="flex flex-1">
            <div className="flex-1">
              <Outlet /> {/* Renders nested route components */}
            </div>
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
