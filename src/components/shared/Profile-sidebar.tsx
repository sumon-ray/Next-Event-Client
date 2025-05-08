import { LuUser } from "react-icons/lu";
<<<<<<< HEAD
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
=======
import { MdOutlineSecurity, MdOutlineEventAvailable, MdPassword } from "react-icons/md";
>>>>>>> 0e488ffd7e04337a505717bc4c187854759f9565

export const profileSettingItems = [
  {
    title: "Personal Information",
    icon: <LuUser className="w-5 h-5" />,
    href: "/profile/personal-info",
  },
  {
    title: "Password",
    icon: <MdPassword className="w-5 h-5" />,
    href: "/profile/change-password",
  },
  {
    title: "My Events",
    icon: <MdOutlineEventAvailable className="w-5 h-5" />,
    href: "/profile/my-events",
  },
  {
    title: "review",
    icon: <MdOutlineReviews className="w-5 h-5" />,
    href: "/profile/review",
  },
  {
    title: "Privacy & Security",
    icon: <MdOutlineSecurity className="w-5 h-5" />,
    href: "/profile/privacy_and_security",
  },
  
];
