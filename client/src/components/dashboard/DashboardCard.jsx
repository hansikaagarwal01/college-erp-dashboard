import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DashboardCard({
  title,
  value,
  icon,
  description,
  trend,
  trendUp = true,
  trendNote = "vs last month",
  accentClass = "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400",
  to,
}) {
  const navigate = useNavigate();
  const clickable = Boolean(to);

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      title={clickable ? `Go to ${title}` : undefined}
      className={`card card-hover group relative overflow-hidden p-5 ${clickable ? "cursor-pointer" : ""}`}
    >
      {/* subtle top accent line on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-transparent transition-colors duration-300 group-hover:bg-primary-500/60"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="stat-label truncate">{title}</p>

          <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-gray-900 tabular-nums dark:text-white sm:text-4xl">
            {value}
          </h2>

          {description && (
            <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110 ${accentClass}`}
        >
          {icon}
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`chip ${
              trendUp
                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20"
                : "bg-red-50 text-red-700 ring-red-600/15 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20"
            }`}
          >
            {trendUp ? (
              <FaArrowUp className="h-3 w-3" />
            ) : (
              <FaArrowDown className="h-3 w-3" />
            )}
            {trend}
          </span>

          <span className="text-xs text-gray-400 dark:text-gray-500">
            {trendNote}
          </span>
        </div>
      )}
    </div>
  );
}

export default DashboardCard;