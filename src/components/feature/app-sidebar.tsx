'use client';

import React from 'react';
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
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { NavDocuments } from './nav-documents';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';

const data = {
  user: {
    name: 'Green User',
    email: 'user@greenfootprint.com',
    avatar: '/avatars/default.jpg',
  },
  navMain: [
    {
      title: 'Carbon Tracking',
      url: '/carbon-tracking',
      icon: BarChart3,
    },
    {
      title: 'Eco Community',
      url: '/community',
      icon: Users,
    },
    {
      title: 'Smart Home',
      url: '/smart-home',
      icon: Zap,
    },
    {
      title: 'Carbon Offset',
      url: '/carbon-offset',
      icon: Shield,
    },
    {
      title: 'Eco Products',
      url: '/marketplace',
      icon: Leaf,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
    {
      title: 'Help Center',
      url: '/help',
      icon: HelpCircle,
    },
    {
      title: 'Search',
      url: '/search',
      icon: Search,
    },
  ],
  documents: [
    {
      name: 'Carbon Reports',
      url: '/reports',
      icon: Database,
    },
    {
      name: 'Eco Blog',
      url: '/blog',
      icon: FileText,
    },
    {
      name: 'Community',
      url: '/community',
      icon: MessageSquare,
    },
  ],
};

interface AppSidebarProps {
  isDarkMode: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> & React.HTMLAttributes<HTMLDivElement> = ({
  isDarkMode,
}) => {
  return (
    <Sidebar
      collapsible="offcanvas"
      className={`${isDarkMode ? 'bg-gray-800 border-gray-800' : 'bg-white border-gray-200'}`}
      isDarkMode={isDarkMode}
    >
      {/* Header */}
      <SidebarHeader className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`data-[slot=sidebar-menu-button]:!p-1.5 ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              <a href="/">
                <Leaf className={`!size-5`} />
                <span
                  className={`${
                    isDarkMode
                      ? 'text-base font-semibold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent'
                      : 'text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
                  } `}
                >
                  GreenFootprint
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <NavMain items={data.navMain} isDarkMode={isDarkMode} />
        <NavDocuments items={data.documents} isDarkMode={isDarkMode} />
        <NavSecondary items={data.navSecondary} isDarkMode={isDarkMode} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <NavUser user={data.user} isDarkMode={isDarkMode} />
      </SidebarFooter>
    </Sidebar>
  );
};
