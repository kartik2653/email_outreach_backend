import { Settings, User } from "lucide-react";
import createLogo from "@/assests/svg/create.svg";
import calendarLogo from "@/assests/svg/calendar.svg";
import postPitLogo from "@/assests/svg/postpit.svg";
import spotplanLogo from "@/assests/svg/spotplan.svg";
import profileLogo from "@/assests/svg/profile.svg";
import settingsLogo from "@/assests/svg/settings.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { set } from "date-fns";

const sidebarItems = [
  {
    title: "Profile View",
    icon: profileLogo,
    id: "profile",
  },
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
    title: "Spot Plan",
    icon: spotplanLogo,
    id: "spot-plan",
  },
  {
    title: "Drafts",
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
    <Sidebar className="w-20 bg-white border-r border-gray-200">
      <SidebarContent className="flex flex-col items-center py-8">
        <SidebarMenu className="space-y-6">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.id} className="flex flex-col items-center">
              <SidebarMenuButton
                onClick={() => onItemSelect(item.id)}
                className={`w-16 h-16 flex flex-col items-center justify-center rounded-full transition-all ${
                  activeItem === item.id
                    ? "bg-yellow-green text-black shadow-lg"
                    : "bg-black text-gray-600 hover:bg-gray-200"
                }`}
                tooltip={item.title}
              >
                <img src={item?.icon} />
              </SidebarMenuButton>
              <span className="text-xs font-medium">{item.title}</span>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
