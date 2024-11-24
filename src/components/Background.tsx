"use client";

import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    // remove - from aurora- to change background
    <div className="aurora- bg-gradient-to-tr from-color-secondary to-white">
      {children}
    </div>
  );
};

export default Background;
