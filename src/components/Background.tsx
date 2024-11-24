"use client";

import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="aurora relative min-h-screen">
      {/* Content */}
      <div className="z-10 relative">{children}</div>
    </div>
  );
};

export default Background;
