"use client";

import SideBar from "@/components/SideBar";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="flex gap-3 flex-col md:flex-row p-3 h-screen overflow-hidden">
      <SideBar />

      <div className="relative flex-1 rounded-lg overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default Layout;
