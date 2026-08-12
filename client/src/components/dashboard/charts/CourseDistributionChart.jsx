import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { PALETTE, chartColors } from "./chartTheme";
import { useTheme } from "../../../context/useTheme";
import EmptyState from "../../ui/EmptyState";

function CourseDistributionChart({ data = [], title = "Course Distribution" }) {
  const { darkMode } = useTheme();
  const c = chartColors(darkMode);
  const total = data.reduce((s, d) => s + d.courses, 0);

  return (
    <div className="card">
      <div className="mb-1 flex items-end justify-between gap-2">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">Courses offered per department</p>
        </div>
        <span className="chip bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20">
          {total} total
        </span>
      </div>

      {data.length === 0 ? (
        <EmptyState
          message="No course data"
          hint="Course distribution will appear here once data is available."
        />
      ) : (
        <div className="mt-4 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={c.grid} />
              <XAxis
                dataKey="name"
                tick={c.tick}
                axisLine={false}
                tickLine={false}
                interval={0}
                tickFormatter={(name) => (name.length > 10 ? `${name.slice(0, 9)}…` : name)}
              />
              <YAxis tick={c.tick} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip cursor={{ fill: c.cursorFill }} {...c.tooltip} />
              <Bar dataKey="courses" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {data.map((entry, index) => (
          <li key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
            />
            <span className="flex-1 truncate text-gray-600 dark:text-gray-300">
              {entry.name}
            </span>
            <span className="font-semibold text-gray-900 tabular-nums dark:text-white">
              {entry.courses}
            </span>
            <span className="w-14 text-right text-gray-400 tabular-nums">
              {entry.active} active
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDistributionChart;