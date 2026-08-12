import StatCard from "../ui/StatCard";

function FacultyStats({ faculty }) {
  const totalFaculty = faculty.length;

  const activeFaculty = faculty.filter(
    (teacher) => teacher.status === "Active"
  ).length;

  const totalDepartments = new Set(
    faculty.map((teacher) => teacher.department)
  ).size;

  const totalProfessors = faculty.filter(
    (teacher) => teacher.designation === "Professor"
  ).length;

  return (
    <div className="stat-grid">
      <StatCard label="Total Faculty" value={totalFaculty} />

      <StatCard
        label="Active Faculty"
        value={activeFaculty}
        valueClass="text-emerald-600 dark:text-emerald-400"
      />

      <StatCard
        label="Departments"
        value={totalDepartments}
        valueClass="text-primary-600 dark:text-primary-400"
      />

      <StatCard
        label="Professors"
        value={totalProfessors}
        valueClass="text-purple-600 dark:text-purple-400"
      />
    </div>
  );
}

export default FacultyStats;