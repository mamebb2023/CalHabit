"use client";

import AreYouSurePrompt from "@/components/AreYouSurePrompt";
import { days, months } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useHabits } from "@/hooks/useHabits";
import { getDaysForMonth, getLastTwoDigits } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/context/UserContext";

const Page = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { toast } = useToast();
  const { habit_id } = useParams() as { habit_id: string | undefined };

  const { habits, setUpdateTrigger } = useHabits();

  const [habit, setHabit] = useState<{
    _id: string;
    habit_name: string;
    dates: {
      date: { year: number | null; month: number | null; day: number | null };
      status: "done" | "undone";
    }[];
  } | null>(null);

  const [selectedDay, setSelectedDay] = useState<{
    month: number | null;
    day: number | null;
  }>({ month: null, day: null });

  const [deleteHabitPrompt, setDeleteHabitPrompt] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);

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

        toast({ title: data.message });
        setUpdateTrigger((prev) => !prev);
      }
    } catch {
      console.error("Error updating day status");
    }
  };

  const handleDeleteHabit = async () => {
    if (!user) return null;

    try {
      const response = await fetch("/api/habits/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habit_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({ title: data.message });
        router.push("/habits");
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
      toast({
        title: "Error deleting habit",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const selectedHabit = habits.find(
      (h: { _id: string }) => h._id === habit_id
    );
    setHabit(selectedHabit || null);
  }, [habit_id, habits, selectedYear]);

  return (
    <div className="p-2">
      {/* Delete habit prompt */}
      <AnimatePresence>
        {deleteHabitPrompt && (
          <AreYouSurePrompt
            title="Are you sure to delete your habit?"
            onClose={() => setDeleteHabitPrompt(false)}
            onDelete={handleDeleteHabit}
          />
        )}
      </AnimatePresence>

      {/* Habits title */}
      <div className="p-3 flex items-center justify-between bg-glass rounded-lg">
        <div className="flex-center gap-2">
          <Link
            href="/habits"
            className="p-1 hover:bg-gray-500/10 rounded-full flex-center"
          >
            <i className="bx bx-left-arrow-alt text-2xl cursor-pointer" />
          </Link>
          <p className="font-semibold">{habit && habit.habit_name}</p>
        </div>

        <Select
          onValueChange={(value) => {
            const year = parseInt(value, 10);
            setSelectedYear(year);
            toast({ title: `Year ${year} selected!` });
          }}
        >
          <SelectTrigger className="w-[150px] bg-glass p-1 px-2 rounded-lg cursor-pointer border-none">
            <SelectValue placeholder={selectedYear} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Array.from({ length: 10 }, (_, i) => currentYear - i).map(
              (year) => (
                <SelectItem
                  key={year}
                  value={`${year}`}
                  className={`cursor-pointer border-none text-color-primary`}
                >
                  {year}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <div
          className="relative hover:bg-gray-500/10 p-2 rounded-lg border border-color-primary hover:border-transparent cursor-pointer flex-center transition"
          onClick={() => setDeleteHabitPrompt(!deleteHabitPrompt)}
        >
          <i className="bx bx-trash" />
        </div>
      </div>

      {/* Months calendar */}
      <div className="flex justify-center flex-wrap gap-3 p-3">
        {months.map((month, monthIndex) => {
          const adjustedMonth = monthIndex + 1;
          const daysForMonth = getDaysForMonth(
            selectedYear,
            monthIndex
          ) as number[];

          return (
            <div
              key={monthIndex}
              className="w-[300px] border border-color-primary rounded-2xl p-3"
            >
              <div className="relative flex items-center justify-between border-b border-color-secondary">
                <p className="font-semibold">{month}</p>
                <p className="body-2">
                  {adjustedMonth}
                  <span className=""></span>/
                  {getLastTwoDigits(`${selectedYear}`)}
                </p>
              </div>

              <div className="grid grid-cols-7 text-center font-semibold mb-1">
                {days.map((day) => (
                  <div
                    key={day}
                    className="p-1 text-color-tertiary text-[0.8em]"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {daysForMonth.map((day, index) => {
                  const habitDate = habit?.dates.find(
                    (d) =>
                      d.date.year === selectedYear &&
                      d.date.month === adjustedMonth &&
                      d.date.day === day
                  );

                  const isDone = habitDate?.status === "done";
                  const isUndone = habitDate?.status === "undone";
                  const isPastDate =
                    selectedYear < currentYear ||
                    (selectedYear === currentYear &&
                      (monthIndex < currentMonth ||
                        (monthIndex === currentMonth && day && day <= today)));

                  const daytoday =
                    day && day === today && monthIndex === currentMonth;

                  return (
                    <div
                      key={index}
                      className={`relative flex-center p-1 border border-gray-500/30 rounded-[10px] ${
                        daytoday
                          ? "bg-gradient cursor-pointer border-none"
                          : isPastDate
                          ? "text-color-tertiary border-color-tertiary cursor-pointer"
                          : "text-white/50 cursor-not-allowed"
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
                                    year: selectedYear,
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
                                    year: selectedYear,
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
