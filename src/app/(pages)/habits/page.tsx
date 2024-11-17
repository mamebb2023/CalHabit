"use client";

import AddHabit from "@/components/AddHabit";
import AddHabitBtn from "@/components/AddHabitBtn";
import Title from "@/components/Title";
import { days, months } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import {
  getDaysForMonth,
  getLastTwoDigits,
  getUserFromToken,
} from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  // const route = useRouter();
  const { toast } = useToast();
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState<
    {
      _id: string; // habit id
      user_id: string;
      habit_name: string;
      dates: {
        date: { year: number | null; month: number | null; day: number | null };
        status: "done" | "undone";
      }[];
    }[]
  >([]);

  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
  } | null>(null);

  const [addHabit, setAddHabit] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{
    month: number | null;
    habitIndex: number | null;
    day: number | null;
  }>({
    month: null,
    habitIndex: null,
    day: null,
  });

  const currentDate = new Date();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysForMonth = getDaysForMonth(currentYear, currentMonth) as number[];

  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleDayStatusUpdate = async ({
    habit_id,
    day,
    month,
    year,
    status,
  }: {
    habit_id: string;
    day: number;
    month: number;
    year: number;
    status: "done" | "undone";
  }) => {
    const user = getUserFromToken();

    if (!user) return null;

    try {
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
          variant: "new",
        });

        setUpdateTrigger((prev) => !prev);
      }
    } catch {
      console.error("Error updating day status");
    }
  };

  const handleCreateHabit = async () => {
    const user = getUserFromToken();

    if (!user) return null;

    try {
      // Trim whitespace from habitName
      const trimmedHabitName = habitName.trim();

      // Prevent creating a habit if the name is empty after trimming
      if (!trimmedHabitName) {
        toast({
          title: "Habit name cannot be empty.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch("/api/habits/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user._id,
          habit_name: trimmedHabitName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: data.message,
        });

        setAddHabit(false);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserAndHabits = async () => {
      const loggedInUser = getUserFromToken();
      if (!loggedInUser) return;

      setUser(loggedInUser);

      try {
        const response = await fetch(
          `/api/habits/get?user_id=${loggedInUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setHabits(data.habits);
        }
      } catch (error) {
        console.error("Error fetching habits", error);
      }
    };

    fetchUserAndHabits();
  }, [updateTrigger, addHabit]);

  return (
    <>
      <AnimatePresence>
        {addHabit && (
          <AddHabit
            onClose={() => setAddHabit(false)}
            onInputChange={setHabitName}
            handleCreateHabit={() => handleCreateHabit()}
          />
        )}
      </AnimatePresence>

      <div className="p-3 gap-5 h-screen">
        <Title
          title="CalHabit"
          currentYear={currentYear}
          name={user?.name}
          email={user?.email}
        />

        <div className="flex-center flex-col flex-1">
          <div className="flex-center flex-wrap gap-3 p-3">
            {habits.map((habit, habitIndex) => (
              <div key={habitIndex}>
                <Link
                  href={`/habits/${habit._id}`}
                  className="flex-1 flex items-center justify-between m-1 p-1 px-3 hover:bg-gray-500/10 rounded-lg transition"
                >
                  <p className="font-bold">{habit.habit_name}</p>
                  <i className="bx bx-right-arrow-alt"></i>
                </Link>

                <div className="w-[300px] border border-color-primary rounded-2xl p-3">
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
                              prev.habitIndex === habitIndex &&
                              prev.day === day &&
                              prev.month === currentMonth
                                ? { habitIndex: null, day: null, month: null }
                                : { habitIndex, day, month: currentMonth }
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
                                  className="z-[3] absolute p-1 -top-6 bg-white border rounded-full flex-center gap-1 text-color-primary"
                                >
                                  <div
                                    className="size-6 flex-center p-1 rounded-full text-[.7em] cursor-pointer bg-green-400 hover:bg-green-500 transition text-white"
                                    onClick={() =>
                                      handleDayStatusUpdate({
                                        habit_id: habit._id,
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
                                        habit_id: habit._id,
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
                              <div className="flex-center">
                                {/* <i className="bx bx-history"></i> */}
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
          </div>
          <div className="flex-center py-5">
            <AddHabitBtn onClick={() => setAddHabit(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
