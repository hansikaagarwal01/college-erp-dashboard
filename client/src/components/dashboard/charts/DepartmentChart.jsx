import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { PALETTE, chartColors } from "./chartTheme";
import { useTheme } from "../../../context/useTheme";
import EmptyState from "../../ui/EmptyState";

const defaultData = [
  { name: "Computer Science", value: 420 },
  { name: "Management", value: 280 },
  { name: "Electronics", value: 210 },
];

function DepartmentChart({
  data = defaultData,
  title = "Department Distribution",
}) {
  const { darkMode } = useTheme();
  const c = chartColors(darkMode);

  return (
    <div className="card">
      <div className="mb-1 flex items-end justify-between gap-2">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">Students enrolled per department</p>
        </div>
        <span className="chip bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20">
          {data.reduce((s, d) => s + d.value, 0)} total
        </span>
      </div>

      {data.length === 0 ? (
        <EmptyState
          message="No department data"
          hint="Department distribution will appear here once data is available."
        />
      ) : (
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={82}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip {...c.tooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-900 tabular-nums dark:text-white">
              {data.reduce((s, d) => s + d.value, 0)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">students</span>
          </div>
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {data.map((entry, index) => {
          const total = data.reduce((s, d) => s + d.value, 0);
          const pct = total ? Math.round((entry.value / total) * 100) : 0;
          return (
            <li key={entry.name} className="flex items-center gap-2 text-xs">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
              />
              <span className="flex-1 truncate text-gray-600 dark:text-gray-300">
                {entry.name}
              </span>
              <span className="font-semibold text-gray-900 tabular-nums dark:text-white">
                {entry.value}
              </span>
              <span className="w-9 text-right text-gray-400 tabular-nums">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DepartmentChart;