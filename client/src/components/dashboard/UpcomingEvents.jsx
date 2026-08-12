import { MdCalendarMonth } from "react-icons/md";

const events = [
  {
    id: 1,
    title: "Midterm Exams Begin",
    subtitle: "All Departments",
    month: "OCT",
    day: "15",
    monthClass: "text-error",
  },
  {
    id: 2,
    title: "Thanksgiving Break",
    subtitle: "Campus Closed",
    month: "NOV",
    day: "24",
    monthClass: "text-secondary dark:text-secondary-fixed-dim",
  },
  {
    id: 3,
    title: "Faculty Meeting",
    subtitle: "Academic Block A",
    month: "SEP",
    day: "05",
    monthClass: "text-tertiary-container dark:text-tertiary-fixed",
  },
];

function UpcomingEvents() {
  return (
    <div className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.02)] dark:border-gray-700/60 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary dark:text-white">
          Upcoming Events
        </h3>
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low dark:text-gray-400 dark:hover:bg-gray-800">
          <MdCalendarMonth className="text-lg" />
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex gap-4 rounded-lg border border-outline-variant/30 bg-surface p-3 transition-shadow hover:shadow-sm dark:border-gray-700/60 dark:bg-gray-800/50"
          >
            <div className="flex w-12 shrink-0 flex-col items-center justify-center border-r border-outline-variant/30 pr-4 dark:border-gray-700">
              <span
                className={`text-xs font-semibold tracking-wide ${event.monthClass}`}
              >
                {event.month}
              </span>
              <span className="mt-1 text-2xl font-semibold leading-none text-primary dark:text-white">
                {event.day}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary dark:text-gray-100">
                {event.title}
              </h4>
              <p className="mt-1 text-xs font-medium text-on-surface-variant dark:text-gray-400">
                {event.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg border border-outline-variant py-2 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container-low dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
        View Full Calendar
      </button>
    </div>
  );
}

export default UpcomingEvents;
