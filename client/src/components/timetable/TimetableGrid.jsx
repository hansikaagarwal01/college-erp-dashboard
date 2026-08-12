import { DAYS, TIME_SLOTS, formatTime } from "../../data/timetableData";
import TimetableCell from "./TimetableCell";

function TimetableGrid({ entries, onView }) {
  const getEntry = (day, startTime) =>
    entries.find(
      (entry) => entry.day === day && entry.startTime === startTime
    );

  return (
    <div className="table-card hidden md:block">
      <table className="table min-w-[1000px]">
        <thead>
          <tr>
            <th className="p-4 text-left">Time</th>
            {DAYS.map((day) => (
              <th key={day} className="p-4 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {TIME_SLOTS.map((slot) => (
            <tr key={`${slot.start}-${slot.end}`}>
              <td className="whitespace-nowrap p-4 align-top">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatTime(slot.start)}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  – {formatTime(slot.end)}
                </p>
              </td>

              {DAYS.map((day) => {
                const entry = getEntry(day, slot.start);

                return (
                  <td key={day} className="p-1.5 align-top">
                    {entry ? (
                      <TimetableCell entry={entry} onClick={() => onView(entry)} />
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimetableGrid;