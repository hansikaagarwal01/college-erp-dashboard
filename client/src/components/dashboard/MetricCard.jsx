import { MdTrendingUp, MdTrendingDown, MdHorizontalRule } from "react-icons/md";

function TrendPill({ trend, trendUp, neutral }) {
  if (neutral) {
    return (
      <span className="flex w-fit items-center gap-1 rounded-full bg-surface-container px-2 py-0.5 text-xs font-semibold text-on-surface-variant dark:bg-gray-800 dark:text-gray-400">
        <MdHorizontalRule className="text-[14px]" />
        {trend}
      </span>
    );
  }

  if (trendUp) {
    return (
      <span className="flex w-fit items-center gap-1 rounded-full bg-[#dcfce7] px-2 py-0.5 text-xs font-semibold text-[#16a34a]">
        <MdTrendingUp className="text-[14px]" />
        {trend}
      </span>
    );
  }

  return (
    <span className="flex w-fit items-center gap-1 rounded-full bg-[#ffedd5] px-2 py-0.5 text-xs font-semibold text-[#ea580c]">
      <MdTrendingDown className="text-[14px]" />
      {trend}
    </span>
  );
}

function MetricCard({
  label,
  value,
  icon,
  trend,
  trendUp = true,
  neutral = false,
  iconClass = "bg-primary-fixed/20 text-primary dark:bg-primary-500/20 dark:text-primary-200",
  decorative = false,
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.02)] dark:border-gray-700/60 dark:bg-gray-900"
    >
      {decorative && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-tertiary-fixed-dim/20 blur-xl"
        />
      )}

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-gray-400">
            {label}
          </span>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-lg ${iconClass}`}
          >
            {icon}
          </div>
        </div>

        <div className="mb-2 text-2xl font-semibold tracking-tight text-primary tabular-nums dark:text-white">
          {value}
        </div>

        {trend !== undefined && (
          <TrendPill trend={trend} trendUp={trendUp} neutral={neutral} />
        )}
      </div>
    </div>
  );
}

export default MetricCard;
