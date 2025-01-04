"use client";

import React, { useState } from "react";
import { SidebarBody, SidebarLink } from "./ui/sidebar"; // Ensure these components exist
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Utility function for conditional classes

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col bg-gray-100 dark:bg-neutral-800 w-64 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <SidebarBody>
        {/* Sidebar Header with Logo */}
        <div className="p-4">
          <Logo />
        </div>

        {/* Sidebar Links */}
        <div className="mt-8 flex flex-col gap-2 px-4">
          {links.map((link, idx) => (
            <SidebarLink key={idx} href={link.href} label={link.label}>
              {link.icon}
            </SidebarLink>
          ))}
        </div>

        {/* Footer Link (e.g., Profile or User) */}
        <div className="mt-auto p-4">
          <SidebarLink
            href="#"
            label="Manu Arora"
            icon={
              <Image
                src="https://assets.aceternity.com/manu.png"
                className="h-7 w-7 flex-shrink-0 rounded-full"
                width={50}
                height={50}
                alt="Avatar"
              />
            }
          />
        </div>
      </SidebarBody>
    </div>
  );
};

// Logo Component
export const Logo = () => {
  return (
    <Link href="#" className="flex items-center space-x-2">
      <div className="h-5 w-6 bg-black dark:bg-white rounded"></div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

// Logo Icon Component (Simplified)
export const LogoIcon = () => {
  return (
    <Link href="#" className="flex items-center space-x-2">
      <div className="h-5 w-6 bg-black dark:bg-white rounded"></div>
    </Link>
  );
};
