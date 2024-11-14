import { connectToDatabase } from "@/lib/mongoose";
import Habit from "@/models/habit.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user_id, habit_id, year, month, day, status } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ user_id });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const habit = await Habit.findOne({ user_id, _id: habit_id });
  if (!habit) {
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });
  }

  // Attempt to update an existing date entry
  const result = await Habit.updateOne(
    { _id: habit_id, user_id },
    {
      $set: {
        "dates.$[elem].status": status,
      },
    },
    {
      arrayFilters: [
        {
          "elem.date.year": year,
          "elem.date.month": month,
          "elem.date.day": day,
        },
      ],
    }
  );

  // If no document was updated, push a new date entry
  if (result.modifiedCount === 0) {
    await Habit.updateOne(
      { _id: habit_id, user_id },
      {
        $push: {
          dates: { date: { year, month, day }, status },
        },
      }
    );

  return NextResponse.json({ message: "Added!" });

  } else {
    return NextResponse.json({ message: "Updated!" });

  }

}
