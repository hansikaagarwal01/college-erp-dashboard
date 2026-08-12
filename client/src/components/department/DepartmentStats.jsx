import StatCard from "../ui/StatCard";

function DepartmentStats({ departments }) {
  const totalDepartments = departments.length;

  const activeDepartments = departments.filter(
    (department) => department.status === "Active"
  ).length;

  const totalFaculty = departments.reduce(
    (sum, department) => sum + department.faculty,
    0
  );

  const totalStudents = departments.reduce(
    (sum, department) => sum + department.students,
    0
  );

  return (
    <div className="stat-grid">
      <StatCard label="Departments" value={totalDepartments} />

      <StatCard
        label="Active"
        value={activeDepartments}
        valueClass="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        label="Faculty"
        value={totalFaculty}
        valueClass="text-primary-600 dark:text-primary-400"
      />

      <StatCard
        label="Students"
        value={totalStudents}
        valueClass="text-purple-600 dark:text-purple-400"
      />
    </div>
  );
}

export default DepartmentStats;