import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { chartColors } from "./chartTheme";
import { useTheme } from "../../../context/useTheme";
import EmptyState from "../../ui/EmptyState";

const defaultData = [
  { month: "Jan", students: 45 },
  { month: "Feb", students: 60 },
  { month: "Mar", students: 90 },
  { month: "Apr", students: 120 },
  { month: "May", students: 150 },
  { month: "Jun", students: 180 },
];

function AdmissionChart({ data = defaultData, title = "Student Admissions" }) {
  const { darkMode } = useTheme();
  const c = chartColors(darkMode);

  return (
    <div className="card">
      <div className="mb-1 flex items-end justify-between gap-2">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">New admissions per month</p>
        </div>
        <span className="chip bg-primary-50 text-primary-700 ring-primary-600/15 dark:bg-primary-500/10 dark:text-primary-400 dark:ring-primary-400/20">
          {data.reduce((s, d) => s + d.students, 0)} total
        </span>
      </div>

      {data.length === 0 ? (
        <EmptyState
          message="No admission data"
          hint="Admission trend will appear here once data is available."
        />
      ) : (
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={c.grid} />
              <XAxis
                dataKey="month"
                tick={c.tick}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis tick={c.tick} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip cursor={{ fill: c.cursorFill }} {...c.tooltip} />
              <Bar dataKey="students" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default AdmissionChart;