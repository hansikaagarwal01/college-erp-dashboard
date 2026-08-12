import { useState } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import timetable from "../../data/timetableData";
import courses from "../../data/courseData";
import TimetableFilters from "../../components/timetable/TimetableFilters";
import TimetableGrid from "../../components/timetable/TimetableGrid";
import TimetableCards from "../../components/timetable/TimetableCards";
import TimetableModal from "../../components/timetable/TimetableModal";
import EmptyState from "../../components/ui/EmptyState";

function Timetable() {
  const [entries, setEntries] = useState(timetable);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [activeEntry, setActiveEntry] = useState(null);

  const filteredEntries = entries.filter((entry) => {
    const matchesDepartment =
      departmentFilter === "" || entry.department === departmentFilter;

    const matchesSemester =
      semesterFilter === "" || entry.semester === Number(semesterFilter);

    const matchesSection =
      sectionFilter === "" || entry.section === sectionFilter;

    const matchesFaculty =
      facultyFilter === "" || entry.faculty === facultyFilter;

    return (
      matchesDepartment && matchesSemester && matchesSection && matchesFaculty
    );
  });

  const openView = (entry) => {
    setActiveEntry(entry);
    setModalMode("view");
    setModalOpen(true);
  };

  const openAdd = () => {
    setActiveEntry(null);
    setModalMode("form");
    setModalOpen(true);
  };

  const openEdit = () => {
    setModalMode("form");
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveEntry(null);
  };

  const handleSave = (data) => {
    if (data.id) {
      setEntries((prev) =>
        prev.map((entry) => (entry.id === data.id ? data : entry))
      );
    } else {
      const nextId =
        entries.reduce((max, entry) => Math.max(max, entry.id), 0) + 1;

      setEntries((prev) => [...prev, { ...data, id: nextId }]);
    }

    closeModal();
  };

  const handleDelete = (entry) => {
    const confirmed = window.confirm(
      `Delete the ${entry.courseName} class on ${entry.day} at ${entry.startTime}?`
    );

    if (confirmed) {
      setEntries((prev) =>
        prev.filter((item) => item.id !== entry.id)
      );
      closeModal();
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Timetable</h1>
          <p className="page-subtitle">
            Weekly schedule for all classes and sections.
          </p>

          <span className="badge-neutral mt-3">
            <FaCalendarAlt />
            Academic Year 2025-26
          </span>
        </div>

        <button onClick={openAdd} className="btn-primary">
          <FaPlus />
          Add Class
        </button>
      </div>

      <TimetableFilters
        entries={entries}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        sectionFilter={sectionFilter}
        setSectionFilter={setSectionFilter}
        facultyFilter={facultyFilter}
        setFacultyFilter={setFacultyFilter}
      />

      {filteredEntries.length === 0 ? (
        <div className="table-card">
          <EmptyState
            message="No classes match your filters"
            hint="Try adjusting your search or filters."
          />
        </div>
      ) : (
        <>
          <TimetableGrid entries={filteredEntries} onView={openView} />

          <TimetableCards entries={filteredEntries} onView={openView} />
        </>
      )}

      {modalOpen && (
        <TimetableModal
          key={`${modalMode}-${activeEntry?.id || "new"}`}
          mode={modalMode}
          entry={activeEntry}
          courses={courses}
          onClose={closeModal}
          onSave={handleSave}
          onRequestEdit={openEdit}
          onDelete={() => handleDelete(activeEntry)}
        />
      )}
    </div>
  );
}

export default Timetable;