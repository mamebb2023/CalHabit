"use client";

import React from "react";
import { useUserContext } from "@/context/UserContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import GradientOrbCTA from "@/components/GradientOrbCTA";

const Hero = () => {
  const { user } = useUserContext();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex justify-center px-6 md:px-12 lg:px-20 xl:px-32 py-20 min-h-[120vh]"
    >
      <div className="absolute inset-0 flex-center opacity-70">
        <div className="rotate-360 absolute top-16 flex-center size-[1000px] bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 rounded-full flex-center">
          <div className="absolute size-100px bg-cyan-500 blur-lg"></div>
          <div className="size-[70%] bg-white rounded-full" />
        </div>
        <div className="absolute top-1/4 -left-40 backdrop-blur-3xl size-[800px] rounded-full" />
        <div className="absolute top-10 -right-40 blur-[100px] size-[800px] bg-white rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 text-primary rounded-full text-sm font-medium border border-color-primary bg-white/80 backdrop-blur-sm"
          >
            <Star className="size-4 text-color-primary" />
            <span>Excellence, then, is not an act, but a habit</span>
          </motion.div>

          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
            <p className="mb-2">
              Uplift Your{" "}
              <span className="text-white px-3 rounded-lg pb-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
                Productivity
              </span>
              ,
            </p>
            <p className="mt-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
              Simplify
              </span>
              Your Life
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            We&apos;re here to simplify the intricacies of your life, providing
            a user-friendly platform to keep track of your habits.
          </p>

          <div className="flex flex-col items-center gap-6 mt-4">
            {user ? (
              <GradientOrbCTA href="/habits" text="My Habits" />
            ) : (
              <GradientOrbCTA href="/register" text="Get Started Free" />
            )}
          </div>

          <div className="w-[1000px] h-[700px] border border-gray-300 bg-gray-100 rounded-2xl flex-center p-5 ">
            <div className="flex-1 h-full bg-white rounded-2xl"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
