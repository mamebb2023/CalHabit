"use client";

import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    // Radial gradient starting from the bottom center
    <div
      className="bg-custom-radial from-color-secondary to-white fixed inset-0"
      style={{ backgroundOrigin: "center bottom" }}
    >
      {children}
    </div>
  );
};

export default Background;
