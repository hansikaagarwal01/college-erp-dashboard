import StatCard from "../ui/StatCard";

function CourseStats({ courses }) {
  const totalCourses = courses.length;

  const activeCourses = courses.filter(
    (course) => course.status === "Active"
  ).length;

  const totalCredits = courses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  const totalDepartments = new Set(
    courses.map((course) => course.department)
  ).size;

  return (
    <div className="stat-grid">
      <StatCard label="Total Courses" value={totalCourses} />

      <StatCard
        label="Active Courses"
        value={activeCourses}
        valueClass="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        label="Total Credits"
        value={totalCredits}
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

export default CourseStats;