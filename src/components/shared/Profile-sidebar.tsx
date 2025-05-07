import { LuUser } from "react-icons/lu";
import { MdOutlineSecurity, MdOutlineEventAvailable } from "react-icons/md";

export const profileSettingItems = [
  {
    title: "Personal Information",
    icon: <LuUser className="w-5 h-5" />,
    href: "/profile/personal-info",
  },
  {
    title: "My Events",
    icon: <MdOutlineEventAvailable className="w-5 h-5" />,
    href: "/profile/my-events",
  },
  {
    title: "Privacy & Security",
    icon: <MdOutlineSecurity className="w-5 h-5" />,
    href: "/profile/privacy_and_security",
  },
];
