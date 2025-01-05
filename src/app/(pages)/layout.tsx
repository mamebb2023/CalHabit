"use client";

import SideBar from "@/components/SideBar";
import { getUserFromToken } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex gap-3 flex-col md:flex-row p-3 h-screen overflow-hidden">
      <SideBar />

      <motion.div
        key={pathname} // Use pathname as a unique key
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex-1 bg-glass rounded-lg overflow-y-scroll"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Layout;
