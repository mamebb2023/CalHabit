import { getUserFromToken } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useHabits = () => {
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

  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const fetchUserAndHabits = async () => {
      const loggedInUser = getUserFromToken();
      if (!loggedInUser) return;

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
          if (habits !== data.habits) sessionStorage.setItem("habits", JSON.stringify(data.habits));
        }
      } catch (error) {
        console.error("Error fetching habits", error);
      }
    };

    if (updateTrigger || habits.length === 0) {
      fetchUserAndHabits();
    }
  }, [updateTrigger, habits]);

  return { habits, setHabits, setUpdateTrigger };
};
