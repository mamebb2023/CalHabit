import React from "react";
import Button from "./shared/Button";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteHabit = ({ onClose, onDelete }: Props) => {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      className="scale-90 z-10 absolute right-0 bg-white rounded-xl p-3 flex-center flex-col gap-2"
    >
      <p className="font-semibold text-center">
        Are you sure to delete your habit?
      </p>
      <div className="flex gap-2">
        <Button
          className="px-1 py-1 rounded-lg"
          onClick={onClose} // Reset on Cancel
        >
          Cancel
        </Button>
        <button
          className="bg-transparent text-color-primary border border-color-primary p-1 rounded-lg active:scale-95 transition"
          onClick={onDelete} // Call delete function on Confirm
        >
          Confirm
        </button>
      </div>
    </motion.div>
  );
};

export default DeleteHabit;
