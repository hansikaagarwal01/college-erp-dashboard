import { DAYS, formatTime } from "../../data/timetableData";
import TimetableCell from "./TimetableCell";

function TimetableCards({ entries, onView }) {
  return (
    <div className="space-y-4 md:hidden">
      {DAYS.map((day) => {
        const dayEntries = entries.filter((entry) => entry.day === day);

        return (
          <div key={day} className="card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {day}
              </h3>

              <span className="badge-neutral">
                {dayEntries.length}{" "}
                {dayEntries.length === 1 ? "class" : "classes"}
              </span>
            </div>

            {dayEntries.length === 0 ? (
              <p className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-400 dark:border-gray-700 dark:text-gray-500">
                No classes scheduled
              </p>
            ) : (
              <div className="space-y-2">
                {dayEntries
                  .slice()
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((entry) => (
                    <TimetableCell
                      key={entry.id}
                      entry={entry}
                      onClick={() => onView(entry)}
                    />
                  ))}
              </div>
            )}

            <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
              {formatTime("09:00")} – {formatTime("16:00")}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TimetableCards;