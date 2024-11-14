"use client";

import { UserProvider } from "@/context/Context";
import { getUserFromToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      router.push("/login");
    }
  });

  return (
    <UserProvider>
      <div className="h-screen">{children}</div>
    </UserProvider>
  );
};

export default Layout;
