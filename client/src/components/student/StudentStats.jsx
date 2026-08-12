import StatCard from "../ui/StatCard";

function StudentStats({ students }) {
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  const totalDepartments = new Set(
    students.map((student) => student.department)
  ).size;

  return (
    <div className="stat-grid">
      <StatCard label="Total Students" value={totalStudents} />

      <StatCard
        label="Active Students"
        value={activeStudents}
        valueClass="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        label="Courses"
        value={totalCourses}
        valueClass="text-primary-600 dark:text-primary-400"
      />

      <StatCard
        label="Departments"
        value={totalDepartments}
        valueClass="text-purple-600 dark:text-purple-400"
      />
    </div>
  );
}

export default StudentStats;