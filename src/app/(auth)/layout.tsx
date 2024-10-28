"use client";

import React from "react";
import { motion } from "framer-motion";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute w-full h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -top-[30%] left-[50%] -translate-x-[50%] size-[700px] bg-color-secondary opacity-40 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute -bottom-[30%] left-0 size-[600px] bg-color-primary rounded-full blur-3xl"
        />
      </div>
      {children}
    </div>
  );
};

export default layout;
