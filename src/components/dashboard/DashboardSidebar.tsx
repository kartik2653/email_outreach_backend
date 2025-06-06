
import createLogo from "@/assests/svg/create.svg";
import calendarLogo from "@/assests/svg/calendar.svg";
import postPitLogo from "@/assests/svg/postpit.svg";
import spotplanLogo from "@/assests/svg/spotplan.svg";
import profileLogo from "@/assests/svg/profile.svg";
import settingsLogo from "@/assests/svg/settings.svg";
import { HelpCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarItems = [
  {
    title: "Create",
    icon: createLogo,
    id: "create",
  },
  {
    title: "Calendar",
    icon: calendarLogo,
    id: "calendar",
  },
  {
    title: "Spotplan",
    icon: spotplanLogo,
    id: "spot-plan",
  },
  {
    title: "Postpit",
    icon: postPitLogo,
    id: "drafts",
  },
  {
    title: "Settings",
    icon: settingsLogo,
    id: "settings",
  },
];

interface DashboardSidebarProps {
  activeItem: string;
  onItemSelect: (id: string) => void;
}

const DashboardSidebar = ({ activeItem, onItemSelect }: DashboardSidebarProps) => {
  return (
    <Sidebar className="w-20 bg-white border-r border-gray-100">
      <SidebarContent className="flex flex-col items-center py-8 justify-between h-full">
        <SidebarMenu className="space-y-8">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.id} className="flex flex-col items-center">
              <SidebarMenuButton
                onClick={() => onItemSelect(item.id)}
                className={`w-12 h-12 flex flex-col items-center justify-center rounded-2xl transition-all hover:bg-gray-50 ${
                  activeItem === item.id
                    ? "bg-yellow-green shadow-sm"
                    : "bg-transparent"
                }`}
                tooltip={item.title}
              >
                <img src={item?.icon} className="w-6 h-6" alt={item.title} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Support at bottom */}
        <SidebarMenuItem className="flex flex-col items-center">
          <SidebarMenuButton
            className="w-12 h-12 flex flex-col items-center justify-center rounded-2xl transition-all hover:bg-gray-50"
            tooltip="Support"
          >
            <HelpCircle className="w-6 h-6 text-gray-600" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
