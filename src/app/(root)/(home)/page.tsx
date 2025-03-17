"use client";

import React from "react";
import { Fleur_De_Leah } from "next/font/google";
import Header from "@/components/Header";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import Button from "@/components/shared/Button";

const font = Fleur_De_Leah({ subsets: ["latin"], weight: "400" });

const Page = () => {
  const { user } = useUserContext();

  return (
    <div className="h-full flex flex-col">
      <Header />

      <div className="flex-1 flex items-end">
        <div className="flex flex-col gap-5 px-10 py-5">
          <h1
            className={`text-[10em] bg-clip-text bg-gradient text-transparent ${font.className} leading-[1.2]`}
          >
            CalHabit
          </h1>

          <p className="max-w-[90%] md:max-w-[50%]">
            A habit tracker that helps you stay on top of your goals. Create and
            track habits easily, making it simple to build and maintain healthy
            routines. Stay motivated and on course to achieving your personal
            growth goals.
          </p>
          <div className="max-w-[90%] md:max-w-[50%] flex justify-end">
            {user ? (
              <Button>
                <Link href="/habits">My Habits</Link>
              </Button>
            ) : (
              <Button>
                <Link href="/register">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
