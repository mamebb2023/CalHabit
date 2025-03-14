import Link from "next/link";
import React from "react";
import { Fleur_De_Leah } from "next/font/google";
import Button from "@/components/shared/Button";
import { useUserContext } from "@/context/UserContext";

const font = Fleur_De_Leah({ subsets: ["latin"], weight: "400" });

const Header = () => {
  const { user, logout } = useUserContext();

  return (
    <div className="px-10 md:px-20 lg:px-40 py-2 items-center flex justify-between">
      <Link href="/" className={`text-[2.5em] ${font.className}`}>
        <span className="bg-clip-text bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 text-transparent">
          CalHabit
        </span>
      </Link>

      {!user ? (
        <div className="flex items-center gap-2">
          <Link href="/login">Login</Link>
          <Button className="">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button>
            <Link href="/habits">My Habits</Link>
          </Button>
          <div
            className="size-10 bg-white p-2 text-black border-2 border-transparent hover:border-white hover:bg-transparent rounded-full cursor-pointer active:scale-95"
            onClick={logout}
          >
            <i className="bx bx-log-out-circle"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
