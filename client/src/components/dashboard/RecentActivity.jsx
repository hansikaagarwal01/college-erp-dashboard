import {
  MdPersonAdd,
  MdEditDocument,
  MdAccountBalance,
  MdMenuBook,
} from "react-icons/md";

const activities = [
  {
    id: 1,
    icon: <MdPersonAdd />,
    iconClass: "bg-secondary/10 text-secondary",
    text: (
      <>
        <span className="font-semibold">Rahul Sharma</span> was added as a{" "}
        <span className="font-semibold">Student</span>
      </>
    ),
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: <MdEditDocument />,
    iconClass: "bg-[#ffedd5] text-[#ea580c]",
    text: (
      <>
        <span className="font-semibold">Dr. Priya Mehta</span> updated Faculty
        Profile
      </>
    ),
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: <MdAccountBalance />,
    iconClass: "bg-tertiary-fixed-dim/20 text-tertiary-container dark:text-tertiary-fixed",
    text: (
      <>
        <span className="font-semibold">Computer Science</span> Department was
        created
      </>
    ),
    time: "1 day ago",
  },
  {
    id: 4,
    icon: <MdMenuBook />,
    iconClass: "bg-primary-fixed/40 text-on-primary-fixed-variant dark:text-primary-fixed",
    text: (
      <>
        New Course <span className="font-semibold">"Data Structures"</span> added
      </>
    ),
    time: "2 days ago",
  },
];

function RecentActivity() {
  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.02)] dark:border-gray-700/60 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-outline-variant/50 bg-[#f1f5f9] px-4 py-3 dark:border-gray-700/60 dark:bg-gray-800/70">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400">
          Recent Activity
        </h3>
        <button className="text-xs font-semibold text-secondary hover:underline dark:text-secondary-fixed-dim">
          View All
        </button>
      </div>

      <ul className="divide-y divide-outline-variant/30 dark:divide-gray-700/60">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex gap-4 p-4 transition-colors hover:bg-surface-container-low dark:hover:bg-gray-800/60"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${activity.iconClass}`}
            >
              {activity.icon}
            </div>

            <div className="min-w-0">
              <p className="text-sm text-primary dark:text-gray-200">
                {activity.text}
              </p>
              <p className="mt-1 text-xs font-medium text-on-surface-variant dark:text-gray-400">
                {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;
