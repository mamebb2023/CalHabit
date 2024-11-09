"use client";

import { getDaysForMonth } from "@/lib/utils";
// import { AnimatePresence, motion } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import React, { useState } from "react";
// import CalendarHeader from "./CalendarHeader";
import Month from "@/components/Month";

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

  return (
    <div className="flex items-center justify-center p-5 flex-wrap gap-5">
      <div className="grid grid-cols-5 gap-5">
        <div className="w-full text-center text-2xl font-bold mb-5">
          <h1 className={`h1 ${font.className}`}>Calendar</h1>
          <p>{currentYear}</p>
          <h3 className="h3">habit-name</h3>
        </div>

        {monthNames.map((monthName, monthIndex) => {
          const days = getDaysForMonth(currentYear, monthIndex);

          return (
            <Month
              key={monthIndex}
              monthIndex={monthIndex}
              monthName={monthName}
              days={days as number[]} // This is a hack to avoid null values
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              currentYear={currentYear}
              currentMonth={currentMonth}
              today={today}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
