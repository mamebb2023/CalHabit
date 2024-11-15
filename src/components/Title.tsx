import { logout } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DeleteHabit from "./DeleteHabit";

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

  return (
    <div className="bg-glass rounded-lg p-3 flex items-start justify-center gap-10">
      <div className="flex flex-col items-center text-2xl font-bold mb-5">
        <h1 className={`h1 ${font.className}`}>{title}</h1>
        <p>{currentYear}</p>
      </div>

      <div className="flex-1 bg-glass flex items-center justify-between p-3 rounded-lg">
        <div className="flex-center gap-2">
          {habit_name && (
            <Link
              href="/habits"
              className="p-1 hover:bg-gray-500/10 rounded-full flex-center"
            >
              <i className="bx bx-left-arrow-alt text-3xl cursor-pointer" />
            </Link>
          )}
          <div className="">
            <h6 className="h6">Welcome{name && `, ${name}`}</h6>
            <p className="text-[.8em]">{email}</p>
          </div>
        </div>

        {habit_name && (
          <div className="flex-center gap-2">
            <p className="">Habit:</p>
            <p className="font-semibold">{habit_name}</p>
          </div>
        )}

        <div className="flex-center gap-3">
          {habit_name && (
            <div>
              <div
                className="relative hover:bg-gray-500/10 p-2 rounded-lg cursor-pointer flex-center transition"
                onClick={() => setDeleteHabitPrompt(!deleteHabitPrompt)}
              >
                <i className="bx bx-trash" />
              </div>
              <AnimatePresence>
                {deleteHabitPrompt && (
                  <DeleteHabit
                    onClose={() => setDeleteHabitPrompt(false)}
                    onDelete={() => onDeleteHabit && onDeleteHabit()}
                  />
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            className="flex-center p-2 rounded-lg hover:bg-gray-500/10 transition"
            onClick={() => {
              route.push("/");
              logout();
            }}
          >
            <i className="bx bx-log-out" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Title;
