import createLogo from "@/assests/svg/create.svg";
import calendarLogo from "@/assests/svg/calendar.svg";
import postPitLogo from "@/assests/svg/postpit.svg";
import spotplanLogo from "@/assests/svg/spotplan.svg";
import settingsLogo from "@/assests/svg/settings.svg";
import supportIcon from "@/assests/svg/support.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import appLogo from "@/assests/svg/appLogo.svg";

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
    <Sidebar className="bg-primary-white border-r border-gray-100">
      <SidebarContent className="flex flex-col py-6 bg-white">
        {/* Logo */}
        <div className="px-6 mb-8">
          <img src={appLogo} alt="logo" />
        </div>

        {/* Main Menu Items */}
        <div className="flex-1">
          <SidebarMenu className="space-y-2 px-4">
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => onItemSelect(item.id)}
                  className={`hover:bg-light-yellow-green w-full flex items-center gap-3 px-4 py-7 rounded-[16px] text-left transition-all ${
                    activeItem === item.id
                      ? "bg-yellow-green text-black font-medium hover:bg-yellow-green"
                      : "text-gray-700"
                  }`}
                >
                  <img src={item.icon} className="w-7 h-7" alt={item.title} />
                  <span className="font-bricolage-grotesque text-lg">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        {/* Bottom Menu Items */}
        <div className="px-4 space-y-2">
          <SidebarMenuItem className="list-none">
            <SidebarMenuButton
              onClick={() => onItemSelect("settings")}
              className={`w-full flex items-center gap-3 px-4 py-7 rounded-lg text-left transition-all ${
                activeItem === "settings"
                  ? "bg-yellow-400 text-black font-medium"
                  : "text-gray-700 hover:bg-light-yellow-green"
              }`}
            >
              <img src={settingsLogo} className="w-7 h-7" alt="Settings" />
              <span className="text-lg font-bricolage-grotesque">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="list-none">
            <SidebarMenuButton className="w-full flex items-center gap-3 px-4 py-7 rounded-lg text-left transition-all text-gray-700 hover:bg-light-yellow-green">
              <img src={supportIcon} className="w-7 h-7" alt="support" />
              <span className="text-lg">Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
