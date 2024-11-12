import React from "react";
import { motion } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";

const font = Fleur_De_Leah({
  subsets: ["latin"],
  weight: "400",
});

interface Props {
  onClose: () => void;
  onInputChange: (e: string) => void;
  handleAddHabit: () => void;
}

const AddHabit = ({ onClose, onInputChange, handleAddHabit }: Props) => {
  return (
    <motion.div
      initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
      animate={{ backdropFilter: "blur(5px)", opacity: 1 }}
      exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
      className="z-[2] fixed top-0 left-0 w-full h-full bg-black/50 flex-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className=""
      >
        <div className="flex justify-end">
          <button className="bg-white p-1 rounded-t-xl" onClick={onClose}>
            <i className="bx bx-x" />
          </button>
        </div>
        <div className="bg-white p-3 rounded-s-xl rounded-b-xl">
          <h2 className={`h2 ${font.className}`}>Add Habit</h2>

          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Habit name"
              className="border border-color-secondary p-1 rounded-lg mr-3"
              onChange={(e) => onInputChange(e.target.value)}
            />
            <button
              className="py-1 px-3 text-white rounded-lg bg-color-primary border border-color-primary hover:bg-transparent hover:text-color-primary transition"
              onClick={handleAddHabit}
            >
              Add
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddHabit;
