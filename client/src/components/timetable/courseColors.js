const palettes = [
  "border-l-blue-500 bg-blue-50 hover:bg-blue-100 dark:border-l-blue-400 dark:bg-blue-500/10 dark:hover:bg-blue-500/20",
  "border-l-emerald-500 bg-emerald-50 hover:bg-emerald-100 dark:border-l-emerald-400 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20",
  "border-l-amber-500 bg-amber-50 hover:bg-amber-100 dark:border-l-amber-400 dark:bg-amber-500/10 dark:hover:bg-amber-500/20",
  "border-l-purple-500 bg-purple-50 hover:bg-purple-100 dark:border-l-purple-400 dark:bg-purple-500/10 dark:hover:bg-purple-500/20",
  "border-l-rose-500 bg-rose-50 hover:bg-rose-100 dark:border-l-rose-400 dark:bg-rose-500/10 dark:hover:bg-rose-500/20",
  "border-l-cyan-500 bg-cyan-50 hover:bg-cyan-100 dark:border-l-cyan-400 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20",
];

export function getCourseStyle(courseCode) {
  if (!courseCode) return palettes[0];

  let hash = 0;
  for (let i = 0; i < courseCode.length; i++) {
    hash = (hash * 31 + courseCode.charCodeAt(i)) % 997;
  }

  return palettes[hash % palettes.length];
}

export default getCourseStyle;