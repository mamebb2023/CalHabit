"use client";

import { verifyToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const user = verifyToken();

    if (user) {
      router.push("/habits");
    }
  });

  return <div className="h-screen flex-center">{children}</div>;
};

export default Layout;
