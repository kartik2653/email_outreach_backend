
import createLogo from "@/assests/svg/create.svg";
import calendarLogo from "@/assests/svg/calendar.svg";
import postPitLogo from "@/assests/svg/postpit.svg";
import spotplanLogo from "@/assests/svg/spotplan.svg";
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
];

interface DashboardSidebarProps {
  activeItem: string;
  onItemSelect: (id: string) => void;
}

const DashboardSidebar = ({ activeItem, onItemSelect }: DashboardSidebarProps) => {
  return (
    <Sidebar className="w-64 bg-white border-r border-gray-100">
      <SidebarContent className="flex flex-col py-6 h-full bg-white">
        {/* Logo */}
        <div className="px-6 mb-8">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-black">SpotBOI</span>
            <div className="ml-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-black">AI</span>
            </div>
          </div>
        </div>

        {/* Main Menu Items */}
        <div className="flex-1">
          <SidebarMenu className="space-y-2 px-4">
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => onItemSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeItem === item.id
                      ? "bg-yellow-400 text-black font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <img src={item.icon} className="w-5 h-5" alt={item.title} />
                  <span className="text-sm">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        {/* Bottom Menu Items */}
        <div className="px-4 space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => onItemSelect("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeItem === "settings"
                  ? "bg-yellow-400 text-black font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <img src={settingsLogo} className="w-5 h-5" alt="Settings" />
              <span className="text-sm">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all text-gray-700 hover:bg-gray-50"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
