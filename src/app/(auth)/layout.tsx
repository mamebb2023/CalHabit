"use client";

import { getUserFromToken } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const user = getUserFromToken();

    if (user) {
      router.push("/habits");
    }
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Unique key for animations on route change
        initial={{ opacity: 0, scale: 0.95 }} // Start with lower opacity and translateY
        animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and original position
        className="h-screen flex-center flex-col"
      >
        <Link
          href="/"
          className="absolute top-3 left-3 flex-center p-2 hover:bg-glass transition-all rounded-full"
        >
          <i className="bx bx-home"></i>
        </Link>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
