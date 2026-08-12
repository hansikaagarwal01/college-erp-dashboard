import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "../../context/useTheme";
import { chartColors } from "./charts/chartTheme";

const enrollmentData = [
  { month: "Jan", undergraduate: 3000, graduate: 750 },
  { month: "Feb", undergraduate: 3250, graduate: 820 },
  { month: "Mar", undergraduate: 3100, graduate: 780 },
  { month: "Apr", undergraduate: 3750, graduate: 940 },
  { month: "May", undergraduate: 4000, graduate: 1000 },
  { month: "Jun", undergraduate: 4200, graduate: 1050 },
];

function EnrollmentTrends() {
  const { darkMode } = useTheme();
  const c = chartColors(darkMode);

  return (
    <div className="flex h-[400px] flex-col rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.02)] dark:border-gray-700/60 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary dark:text-white">
          Enrollment Trends
        </h3>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-secondary" />
          <span className="text-xs font-semibold text-on-surface-variant dark:text-gray-400">
            Undergraduate
          </span>
          <span className="ml-2 h-3 w-3 rounded-full bg-tertiary-fixed-dim" />
          <span className="text-xs font-semibold text-on-surface-variant dark:text-gray-400">
            Graduate
          </span>
        </div>
      </div>

      <div className="mt-2 min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={enrollmentData}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={c.grid} />
            <XAxis
              dataKey="month"
              tick={c.tick}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tick={c.tick}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip cursor={{ fill: c.cursorFill }} {...c.tooltip} />
            <Bar
              dataKey="undergraduate"
              name="Undergraduate"
              fill="#0058be"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="graduate"
              name="Graduate"
              fill="#ddc39d"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EnrollmentTrends;
