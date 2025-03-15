import React from "react";

interface Props {
  onClick: () => void;
}

const AddHabitBtn = ({ onClick }: Props) => {
  return (
    <div
      className="add-habit-box p-2 flex gap-2 items-center bg-gradient hover:bg-gray-500/10 rounded-xl cursor-pointer transition"
      onClick={onClick}
    >
      <div className="add-habit-circle flex-center text-color-secondary border border-color-secondary rounded-full size-5 transition">
        <i className="bx bx-plus text-sm" />
      </div>
      <p className={`text-[.8em]`}>New Habit</p>
    </div>
  );
};

export default AddHabitBtn;
