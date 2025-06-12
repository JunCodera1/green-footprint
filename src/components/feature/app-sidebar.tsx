"use client";

import React from "react";
import {
  BarChart3,
  Users,
  Leaf,
  Shield,
  Zap,
  Settings,
  HelpCircle,
  Search,
  Database,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "Green User",
    email: "user@greenfootprint.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "Carbon Tracking",
      url: "/carbon-tracking",
      icon: BarChart3,
    },
    {
      title: "Eco Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Smart Home",
      url: "/smart-home",
      icon: Zap,
    },
    {
      title: "Carbon Offset",
      url: "/carbon-offset",
      icon: Shield,
    },
    {
      title: "Eco Products",
      url: "/marketplace",
      icon: Leaf,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Help Center",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
  ],
  documents: [
    {
      name: "Carbon Reports",
      url: "/reports",
      icon: Database,
    },
    {
      name: "Eco Blog",
      url: "/blog",
      icon: FileText,
    },
    {
      name: "Community",
      url: "/community",
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDarkMode } = useDarkMode();

  return (
    <Sidebar
      collapsible="offcanvas"
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/">
                <Leaf className="!size-5 text-emerald-600" />
                <span className="text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  GreenFootprint
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
