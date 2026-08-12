import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function StatCard({ label, value, valueClass, icon, trend, trendUp, accentClass = "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400" }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="stat-label truncate">{label}</p>
          <p className={`stat-value ${valueClass || ""}`}>{value}</p>

          {trend !== undefined && (
            <p
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trendUp ? <FaArrowUp className="h-3 w-3" /> : <FaArrowDown className="h-3 w-3" />}
              {trend}
            </p>
          )}
        </div>

        {icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${accentClass}`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;