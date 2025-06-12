import { NavLink } from "react-router-dom";
import createLogo from "@/assests/svg/create.svg";
import calendarLogo from "@/assests/svg/calendar.svg";
import postPitLogo from "@/assests/svg/postpit.svg";
import spotplanLogo from "@/assests/svg/spotplan.svg";
import settingsLogo from "@/assests/svg/settings.svg";
import supportIcon from "@/assests/svg/support.svg";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import appLogo from "@/assests/svg/appLogo.svg";

const sidebarItems = [
  {
    title: "Create",
    icon: createLogo,
    path: "/dashboard/create",
  },
  {
    title: "Calendar",
    icon: calendarLogo,
    path: "/dashboard/calendar",
  },
  {
    title: "Spotplan",
    icon: spotplanLogo,
    path: "/dashboard/spot-plan",
  },
  {
    title: "Postpit",
    icon: postPitLogo,
    path: "/dashboard/drafts",
  },
];

const DashboardSidebar = () => {
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
              <SidebarMenuItem key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 p-4 rounded-[16px] text-left transition-all ${
                      isActive
                        ? "bg-yellow-green text-black font-medium"
                        : "text-gray-700 hover:bg-light-yellow-green"
                    }`
                  }
                >
                  <img src={item.icon} className="w-7 h-7" alt={item.title} />
                  <span className="font-bricolage-grotesque text-lg">{item.title}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        {/* Bottom Menu Items */}
        <div className="px-4 space-y-2">
          <SidebarMenuItem className="list-none">
            <NavLink
              to="/dashboard/settings"
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 p-4 rounded-[16px] text-left transition-all ${
                  isActive
                    ? "bg-yellow-green text-black font-medium"
                    : "text-gray-700 hover:bg-light-yellow-green"
                }`
              }
            >
              <img src={settingsLogo} className="w-7 h-7" alt="Settings" />
              <span className="text-lg font-bricolage-grotesque">Settings</span>
            </NavLink>
          </SidebarMenuItem>

          <SidebarMenuItem className="list-none">
            <NavLink
              to="/support"
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 p-4 rounded-[16px] text-left transition-all ${
                  isActive
                    ? "bg-yellow-green text-black font-medium"
                    : "text-gray-700 hover:bg-light-yellow-green"
                }`
              }
            >
              <img src={supportIcon} className="w-7 h-7" alt="support" />
              <span className="text-lg font-bricolage-grotesque">Support</span>
            </NavLink>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
