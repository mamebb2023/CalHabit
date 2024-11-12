"use client";

import AddHabit from "@/components/AddHabit";
import AddHabitBtn from "@/components/AddHabitBtn";
import { days, habits, months } from "@/constants";
import { getDaysForMonth, getLastTwoDigits } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Page = () => {
  const [addHabit, setAddHabit] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{
    habitIndex: number | null;
    day: number | null;
  }>({
    habitIndex: null,
    day: null,
  });

  const currentDate = new Date();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysForMonth = getDaysForMonth(currentYear, currentMonth) as number[];

  return (
    <>
      <AnimatePresence>
        {addHabit && (
          <AddHabit
            onClose={() => setAddHabit(false)}
            onInputChange={() => {}}
            handleAddHabit={() => {}}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col p-5 flex-wrap gap-5 h-screen">
        <div className="flex items-start justify-start">
          <div className="flex flex-col items-end text-2xl font-bold mb-5">
            <h1 className={`h1 ${font.className}`}>My Habits</h1>
            <p>{currentYear}</p>
          </div>
        </div>

        <div className="flex items-start justify-center flex-1">
          <div className="flex-center gap-3">
            {habits.map((habit, habitIndex) => (
              <div key={habitIndex}>
                <Link
                  href={`/habits/${habit.habitName}`}
                  className="flex items-center justify-between m-1 p-1 px-3 hover:bg-gray-500/10 rounded-lg transition"
                >
                  <p className="font-bold">{habit.habitName}</p>
                  <i className="bx bx-right-arrow-alt"></i>
                </Link>

                <div className="w-[250px] border border-color-primary rounded-2xl p-3">
                  <div className="flex items-center justify-between border-b border-color-secondary">
                    <p className="font-semibold">{months[currentMonth]}</p>
                    <p className="body-2">
                      {currentMonth}/{getLastTwoDigits(`${currentYear}`)}
                    </p>
                  </div>

                  <div className="grid grid-cols-7 text-center font-semibold mb-1">
                    {days.map((day) => (
                      <div key={day} className="p-1 text-gray-600 text-[0.8em]">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {daysForMonth.map((day, index) => {
                      const adjustedMonth = currentMonth + 1; // Adjust month for one-based comparison

                      const habitDate = habit.dates.find(
                        (d) =>
                          d.date.year === currentYear &&
                          d.date.month === adjustedMonth &&
                          d.date.day === day
                      );

                      const isDone = habitDate?.status === "done";
                      const isUndone = habitDate?.status === "undone";
                      const isPastDate = day < today;

                      return (
                        <div
                          key={index}
                          className={`relative flex-center p-1 border border-gray-500/30 rounded-[10px] ${
                            day &&
                            day === today &&
                            currentMonth === currentMonth
                              ? "bg-color-primary text-white cursor-pointer"
                              : !isPastDate
                              ? "cursor-not-allowed"
                              : "text-gray-800 cursor-pointer"
                          } ${!day && "invisible"}`}
                          onClick={() =>
                            day <= today &&
                            setSelectedDay((prev) =>
                              prev.habitIndex === habitIndex && prev.day === day
                                ? { habitIndex: null, day: null }
                                : { habitIndex, day }
                            )
                          }
                        >
                          <AnimatePresence>
                            {selectedDay.habitIndex === habitIndex &&
                              selectedDay.day === day && (
                                <motion.div
                                  initial={{ y: 10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 10, opacity: 0 }}
                                  className="flex-center relative"
                                >
                                  <div className="z-[3] absolute bottom-0 p-1 bg-white border rounded-full flex-center gap-1 text-color-primary">
                                    <div
                                      className="size-5 flex-center p-1 rounded-full text-[.7em] cursor-pointer bg-green-100 hover:bg-green-200 transition"
                                      // onClick={() => onClickDone}
                                    >
                                      <i className="bx bx-check" />
                                    </div>
                                    <div
                                      className="size-5 flex-center p-1 rounded-full text-[.7em] cursor-pointer bg-red-100 hover:bg-red-200 transition"
                                      // onClick={() => onClickUndone}
                                    >
                                      <i className="bx bx-x" />
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                          </AnimatePresence>
                          {day}
                          <div className="absolute -top-2 -right-2 rounded-full text-[.6em] flex-center">
                            {habitDate ? (
                              isDone ? (
                                <div className="flex-center p-[1px] text-white rounded-[50%] bg-green-500">
                                  <i className="bx bx-check" />
                                </div>
                              ) : (
                                isUndone && (
                                  <div className="flex-center p-[1px] text-white rounded-[50%] bg-red-500">
                                    <i className="bx bx-x" />
                                  </div>
                                )
                              )
                            ) : day > today ? (
                              <i className="bx bx-lock opacity-70"></i>
                            ) : (
                              <div className="flex-center p-[1px] text-white rounded-[50%] bg-gray-400">
                                <i className="bx bx-history"></i>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
            <AddHabitBtn onClick={() => setAddHabit(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
