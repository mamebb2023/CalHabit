"use client";

import { days, months } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import {
  getDaysForMonth,
  getLastTwoDigits,
  getUserFromToken,
} from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const font = Fleur_De_Leah({ subsets: ["latin"], weight: "400" });

const Page = () => {
  const route = useRouter();
  const { toast } = useToast();
  const { habit_id: habit_id } = useParams() as {
    habit_id: string | undefined;
  };

  const [habit, setHabit] = useState<{
    _id: string;
    habit_name: string;
    dates: {
      date: { year: number; month: number; day: number };
      status: string;
    }[];
  } | null>(null);

  // Fetch habits when the component mounts
  useEffect(() => {
    const fetchHabits = async () => {
      const user = getUserFromToken();

      if (!user) return;

      try {
        const response = await fetch(`/api/habits/get?user_id=${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // if (response.ok) {
        const data = await response.json();

        console.log("data-1", data);

        const habit = data.habits.find(
          (h: { _id: string }) => h._id === habit_id
        );

        console.log("habit-2", habit);

        setHabit(habit);
        // }
      } catch (error) {
        console.error("Error fetching habits", error);
      }
    };
    fetchHabits();
  }, [habit_id]);
  console.log("habit-1", habit);

  const [selectedDay, setSelectedDay] = useState<{
    month: number | null;
    day: number | null;
  }>({
    month: null,
    day: null,
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const handleDayStatusUpdate = async ({
    day,
    month,
    year,
    status,
  }: {
    day: number;
    month: number;
    year: number;
    status: "done" | "undone";
  }) => {
    const user = getUserFromToken();

    if (!user) return null;

    try {
      // fetch a post request to /api/habits/updateDayStatus
      // with the habit_id, day, month, status

      const response = await fetch("/api/habits/update-day-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user._id,
          habit_id,
          day,
          month,
          year,
          status,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        toast({
          title: data.message,
        });

        route.refresh();
      }
    } catch {
      console.error("Error updating day status");
    }
  };

  return (
    <div className="flex items-center justify-center p-5 flex-wrap gap-5">
      <div className="w-full font-bold mb-5">
        <h1 className={`h1 ${font.className}`}>CalHabit</h1>
        <h3 className="h3">{habit?.habit_name}</h3>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {months.map((month, monthIndex) => {
          const adjustedMonth = monthIndex + 1; // Adjust month for one-based comparison

          const daysForMonth = getDaysForMonth(
            currentYear,
            monthIndex
          ) as number[];

          return (
            <div
              key={monthIndex}
              className="w-[250px] border border-color-primary rounded-2xl p-3"
            >
              <div className="flex items-center justify-between border-b border-color-secondary">
                <p className="font-semibold">{month}</p>
                <p className="body-2">
                  {monthIndex + 1}/{getLastTwoDigits(`${currentYear}`)}
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
                  const habitDate = habit!.dates.find(
                    (d) =>
                      d.date.year === currentYear &&
                      d.date.month === adjustedMonth &&
                      d.date.day === day
                  );

                  const isDone = habitDate?.status === "done";
                  const isUndone = habitDate?.status === "undone";
                  const isPastDate =
                    monthIndex < currentMonth || // Past month
                    (monthIndex === currentMonth &&
                      day !== null &&
                      day <= today);

                  return (
                    <div
                      key={index}
                      className={`relative flex-center p-1 border border-gray-500/30 rounded-[10px] ${
                        day && day === today && monthIndex === currentMonth
                          ? "bg-color-primary text-white cursor-pointer"
                          : !isPastDate
                          ? "cursor-not-allowed opacity-80"
                          : "text-gray-800 cursor-pointer"
                      } ${!day && "invisible"}`}
                      onClick={() =>
                        isPastDate &&
                        setSelectedDay((prev) =>
                          prev.day === day && prev.month === monthIndex
                            ? { day: null, month: null }
                            : { day, month: monthIndex }
                        )
                      }
                    >
                      <AnimatePresence>
                        {selectedDay.day === day &&
                          selectedDay.month === monthIndex && (
                            <motion.div
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 10, opacity: 0 }}
                              className="z-[3] absolute p-1 -top-6 bg-white border rounded-full flex-center gap-1 text-color-primary"
                            >
                              <div
                                className="size-6 flex-center p-1 rounded-full text-[.7em] cursor-pointer bg-green-400 hover:bg-green-500 transition text-white"
                                onClick={() =>
                                  handleDayStatusUpdate({
                                    day,
                                    month: adjustedMonth,
                                    year: currentYear,
                                    status: "done",
                                  })
                                }
                              >
                                <i className="bx bx-check" />
                              </div>
                              <div
                                className="size-6 flex-center p-1 rounded-full text-[.7em] cursor-pointer bg-red-400 hover:bg-red-500 transition text-white"
                                onClick={() =>
                                  handleDayStatusUpdate({
                                    day,
                                    month: adjustedMonth,
                                    year: currentYear,
                                    status: "undone",
                                  })
                                }
                              >
                                <i className="bx bx-x" />
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                      <p className="text-[.9em] font-semibold">{day}</p>
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
                        ) : !isPastDate ? (
                          <i className="bx bx-lock opacity-70"></i>
                        ) : (
                          <div className="flex-center text-white rounded-[50%] bg-gray-400">
                            {/* <i className="bx bx-history"></i> */}
                          </div>
                        )}
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
