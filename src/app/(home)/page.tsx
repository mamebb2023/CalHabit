"use client";

import AreYouSurePrompt from "@/components/AreYouSurePrompt";
import Button from "@/components/shared/Button";
import { getUserFromToken, logout, User } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="flex flex-col gap-3 p-5 h-screen">
      <div className="p-3 px-5 bg-glass flex items-center justify-between rounded-xl">
        <h1 className="text-2xl font-bold">
          {user && `Welcome, ${user.name}!`}
        </h1>

        <div className="flex-center gap-3">
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Button className="rounded-xl px-3 py-2">
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
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col justify-between rounded-xl bg-glass">
        <div className="flex-1 flex items-center justify-end">
          <div className="flex flex-col gap-3 items-end w-[90%] md:w-[60%] lg:w-[50%] px-3 md:px-7 lg:px-10">
            <p>
              CalHabit is a habit tracker that helps you keep track of your
              habits. You can create habits. It&apos;s a simple way to stay on
              top of your goals and build healthy habits.
            </p>
            {user ? (
              <Button className="rounded-xl px-3 py-2">
                <Link href="/habits">My Habits</Link>
              </Button>
            ) : (
              <Button className="rounded-xl px-3 py-2">
                <Link href="/register">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
        <h1
          className={`text-[5em] md:text-[7em] lg:text-[10em] ${font.className}`}
        >
          CalHabit
        </h1>
      </div>
    </div>
  );
};

export default Page;
