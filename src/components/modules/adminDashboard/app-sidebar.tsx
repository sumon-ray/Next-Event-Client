"use client";

import * as React from "react";
import {
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  SquareTerminal,  
  ShoppingCart,
  BarChart3,
  PackageSearch, 
  Truck, 
  User,
  Star,
} from "lucide-react";

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

const data = {
  navMain: [
    {
      title: "Home",
      url: "/admin/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Product",
      url: "/admin/products",
      icon: Bot,
      items: [
        {
          title: "Add Event",
          url: "/admin/products/add-event",
        },
        {
          title: "Event List",
          url: "/admin/products/event-list",
        },
      ],
    },
    {
      title: "Order-payment",
      url: "/admin/order-payment",
      icon: ShoppingCart,
    },
    {
      title: "user",
      url: "/admin/user",
      icon: User,
    },
    {
      title: "review",
      url: "/admin/review",
      icon: Star,
    },
    {
      title: "Dashboard Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
    },     
    {
      title: "Store Performance",
      url: "/dashboard/performance",
      icon: PackageSearch,
    },    
    {
      title: "Courier Management",
      url: "/dashboard/courier",
      icon: Truck,
    },    
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
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
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-zinc-800 px-4 py-2 text-xs text-muted-foreground">
        <p className="text-muted-foreground">NextEvent © 2025</p>
      </SidebarFooter>
    </Sidebar>
  );
}
