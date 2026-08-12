function CourseFilters({
  courses,
  departmentFilter,
  setDepartmentFilter,
  semesterFilter,
  setSemesterFilter,
  statusFilter,
  setStatusFilter,
  creditsFilter,
  setCreditsFilter,
}) {
  const departments = [...new Set(courses.map((c) => c.department))];
  const semesters = [...new Set(courses.map((c) => c.semester))].sort(
    (a, b) => a - b
  );
  const credits = [...new Set(courses.map((c) => c.credits))].sort(
    (a, b) => a - b
  );

  return (
    <div className="card p-4 mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Department */}
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="select"
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        {/* Semester */}
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="select"
          aria-label="Filter by semester"
        >
          <option value="">All Semesters</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              Semester {semester}
            </option>
          ))}
        </select>

        {/* Credits */}
        <select
          value={creditsFilter}
          onChange={(e) => setCreditsFilter(e.target.value)}
          className="select"
          aria-label="Filter by credits"
        >
          <option value="">All Credits</option>
          {credits.map((credit) => (
            <option key={credit} value={credit}>
              {credit} Credits
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default CourseFilters;