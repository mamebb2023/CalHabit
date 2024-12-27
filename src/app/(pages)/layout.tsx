"use client";

import { getUserFromToken } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
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
    <AnimatePresence>
      {children && (
        <motion.div
          key={pathname} // Use pathname as a unique key
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Layout;
