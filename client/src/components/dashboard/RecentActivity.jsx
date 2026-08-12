import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaBook,
} from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaUserGraduate className="text-primary-600" />,
    text: "Rahul Sharma was added as a Student",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: <FaChalkboardTeacher className="text-emerald-600" />,
    text: "Dr. Priya Mehta updated Faculty Profile",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: <FaBuilding className="text-purple-600" />,
    text: "Computer Science Department created",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: <FaBook className="text-orange-600" />,
    text: 'New Course "Data Structures" added',
    time: "2 days ago",
  },
];

function RecentActivity() {
  return (
    <div className="card p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-none last:pb-0 dark:border-gray-700"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg dark:bg-gray-800">
              {activity.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {activity.text}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;