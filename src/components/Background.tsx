import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg min-h-screen">
      {/* Animated Gradient Background */}
      <div className="bg absolute inset-0"></div>

      {/* Content */}
      <div className="z-10 relative">{children}</div>
    </div>
  );
};

export default Background;
