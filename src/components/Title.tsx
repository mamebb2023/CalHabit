import { logout } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AreYouSurePrompt from "@/components/AreYouSurePrompt";

interface Props {
  title?: string;
  currentYear?: number;
  name?: string;
  email?: string;
  habit_name?: string;
  onDeleteHabit?: () => void;
}

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Title = ({
  title,
  currentYear,
  name,
  email,
  habit_name,
  onDeleteHabit,
}: Props) => {
  const route = useRouter();

  const [deleteHabitPrompt, setDeleteHabitPrompt] = useState(false);
  const [logoutPrompt, setLogoutPrompt] = useState(false);

  return (
    <div className="z-10 flex flex-col md:flex-row md:items-start gap-5 md:gap-10 p-3 bg-glass rounded-lg">
      <div className="flex justify-between md:justify-center items-center md:flex-col gap-2 text-2xl px-3">
        <Link
          href="/"
          className={`h1 text-[2.5em] leading-[4.5rem] ${font.className}`}
        >
          {title}
        </Link>
        <p className="font-bold">{currentYear}</p>
      </div>

      <div className="flex-1 flex items-center justify-between bg-glass p-3 rounded-lg">
        <div className="flex-center gap-2">
          {habit_name && (
            <Link
              href="/habits"
              className="p-1 hover:bg-gray-500/10 rounded-full flex-center"
            >
              <i className="bx bx-left-arrow-alt text-2xl cursor-pointer" />
            </Link>
          )}
          <div>
            <h6 className="h6">Welcome{name && `, ${name}`}</h6>
            <p className="text-[.8em]">{email}</p>
          </div>
        </div>

        {habit_name && (
          <div className="hidden md:flex-center gap-2">
            <p className="">Habit:</p>
            <p className="font-semibold">{habit_name}</p>
          </div>
        )}

        <div className="flex-center gap-3">
          {habit_name && (
            <>
              <div
                className="relative hover:bg-gray-500/10 p-2 rounded-lg border border-color-primary hover:border-transparent cursor-pointer flex-center transition"
                onClick={() => setDeleteHabitPrompt(!deleteHabitPrompt)}
              >
                <i className="bx bx-trash" />
              </div>
              <AnimatePresence>
                {deleteHabitPrompt && (
                  <AreYouSurePrompt
                    title="Are you sure to delete your habit?"
                    onClose={() => setDeleteHabitPrompt(false)}
                    onDelete={() => onDeleteHabit && onDeleteHabit()}
                  />
                )}
              </AnimatePresence>
            </>
          )}

          <>
            <div
              className="hover:bg-gray-500/10 p-2 rounded-lg cursor-pointer flex-center transition"
              onClick={() => setLogoutPrompt(!logoutPrompt)}
            >
              <i className="bx bx-log-out" />
            </div>
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
          </>
        </div>
      </div>

      {habit_name && (
        <div className="md:hidden flex-center gap-2">
          <p className="font-bold">Habit:</p>
          <p className="">{habit_name}</p>
        </div>
      )}
    </div>
  );
};

export default Title;
