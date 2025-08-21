"use client";
import React from "react";
import {
  BarChartBig,
  BellIcon,
  BuildingIcon,
  ClipboardListIcon,
  Frame,
  LayoutDashboardIcon,
  MapIcon,
  PieChart,
  Settings2,
  ShapesIcon,
  SquareKanbanIcon,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// sample data
const data = {
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: LayoutDashboardIcon },
    { name: "Companies", url: "#", icon: BuildingIcon },
    { name: "Analytics", url: "#", icon: BarChartBig },
    { name: "Reports", url: "#", icon: ClipboardListIcon },
    { name: "Category", url: "#", icon: ShapesIcon },
    { name: "Notifications", url: "#", icon: BellIcon },
    { name: "ROI Tracker", url: "#", icon: SquareKanbanIcon },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // placeholder during SSR → avoids flicker/mismatch
    return (
      <Sidebar variant="sidebar" className="py-6" collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="h-20 w-full border rounded-lg"></div>
        </SidebarHeader>
        <SidebarContent>
          <NavProjects projects={data.projects} />
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <div className="py-2 h-16 border px-2 rounded-full relative bg-zinc-200" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Sidebar variant="sidebar" className="py-6" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="h-20 w-full border rounded-lg"></div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div
          className={cn(
            "py-2 h-16 border px-2 rounded-full relative transition-colors",
            currentTheme === "light" ? "bg-sky-300" : "bg-zinc-900"
          )}
        >
          <Button
            className={cn(
              "rounded-full p-2 aspect-square size-12 bg-white hover:bg-zinc-100 absolute top-2 transition-all",
              currentTheme === "light" ? "left-2" : "right-2"
            )}
            onClick={() => {
              setTheme(currentTheme === "light" ? "dark" : "light");
            }}
            size="icon"
          />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
