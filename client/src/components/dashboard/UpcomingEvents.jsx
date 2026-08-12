import { FaCalendarAlt } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Mid Semester Exam",
    date: "15 Aug 2026",
  },
  {
    id: 2,
    title: "Faculty Meeting",
    date: "20 Aug 2026",
  },
  {
    id: 3,
    title: "Hackathon",
    date: "25 Aug 2026",
  },
  {
    id: 4,
    title: "Placement Drive",
    date: "30 Aug 2026",
  },
];

function UpcomingEvents() {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
        Upcoming Events
      </h2>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 border-b border-gray-100 pb-3 last:border-none last:pb-0 dark:border-gray-700"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10">
              <FaCalendarAlt />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {event.title}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;