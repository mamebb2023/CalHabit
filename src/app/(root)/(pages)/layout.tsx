"use client";

import SideBar from "@/components/SideBar";
import { AuroraBackground } from "@/components/ui/aurora-background";
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
    <AuroraBackground>
      <div className="flex gap-3 flex-col md:flex-row p-3 h-screen overflow-hidden bg-gradient-to-b from-transparent via-transparent to-indigo-200">

        <SideBar />

        <div className="relative flex-1 rounded-lg overflow-y-scroll">
          {children}
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Layout;
