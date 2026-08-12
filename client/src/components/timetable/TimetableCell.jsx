import { formatTime } from "../../data/timetableData";
import getCourseStyle from "./courseColors";

function TimetableCell({ entry, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block h-full w-full rounded-lg border-l-4 p-2 text-left transition-colors duration-150 ${getCourseStyle(
        entry.courseCode
      )}`}
    >
      <p className="text-xs font-bold text-gray-900 dark:text-white">
        {entry.courseCode}
      </p>

      <p className="mt-0.5 truncate text-[11px] leading-snug text-gray-700 dark:text-gray-300">
        {entry.courseName}
      </p>

      <p className="mt-1 truncate text-[11px] text-gray-500 dark:text-gray-400">
        {entry.faculty}
      </p>

      <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
        {entry.room} · Sec {entry.section}
      </p>

      <p className="mt-1 text-[10px] font-medium text-gray-400 dark:text-gray-500">
        {formatTime(entry.startTime)} – {formatTime(entry.endTime)}
      </p>
    </button>
  );
}

export default TimetableCell;