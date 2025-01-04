import { AnimatePresence } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AreYouSurePrompt from "./AreYouSurePrompt";
import { logout } from "@/lib/utils";

const font = Fleur_De_Leah({ subsets: ["latin"], weight: "400" });

const SideBar = () => {
  const route = useRouter();
  const [logoutPrompt, setLogoutPrompt] = useState(false);
  return (
    <>
      <AnimatePresence>
        {logoutPrompt && (
          <AreYouSurePrompt
            title="Are you sure to logout?"
            onClose={() => setLogoutPrompt(false)}
            onDelete={() => {
              route.push("/");
              logout();
            }}
          />
        )}
      </AnimatePresence>
      <div className="w-full lg:w-[25%] bg-glass rounded-lg p-2">
        <div className="px-2 flex items-center justify-between">
          <Link href="/" className={`text-[2.7em] ${font.className}`}>
            CalHabit
          </Link>
          <div className="relative">
            {/* <button className="">
            <i className="bx bx-user-circle text-3xl"></i>
          </button> */}
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
