"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

interface NavSecondaryProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavSecondary({
  items,
  ...props
}: NavSecondaryProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mt-6" {...props}>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <a href={item.url} className="flex items-center gap-2">
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
}
