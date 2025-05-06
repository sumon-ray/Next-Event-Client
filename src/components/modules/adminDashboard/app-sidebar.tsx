"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { NavMain } from "./nav-main";
import { AdminNavLinks } from "@/components/shared/Admin-Nav-Links";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      {...props}
    >
      <SidebarHeader className="border-b bg-white border-gray-200 dark:border-zinc-800">
        <SidebarMenu className="">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center ">
                  {/* LOGO */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">NextEvent</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-4 px-2 bg-white">
        <NavMain items={AdminNavLinks.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-zinc-800 px-4 py-2 text-xs text-muted-foreground">
        <p className="text-muted-foreground">NextEvent © 2025</p>
      </SidebarFooter>
    </Sidebar>
  );
}
