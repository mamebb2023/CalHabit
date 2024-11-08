"use client";

import { getDaysForMonth } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import React, { useState } from "react";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

const Page = () => {
  const [selectedDay, setSelectedDay] = useState<{
    month: number;
    day: number;
  } | null>(null);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const days = getDaysForMonth(currentYear, currentMonth);

  return (
    <div className="flex-center p-5 flex-wrap gap-5 h-screen">
      <div className="text-2xl font-bold mb-5 flex-center flex-col">
        <h1 className={`h1 ${font.className}`}>My Habits</h1>
        {currentYear}
      </div>

      <div>
        <p className="font-bold">habit-name</p>

        <div className="w-[250px] border border-color-primary rounded-2xl p-3">
          <div className="flex items-center justify-between border-b">
            <p className="font-semibold mb-2">{monthNames[currentMonth]}</p>
            <p className="body-2">
              {currentMonth}/{currentYear}
            </p>
          </div>

          <div className="grid grid-cols-7 text-center font-semibold mb-1">
            {weekDays.map((day) => (
              <div key={day} className="p-1 text-gray-600 text-[0.8em]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((day, index) => {
              const isSelected =
                selectedDay?.month === currentMonth && selectedDay.day === day;
              const isPastDate =
                currentMonth < currentMonth || // Past month
                (currentMonth === currentMonth &&
                  typeof day === "number" &&
                  day < today); // Current month, before today

              return (
                <div key={index} className="relative">
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="flex-center relative"
                      >
                        <div className="absolute bottom-0 p-1 bg-white border rounded-full flex-center gap-1">
                          <div className="size-7 flex-center p-1 rounded-full text-[.8em] cursor-pointer bg-green-100 hover:bg-green-200 transition">
                            <i className="bx bx-check" />
                          </div>
                          <div className="size-7 flex-center p-1 rounded-full text-[.8em] cursor-pointer bg-red-100 hover:bg-red-200 transition">
                            <i className="bx bx-x" />
                          </div>
                          {/* <div className="absolute -bottom-3">
                                <i className="bx bx-chevron-down shadow-lg" />
                              </div> */}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    className={`flex-center p-1 border rounded-lg cursor-pointer ${
                      day && day === today && currentMonth === currentMonth
                        ? "bg-color-primary text-white"
                        : isPastDate
                        ? "opacity-50 cursor-not-allowed"
                        : "text-gray-800"
                    } ${day ? "" : "invisible"}`}
                    onClick={() =>
                      !isPastDate && day !== null
                        ? setSelectedDay(
                            selectedDay?.month === currentMonth &&
                              selectedDay.day === day
                              ? null // If the same day is clicked, close the log
                              : { month: currentMonth, day: day as number } // Otherwise, open the log for the new day
                          )
                        : null
                    }
                  >
                    {`${day}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-center border border-color-secondary rounded-full size-10">
        <i className="bx bx-plus"></i>
      </div>
    </div>
  );
};

export default Page;
