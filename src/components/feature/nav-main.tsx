'use client';

import type { LucideIcon } from 'lucide-react';
import { IconCirclePlusFilled } from '@tabler/icons-react';

import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  isDarkMode: boolean;
}

export function NavMain({
  items,
  isDarkMode,
  ...props
}: NavMainProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mt-6" {...props}>
      <SidebarContent className="flex flex-col gap-2">
        <div
          className={`text-sm ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
          } font-medium text-muted-foreground mb-2`}
        >
          Main
        </div>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              className={`bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground 
            active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear ${
              isDarkMode
                ? 'text-emerald-200 hover:bg-blue-800'
                : 'text-emerald-600 hover:bg-blue-200'
            }`}
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem
                key={item.title}
                className={`${
                  isDarkMode
                    ? 'text-emerald-400 hover:bg-blue-800'
                    : 'text-emerald-700 hover:bg-blue-200'
                }`}
              >
                <SidebarMenuButton>
                  <Icon className={`${isDarkMode ? 'text-emerald-400 ' : 'text-emerald-700'}`} />
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
