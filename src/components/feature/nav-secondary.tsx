'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { useNavigate } from 'react-router-dom';

interface NavSecondaryProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  isDarkMode: boolean;
}

export function NavSecondary({
  items,
  isDarkMode,
  ...props
}: NavSecondaryProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mt-6" {...props}>
      <SidebarContent>
        <div
          className={`text-sm ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
          } font-medium text-muted-foreground mb-2`}
        >
          Utilities
        </div>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const navigate = useNavigate();
            const handleClick = () => {
              navigate(item.url);
            };
            return (
              <SidebarMenuItem
                key={item.title}
                className={`${
                  isDarkMode
                    ? 'text-emerald-400 hover:bg-blue-800'
                    : 'text-emerald-700 hover:bg-blue-200'
                }`}
              >
                <SidebarMenuButton onClick={handleClick}>
                  <Icon className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <span className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
}
