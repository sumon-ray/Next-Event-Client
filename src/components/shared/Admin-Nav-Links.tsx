"use client";

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
import { LucideIcon } from "lucide-react";

export type TNavItem = {
  title: string;
  url: string;
  icon?: LucideIcon | any;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export type TAdminNavLinks = {
  navMain: TNavItem[];
  navSecondary: TNavItem[];
  projects: {
    name: string;
    url: string;
    icon: LucideIcon | any;
  }[];
};
export const AdminNavLinks: TAdminNavLinks = {
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
        { title: "Add Event", url: "/admin/products/add-event" },
        { title: "Event List", url: "/admin/products/event-list" },
      ],
    },
    {
      title: "Payments Management",
      url: "/admin/manage-payments",
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
      items: [{ title: "Profile", url: "/dashboard/settings/profile" }],
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
