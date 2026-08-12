import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const avatarVariants = [
  "bg-primary-container text-on-primary-container dark:bg-primary-500/30 dark:text-primary-100",
  "bg-tertiary-container text-on-tertiary-container dark:bg-tertiary-fixed/20 dark:text-tertiary-fixed",
  "bg-error-container text-on-error-container dark:bg-red-500/20 dark:text-red-300",
];

function initialsOf(name) {
  return (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function RecentAssignments({ courses, limit = 5 }) {
  const navigate = useNavigate();

  const rows = courses
    .slice()
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, limit);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary dark:text-white">
          Recent Faculty Assignments
        </h3>
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-1 text-xs font-semibold text-secondary hover:underline dark:text-secondary-fixed-dim"
        >
          View All
          <MdArrowForward />
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.02)] dark:border-gray-700/60 dark:bg-gray-900">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-outline-variant bg-surface-container-low dark:border-gray-700/60 dark:bg-gray-800/70">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400">
                Faculty Member
              </th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400">
                Course
              </th>
              <th className="hidden p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400 sm:table-cell">
                Department
              </th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((course, index) => {
              const assigned = Boolean(course.instructor);
              return (
                <tr
                  key={course._id}
                  className="cursor-default border-b border-outline-variant transition-colors last:border-none hover:bg-surface-container-low dark:border-gray-700/60 dark:hover:bg-gray-800/60"
                >
                  <td className="flex items-center gap-2 p-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        avatarVariants[index % avatarVariants.length]
                      }`}
                    >
                      {initialsOf(course.instructor)}
                    </div>
                    <span className="text-sm font-medium text-primary dark:text-gray-100">
                      {course.instructor || "Unassigned"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant dark:text-gray-400">
                    {course.courseCode}: {course.courseName}
                  </td>
                  <td className="hidden p-4 text-sm text-on-surface-variant dark:text-gray-400 sm:table-cell">
                    {course.department}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                        assigned
                          ? "bg-secondary-fixed text-on-secondary-fixed dark:bg-secondary/30 dark:text-secondary-fixed-dim"
                          : "bg-surface-variant text-on-surface-variant dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {assigned ? "Assigned" : "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAssignments;
