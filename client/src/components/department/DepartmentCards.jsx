import {
  MdScience,
  MdPalette,
  MdEngineering,
  MdBusinessCenter,
  MdMoreVert,
} from "react-icons/md";

const cardVariants = [
  {
    medallion:
      "bg-primary-fixed text-on-primary-fixed dark:bg-primary-500/20 dark:text-primary-200",
    icon: <MdScience className="text-xl" />,
    watermark: <MdScience className="text-[120px]" />,
  },
  {
    medallion:
      "bg-secondary-fixed text-on-secondary-fixed dark:bg-secondary/30 dark:text-secondary-fixed-dim",
    icon: <MdPalette className="text-xl" />,
    watermark: <MdPalette className="text-[120px]" />,
  },
  {
    medallion:
      "bg-tertiary-fixed text-on-tertiary-fixed dark:bg-tertiary-fixed/20 dark:text-tertiary-fixed",
    icon: <MdEngineering className="text-xl" />,
    watermark: <MdEngineering className="text-[120px]" />,
  },
  {
    medallion:
      "bg-primary-fixed-dim text-on-primary-fixed-variant dark:bg-primary-500/20 dark:text-primary-200",
    icon: <MdBusinessCenter className="text-xl" />,
    watermark: <MdBusinessCenter className="text-[120px]" />,
  },
];

function DepartmentCards({ departments, courses, onOpen, onEdit }) {
  if (departments.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {departments.map((department, index) => {
        const variant = cardVariants[index % cardVariants.length];
        const activeCourses = courses.filter(
          (c) => c.department === department.name && c.status === "Active"
        ).length;

        return (
          <div
            key={department._id}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(department)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(department);
              }
            }}
            title={`View ${department.name}`}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.05)] dark:border-gray-700/60 dark:bg-gray-900"
          >
            {/* Watermark decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 opacity-5 text-primary dark:text-white"
            >
              {variant.watermark}
            </div>

            <div className="relative z-10 mb-6 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${variant.medallion}`}
                >
                  {variant.icon}
                </div>
                <h4 className="text-2xl font-semibold text-primary transition-colors group-hover:text-secondary dark:text-white">
                  {department.name}
                </h4>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(department);
                }}
                className="text-on-surface-variant transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-white"
                aria-label={`Edit ${department.name}`}
                title="Edit"
              >
                <MdMoreVert className="text-xl" />
              </button>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400">
                  Active Courses
                </p>
                <p className="text-[32px] font-bold leading-10 tracking-tight text-primary tabular-nums dark:text-white">
                  {activeCourses}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400">
                  Faculty
                </p>
                <p className="text-[32px] font-bold leading-10 tracking-tight text-primary tabular-nums dark:text-white">
                  {department.faculty}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DepartmentCards;
