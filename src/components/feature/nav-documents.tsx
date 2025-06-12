'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import type { LucideIcon } from 'lucide-react';
import { IconDots, IconFolder, IconShare3, IconTrash } from '@tabler/icons-react';

interface NavDocumentsProps {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  isDarkMode: boolean;
}

export function NavDocuments({
  items,
  isDarkMode,
}: NavDocumentsProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mt-6">
      <div className="px-2">
        <div
          className={`text-sm ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
          } font-medium text-muted-foreground mb-2`}
        >
          Documents
        </div>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem
                key={item.name}
                className={`${
                  isDarkMode
                    ? 'text-emerald-400 hover:bg-blue-800'
                    : 'text-emerald-700 hover:bg-blue-200'
                }`}
              >
                <SidebarMenuButton>
                  <a href={item.url} className="flex items-center gap-2">
                    <Icon className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    <span className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {item.name}
                    </span>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-auto p-1 hover:bg-accent rounded-sm">
                      <IconDots
                        className={`text-sidebar-foreground/70 ${isDarkMode ? 'text-white' : ''}`}
                      />
                      <span className="sr-only">More</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-24 rounded-lg bg-green-100"
                    side="right"
                    align="start"
                  >
                    <DropdownMenuItem>
                      <IconFolder />
                      <span>Open</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconShare3 />
                      <span>Share</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <IconTrash />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`${
                isDarkMode
                  ? 'text-emerald-400 hover:bg-blue-800'
                  : 'text-emerald-700 hover:bg-blue-200'
              }`}
            >
              <IconDots
                className={`text-sidebar-foreground/70 ${
                  isDarkMode ? 'text-emerald-200' : 'text-emerald-600'
                }`}
              />
              <span className={`${isDarkMode ? 'text-emerald-200' : 'text-emerald-600'}`}>
                More
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </div>
  );
}
