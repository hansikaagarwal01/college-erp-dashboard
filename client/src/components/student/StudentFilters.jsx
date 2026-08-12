function StudentFilters({
  courseFilter,
  setCourseFilter,
  batchFilter,
  setBatchFilter,
  semesterFilter,
  setSemesterFilter,
  sectionFilter,
  setSectionFilter,
}) {
  return (
    <div className="card p-4 mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Course */}
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="select"
          aria-label="Filter by course"
        >
          <option value="">All Courses</option>
          <option value="B.Tech">B.Tech</option>
          <option value="BBA">BBA</option>
          <option value="B.Des">B.Des</option>
        </select>

        {/* Batch */}
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="select"
          aria-label="Filter by batch"
        >
          <option value="">All Batches</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>

        {/* Semester */}
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="select"
          aria-label="Filter by semester"
        >
          <option value="">All Semesters</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

        {/* Section */}
        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
          className="select"
          aria-label="Filter by section"
        >
          <option value="">All Sections</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
    </div>
  );
}

export default StudentFilters;