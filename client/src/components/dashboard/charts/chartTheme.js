export const PALETTE = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#e11d48",
  "#0ea5e9",
  "#8b5cf6",
];

export function chartColors(dark) {
  return {
    grid: dark ? "#1f2937" : "#eef2f7",
    tick: dark ? "#9ca3af" : "#64748b",
    cursorFill: dark ? "rgba(255,255,255,0.05)" : "rgba(79,70,229,0.08)",
    tooltip: {
      contentStyle: {
        backgroundColor: dark ? "#111827" : "#ffffff",
        border: dark ? "1px solid #374151" : "1px solid #e5e7eb",
        borderRadius: 12,
        boxShadow: "0 10px 30px -8px rgba(16,24,40,0.15)",
        fontSize: 12,
        padding: "8px 12px",
      },
      labelStyle: {
        color: dark ? "#e5e7eb" : "#111827",
        fontWeight: 600,
        marginBottom: 4,
      },
      itemStyle: {
        color: dark ? "#d1d5db" : "#374151",
      },
    },
  };
}