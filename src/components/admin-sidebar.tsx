"use client";

import React from "react";
import {
  BarChartBig,
  BellIcon,
  BuildingIcon,
  CircleDollarSignIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
  Settings2,
  ShapesIcon,
  SquareKanbanIcon,
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
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

const prefix = "/admin";

const data = {
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Account", url: `${prefix}/account` },
        { title: "Terms & Conditions", url: `${prefix}/tnc` },
        { title: "Privacy & Policy", url: `${prefix}/privacy` },
        // { title: "Support", url: `${prefix}/support` },
      ],
    },
  ],
  projects: [
    { name: "Dashboard", url: `${prefix}`, icon: LayoutDashboardIcon },
    { name: "Companies", url: `${prefix}/companies`, icon: BuildingIcon },
    { name: "Analytics", url: `${prefix}/analytics`, icon: BarChartBig },
    { name: "Reports", url: `${prefix}/reports`, icon: ClipboardListIcon },
    { name: "Category", url: `${prefix}/category`, icon: ShapesIcon },
    { name: "Notifications", url: `${prefix}/notif`, icon: BellIcon },
    { name: "ROI Tracker", url: `${prefix}/roi`, icon: SquareKanbanIcon },
    {
      name: "Subscription",
      url: `${prefix}/subscription`,
      icon: CircleDollarSignIcon,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
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
        <div className="h-20 w-full flex justify-center items-center">
          <Image
            src={"/image/logo/kevin-logo.svg"}
            height={200}
            width={200}
            className="h-full w-[116px]  "
            alt="logo"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <button
          type="button"
          aria-label="Toggle theme"
          className={cn(
            "py-2 h-16 border px-2 rounded-full relative transition-colors w-full",
            currentTheme === "light" ? "bg-sky-300" : "bg-zinc-900",
          )}
          onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
        >
          <div
            className={cn(
              "rounded-full p-2 aspect-square size-12 bg-white hover:bg-zinc-100 absolute top-2 transition-all",
              currentTheme === "light" ? "left-2" : "right-2",
            )}
          />
          <div className="w-full h-full flex flex-row justify-between">
            <div className="size-12 p-2 flex justify-center items-center">
              <Image
                src="/moon.svg"
                height={64}
                width={64}
                alt="moon icon"
                className="h-full w-full"
              />
            </div>
            <div className="size-12 p-2 flex justify-center items-center">
              <Image
                src="/sun.svg"
                height={64}
                width={64}
                alt="sun icon"
                className="h-full w-full"
              />
            </div>
          </div>
        </button>
      </SidebarFooter>

      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
