"use client";

import { useUserContext } from "@/context/UserContext"; // Adjust the path if needed
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { user } = useUserContext(); // Access the user from context

  useEffect(() => {
    // If user is already logged in, redirect to /habits
    if (user) {
      router.push("/habits");
    }
  }, [user, router]); // Depend on user and router to trigger on change

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Unique key for animations on route change
        initial={{ opacity: 0, scale: 0.95 }} // Start with lower opacity and translateY
        animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and original position
        className="h-screen w-full flex-center flex-col bg-gradient-to-b from-transparent via-transparent to-indigo-200 px-4"
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
