import React from "react";
import Button from "./shared/Button";
import { motion } from "framer-motion";

interface Props {
  title: string;
  onClose: () => void;
  onDelete: () => void;
}

const AreYouSurePrompt = ({ title, onClose, onDelete }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-[20] fixed top-0 left-0 w-full h-full bg-black/50 flex-center rounded-lg"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="flex-center flex-col bg-white rounded-lg items-start gap-5 p-3"
      >
        <p className="font-semibold text-center text-color-primary">{title}</p>
        <div className="flex gap-2">
          <Button
            className="px-2 py-1 rounded-lg"
            onClick={onClose} // Reset on Cancel
          >
            Cancel
          </Button>
          <button
            className="bg-transparent text-color-primary border border-color-primary py-2 px-3 rounded-lg active:scale-95 transition"
            onClick={onDelete} // Call delete function on Confirm
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AreYouSurePrompt;
