"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Fleur_De_Leah } from "next/font/google";
import { getUserFromToken, logout, User } from "@/lib/utils";
import Button from "@/components/shared/Button";
import { AnimatePresence, motion } from "framer-motion";
import AreYouSurePrompt from "@/components/AreYouSurePrompt";

const font = Fleur_De_Leah({ subsets: ["latin"], weight: "400" });

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [logoutPrompt, setLogoutPrompt] = useState(false);

  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      setUser(user);
    }
  }, []);

  // Animation variants for characters
  const charVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Animation container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // Delay between each character
      },
    },
  };

  return (
    <div className="flex flex-col p-1 lg:p-3 h-screen">
      <div className="px-5 flex items-center justify-between">
        <Link href="/" className={`text-[2.5em] ${font.className}`}>
          {"CalHabit".split("").map((char, index) => (
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </Link>
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex-center gap-3"
          >
            {!user ? (
              <>
                <Link href="/login">Login</Link>
                <Button className="">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            ) : (
              <>
                <div
                  className="relative hover:bg-gray-500/10 p-2 rounded-lg cursor-pointer flex-center transition"
                  onClick={() => setLogoutPrompt(!logoutPrompt)}
                >
                  <i className="bx bx-log-out" />
                </div>
                <AnimatePresence>
                  {logoutPrompt && (
                    <AreYouSurePrompt
                      title="Are you sure to logout?"
                      onClose={() => setLogoutPrompt(false)}
                      onDelete={logout}
                    />
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex-center flex-col md:flex-row">
        {/* left */}
        <div className="h-[80vh] md:h-auto w-[90%] lg:w-[50%] flex flex-col justify-center">
          <div className="px-10">
            {/* Animated h1 */}
            <motion.h1
              className={`text-[5em] ${font.className}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {"CalHabit".split("").map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Animated p */}
            <motion.p
              className="mt-2 w-[70%] lg:w-[60%] font-light text-sm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {"CalHabit is a habit tracker that helps you keep track of your habits. You can create habits. It's a simple way to stay on top of your goals and build healthy habits."
                .split("")
                .map((char, index) => (
                  <motion.span key={index} variants={charVariants}>
                    {char}
                  </motion.span>
                ))}
            </motion.p>
          </div>
        </div>

        {/* right */}
        <div className="h-[80vh] md:h-auto w-[90%] lg:w-[50%] flex-center">
          <div className="w-full lg:w-[80%] h-[450px] bg-glass-gradient rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
