"use client";

import { UserProvider } from "@/context/Context";
import { verifyToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const user = verifyToken();

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
