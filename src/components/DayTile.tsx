import { AnimatePresence, motion } from "framer-motion";

const DayTile = ({
  day,
  monthIndex,
  currentMonth,
  today,
  selectedDay,
  setSelectedDay,
  isPastDate,
}: {
  day: number | null;
  monthIndex: number;
  currentMonth: number;
  today: number;
  selectedDay: { month: number; day: number } | null;
  setSelectedDay: React.Dispatch<
    React.SetStateAction<{ month: number; day: number } | null>
  >;
  isPastDate: boolean;
}) => {
  const isSelected =
    selectedDay?.month === monthIndex && selectedDay.day === day;

  return (
    <div className="relative">
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="flex-center relative"
          >
            <div className="absolute bottom-0 p-1 bg-white border rounded-full flex-center gap-1">
              <div className="size-7 flex-center p-1 rounded-full text-[.8em] cursor-pointer bg-green-100 hover:bg-green-200 transition">
                <i className="bx bx-check" />
              </div>
              <div className="size-7 flex-center p-1 rounded-full text-[.8em] cursor-pointer bg-red-100 hover:bg-red-200 transition">
                <i className="bx bx-x" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`flex-center p-1 border border-gray-500/30 rounded-lg  ${
          day && day === today && currentMonth === monthIndex
            ? "bg-color-primary text-white cursor-pointer"
            : isPastDate
            ? "opacity-50 cursor-not-allowed"
            : "text-gray-800 cursor-pointer"
        } ${!day && "invisible"}`}
        onClick={() =>
          !isPastDate && day !== null
            ? setSelectedDay(
                selectedDay?.month === monthIndex && selectedDay.day === day
                  ? null // If the same day is clicked, close the log
                  : { month: monthIndex, day: day as number } // Otherwise, open the log for the new day
              )
            : null
        }
      >
        {`${day}`}
      </div>
    </div>
  );
};

export default DayTile;
