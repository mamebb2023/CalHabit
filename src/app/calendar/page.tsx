"use client";

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

  const getDaysForMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const firstWeekday = firstDay === 0 ? 6 : firstDay - 1;

    return Array.from({ length: firstWeekday })
      .fill(null)
      .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  return (
    <div className="flex items-center justify-center p-5 flex-wrap gap-5">
      <div className="grid grid-cols-5 gap-5">
        <div className="w-full text-center text-2xl font-bold mb-5">
          <h1 className={`h1 ${font.className}`}>Calendar</h1>
          {currentYear}
        </div>

        {monthNames.map((monthName, monthIndex) => {
          const days = getDaysForMonth(currentYear, monthIndex);

          return (
            <div
              key={monthIndex}
              className="w-[250px] border border-color-primary rounded-2xl p-3"
            >
              <div className="text-center font-semibold mb-2">{monthName}</div>

              <div className="grid grid-cols-7 text-center font-semibold mb-1">
                {weekDays.map((day) => (
                  <div key={day} className="p-1 text-gray-600 text-[0.8em]">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {days.map((day, index) => {
                  const isPastDate =
                    monthIndex < currentMonth || // Past month
                    (monthIndex === currentMonth &&
                      typeof day === "number" &&
                      day < today); // Current month, before today

                  const isSelected =
                    selectedDay?.month === monthIndex &&
                    selectedDay.day === day;

                  return (
                    <div key={index} className="relative">
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div className="flex-center relative">
                            <div className="absolute bottom-0 p-1 bg-white border rounded-full flex-center gap-1">
                              <div className="size-7 flex-center p-1 rounded-full text-[.8em] cursor-pointer bg-green-100">
                                <i className="bx bx-check" />
                              </div>
                              <div className="size-7 flex-center p-1 rounded-full text-[.8em] cursor-pointer bg-red-100">
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
                          day && day === today && monthIndex === currentMonth
                            ? "bg-color-primary text-white"
                            : isPastDate
                            ? "opacity-50 cursor-not-allowed"
                            : "text-gray-800"
                        } ${day ? "" : "invisible"}`}
                        onClick={() =>
                          !isPastDate && day !== null
                            ? setSelectedDay(
                                selectedDay?.month === monthIndex &&
                                  selectedDay.day === day
                                  ? null // If the same day is clicked, close the log
                                  : { month: monthIndex, day: day as number } // Otherwise, open the log for the new day
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
          );
        })}
      </div>
    </div>
  );
};

export default Page;
