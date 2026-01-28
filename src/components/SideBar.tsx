import { AnimatePresence, motion } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import AreYouSurePrompt from "./AreYouSurePrompt";
import { useUserContext } from "@/context/UserContext";

const font = Fleur_De_Leah({ subsets: ["latin"], weight: "400" });

const SideBar = () => {
  const [profilePrompt, setProfilePrompt] = useState(false);
  const [logoutPrompt, setLogoutPrompt] = useState(false);
  const { user, logout } = useUserContext();

  return (
    <>
      <AnimatePresence>
        {logoutPrompt && (
          <AreYouSurePrompt
            title="Are you sure to logout?"
            onClose={() => setLogoutPrompt(false)}
            onDelete={logout}
          />
        )}
      </AnimatePresence>

      {/* profile detail in <mobile */}
      <AnimatePresence>
        {profilePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-[15] fixed top-0 left-0 w-full h-full bg-black/50 flex-center rounded-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-start gap-3"
            >
              <div className="flex gap-3 items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className={`text-[2em] ${font.className}`}>{user?.name}</p>
                  <p className="text-sm font-normal">{user?.email}</p>
                </div>
                <div className="relative">
                  <div
                    className="hover:bg-gray-500/10 p-2 rounded-lg cursor-pointer flex-center transition"
                    onClick={() => setLogoutPrompt(!logoutPrompt)}
                  >
                    <i className="bx bx-log-out" />
                  </div>
                </div>
              </div>
              <button
                className="bg-white p-1 rounded-xl flex-center"
                onClick={() => setProfilePrompt(false)}
              >
                <i className="bx bx-x" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col justify-between w-full md:w-[30%] lg:w-[25%] bg-glass rounded-lg p-2">
        <div className="relative px-2 flex items-center justify-between">
          <Link
            href="/"
            className={`text-[2.7em] ${font.className} text-gray-900`}
          >
            CalHabit
          </Link>
          {/* profiile icon */}
          <div className="md:hidden relative z-10">
            <div
              className="flex items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-500/10 transition"
              onClick={() => setProfilePrompt(true)}
            >
              <i className="bx bx-user-circle text-3xl" />
            </div>
          </div>
        </div>

        {/* profile detail in >tablet */}
        <div className="hidden md:flex items-center justify-between p-3 bg-white/10 rounded-lg">
          <div>
            <p className={`text-[2em] ${font.className}`}>{user?.name}</p>
            <p className="text-sm font-normal">{user?.email}</p>
          </div>
          <div className="relative">
            <div
              className="hover:bg-gray-500/10 p-2 rounded-lg cursor-pointer flex-center transition"
              onClick={() => setLogoutPrompt(!logoutPrompt)}
            >
              <i className="bx bx-log-out" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
