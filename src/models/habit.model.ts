import { Schema, models, model, Document } from "mongoose";

export interface IHabit extends Document {
  user_id: string;
  habit_name: string;
  dates: {
    date: { year: number; month: number; day: number };
    status: "done" | "undone";
  }[] ;
}

const HabitSchema = new Schema({
  user_id: { type: String, required: true },
  habit_name: { type: String, required: true },
  dates: [
    {
      date: { year: Number, month: Number, day: Number },
      status: { type: String, enum: ["done", "undone"], required: true },
    },
  ],
});

const Habit = models.Habit || model<IHabit>("Habit", HabitSchema);

export default Habit;
