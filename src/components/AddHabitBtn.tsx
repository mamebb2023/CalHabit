import React from "react";

interface Props {
  onClick: () => void;
}

const AddHabitBtn = ({ onClick }: Props) => {
  return (
    <div
      className="add-habit-box p-3 flex flex-col items-center hover:bg-gray-500/10 rounded-xl cursor-pointer transition"
      onClick={onClick}
    >
      <div className="add-habit-circle flex-center text-color-secondary border border-color-secondary rounded-full size-10 transition m-3">
        <i className="bx bx-plus" />
      </div>
      <p className="text-[.8em] text-gray-500/50 font-bold">Add Habit</p>
    </div>
  );
};

export default AddHabitBtn;
