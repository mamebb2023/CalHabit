import React from "react";
import { motion } from "framer-motion";
import { Fleur_De_Leah } from "next/font/google";

interface Props {
  onClose: () => void;
  onInputChange: (e: string) => void;
  handleCreateHabit: () => void;
}

const font = Fleur_De_Leah({ subsets: ["latin"], weight: "400" });

const AddHabit = ({ onClose, onInputChange, handleCreateHabit }: Props) => {
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
        className="flex items-start gap-3"
      >
        <div className="bg-white p-3 rounded-xl flex flex-col gap-3">
          <div>
            <h1 className={`h1 text-[3em] leading-[3.5rem] ${font.className}`}>
              Add Habit
            </h1>
            <p className="text-[.8em] text-color-secondary">
              Add a habit you want to track
            </p>
          </div>

          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Habit name"
              className="border border-color-secondary p-1 rounded-lg mr-3"
              onChange={(e) => onInputChange(e.target.value)}
            />
            <button
              className="py-1 px-3 text-white rounded-lg bg-color-primary border border-color-primary hover:bg-transparent hover:text-color-primary transition"
              onClick={handleCreateHabit}
            >
              Add
            </button>
          </div>
        </div>

        <button
          className="bg-white p-1 rounded-xl flex-center"
          onClick={onClose}
        >
          <i className="bx bx-x" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AddHabit;
