
import { Calendar, FileText, PenTool, Settings, Star, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const sidebarItems = [
  {
    title: "Profile View",
    icon: User,
    id: "profile",
  },
  {
    title: "Create",
    icon: PenTool,
    id: "create",
  },
  {
    title: "Calendar",
    icon: Calendar,
    id: "calendar",
  },
  {
    title: "Spot Plan",
    icon: Star,
    id: "spot-plan",
  },
  {
    title: "Drafts",
    icon: FileText,
    id: "drafts",
  },
  {
    title: "Settings",
    icon: Settings,
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
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onItemSelect(item.id)}
                className={`w-16 h-16 flex flex-col items-center justify-center rounded-full transition-all ${
                  activeItem === item.id
                    ? "bg-yellow-400 text-black shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                tooltip={item.title}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
