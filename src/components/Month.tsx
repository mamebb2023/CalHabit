// import { AnimatePresence, motion } from "framer-motion";
import { getLastTwoDigits } from "@/lib/utils";
import DayTile from "@/components/DayTile";

const Month = ({
  monthIndex,
  monthName,
  days,
  selectedDay,
  setSelectedDay,
  currentYear,
  currentMonth,
  today,
}: {
  monthIndex: number;
  monthName: string;
  days: (number | null)[];
  selectedDay: { month: number; day: number } | null;
  setSelectedDay: React.Dispatch<
    React.SetStateAction<{ month: number; day: number } | null>
  >;
  currentYear: number;
  currentMonth: number;
  today: number;
}) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="w-[250px] border border-color-primary rounded-2xl p-3">
      <div className="flex items-center justify-between border-b border-color-secondary">
        <p className="font-semibold">{monthName}</p>
        <p className="body-2">
          {currentMonth}/{getLastTwoDigits(`${currentYear}`)}
        </p>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold mb-1">
        {weekDays.map((day) => (
          <div key={day} className="p-1 text-gray-600 text-[0.8em]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, index) => {
          const isPastDate =
            monthIndex < currentMonth || // Past month
            (monthIndex === currentMonth && day !== null && day < today); // Current month, before today

          return (
            <DayTile
              key={index}
              day={day}
              monthIndex={monthIndex}
              currentMonth={currentMonth}
              today={today}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              isPastDate={isPastDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
