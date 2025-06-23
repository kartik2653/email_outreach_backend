import { NavLink, useLocation } from "react-router-dom";
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
    path: "/create/single-post",
  },
  {
    title: "Calendar",
    icon: calendarLogo,
    path: "/calendar",
  },
  {
    title: "Spotplan",
    icon: spotplanLogo,
    path: "/spot-plan",
  },
  {
    title: "Postpit",
    icon: postPitLogo,
    path: "/drafts",
  },
];

const DashboardSidebar = () => {
  const location = useLocation();

  // Check if current path matches create routes
  const isCreateActive = location.pathname?.includes("/create");
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
            {sidebarItems.map((item) => {
              const isActive = item.path?.includes("/create")
                ? isCreateActive
                : location.pathname === item.path;

              return (
                <SidebarMenuItem key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    className={({ isActive: navLinkActive }) =>
                      `w-full flex items-center gap-3 p-4 rounded-[16px] text-left transition-all ${
                        navLinkActive || isActive
                          ? "bg-yellow-green text-black font-medium"
                          : "text-gray-700 hover:bg-light-yellow-green"
                      }`
                    }
                  >
                    <img src={item.icon} className="w-7 h-7" alt={item.title} />
                    <span className="font-bricolage-grotesque text-lg">{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
