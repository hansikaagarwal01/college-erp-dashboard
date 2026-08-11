import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import StudentTable from "../../components/student/StudentTable";
import StudentSearch from "../../components/student/StudentSearch";
import StudentFilters from "../../components/student/StudentFilters";
import StudentStats from "../../components/student/StudentStats";
import EmptyState from "../../components/ui/EmptyState";
import api, { getErrorMessage } from "../../services/api";
import { usePermissions } from "../../hooks/usePermissions";

function normalizeStudent(s) {
  return {
    ...s,
    _id: s._id || s.id,
    id: s._id || s.id,
    name: `${s.firstName || ""} ${s.lastName || ""}`.trim() || s.name || "",
    rollNo: s.rollNumber || s.rollNo || "",
    image: s.image || "https://i.pravatar.cc/150?img=33",
    batch: s.batch != null ? String(s.batch) : "",
    semester: s.semester ?? "",
  };
}

function Students() {
  const navigate = useNavigate();
  const { isAdmin } = usePermissions();

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  const fetchStudents = () => {
    api
      .get("/students", { params: { limit: 10000 } })
      .then((res) => {
        const rows = (res.data?.data || []).map(normalizeStudent);
        setStudentList(rows);
      })
      .catch((err) => {
        setError(getErrorMessage(err, "Unable to load students. Please try again."));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const retryLoad = () => {
    setLoading(true);
    setError("");
    fetchStudents();
  };

  const filteredStudents = useMemo(() => {
    return studentList.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        courseFilter === "" || student.course === courseFilter;

      const matchesBatch =
        batchFilter === "" || student.batch === batchFilter;

      const matchesSemester =
        semesterFilter === "" ||
        student.semester.toString() === semesterFilter;

      const matchesSection =
        sectionFilter === "" || student.section === sectionFilter;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesBatch &&
        matchesSemester &&
        matchesSection
      );
    });
  }, [
    studentList,
    searchTerm,
    courseFilter,
    batchFilter,
    semesterFilter,
    sectionFilter,
  ]);

  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name} (${student.rollNo})?`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/students/${student._id}`);
      setStudentList((prev) => prev.filter((s) => s._id !== student._id));
    } catch (err) {
      window.alert(getErrorMessage(err, "Failed to delete student."));
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Management</h1>
          <p className="page-subtitle">
            View, filter and manage student records.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate("/students/add")}
            className="btn-primary"
          >
            <FaPlus />
            Add Student
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="card">
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
            <span className="spinner" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading students…
            </p>
          </div>
        </div>
      ) : error && studentList.length === 0 ? (
        <div className="card">
          <EmptyState message="Could not load students" hint={error} />
          <div className="flex justify-center pb-6">
            <button onClick={retryLoad} className="btn-secondary">
              <FaRedo />
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Student Statistics */}
          <StudentStats students={filteredStudents} />

          {/* Search */}
          <StudentSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Filters */}
          <StudentFilters
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            batchFilter={batchFilter}
            setBatchFilter={setBatchFilter}
            semesterFilter={semesterFilter}
            setSemesterFilter={setSemesterFilter}
            sectionFilter={sectionFilter}
            setSectionFilter={setSectionFilter}
          />

          {/* Table */}
          <StudentTable students={filteredStudents} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

export default Students;