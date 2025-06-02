
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
    <Sidebar className="w-16">
      <SidebarContent className="flex flex-col items-center py-6">
        <SidebarMenu className="space-y-4">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onItemSelect(item.id)}
                isActive={activeItem === item.id}
                className="w-12 h-12 flex items-center justify-center"
                tooltip={item.title}
              >
                <item.icon className="w-6 h-6" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
