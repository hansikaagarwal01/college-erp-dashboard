function TimetableFilters({
  entries,
  departmentFilter,
  setDepartmentFilter,
  semesterFilter,
  setSemesterFilter,
  sectionFilter,
  setSectionFilter,
  facultyFilter,
  setFacultyFilter,
}) {
  const departments = [...new Set(entries.map((e) => e.department))];
  const semesters = [...new Set(entries.map((e) => e.semester))].sort(
    (a, b) => a - b
  );
  const sections = ["A", "B", "C"];
  const faculty = [...new Set(entries.map((e) => e.faculty))];

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

        {/* Section */}
        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
          className="select"
          aria-label="Filter by section"
        >
          <option value="">All Sections</option>
          {sections.map((section) => (
            <option key={section} value={section}>
              Section {section}
            </option>
          ))}
        </select>

        {/* Faculty */}
        <select
          value={facultyFilter}
          onChange={(e) => setFacultyFilter(e.target.value)}
          className="select"
          aria-label="Filter by faculty"
        >
          <option value="">All Faculty</option>
          {faculty.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TimetableFilters;