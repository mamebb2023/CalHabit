"use client";

import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="fixed inset-0 h-screen flex justify-center overflow-hidden">
        <div className="rotate-circle w-[2600px] flex items-center gap-20">
          {/* First Circle with Orange-Yellow Gradient */}
          <div className="rotate-360 w-[1200px] h-[1200px] rounded-full bg-gradient-to-r from-orange-600 via-yellow-400 to-orange-300"></div>
          {/* Second Circle with Cool Gradient */}
          <div className="rotate-360 w-[1200px] h-[1200px] rounded-full bg-gradient-to-t from-cyan-400 via-blue-500 to-indigo-600"></div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default Background;
