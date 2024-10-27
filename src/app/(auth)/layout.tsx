"use client";

import React from "react";
import { motion } from "framer-motion";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute -top-[30%] left-[50%] -translate-x-[50%] size-[600px] bg-color-secondary opacity-40 rounded-full blur-3xl"
      />
      {children}
    </div>
  );
};

export default layout;
