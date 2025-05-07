"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
// import { useSidebar } from "./sidebar-provider";
// import NavItem from "./nav-item";

interface SidebarProps {
  className?: string;
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Sidebar({
  className,
  items,
  logo,
  footer,
}: SidebarProps) {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            aria-hidden="true"
            onClick={close}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-white shadow-xl lg:hidden ${className}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  {logo || <span className="text-xl font-bold">Bookify</span>}
                </div>
                <motion.button
                  onClick={close}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                  {items.map((item, index) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      isActive={pathname === item.href}
                      index={index}
                    />
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t">
                {footer || (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-gray-500 text-center"
                  >
                    © {new Date().getFullYear()} Bookify
                  </motion.div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
