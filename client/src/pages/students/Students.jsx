import { useEffect, useMemo, useState } from "react";
import { MdDownload, MdPersonAdd, MdRedo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import StudentToolbar from "../../components/student/StudentToolbar";
import StudentTable from "../../components/student/StudentTable";
import EmptyState from "../../components/ui/EmptyState";
import api, { getErrorMessage } from "../../services/api";
import { usePermissions } from "../../hooks/usePermissions";

const PAGE_SIZE = 10;

function normalizeStudent(s) {
  return {
    ...s,
    _id: s._id || s.id,
    id: s._id || s.id,
    name: `${s.firstName || ""} ${s.lastName || ""}`.trim() || s.name || "",
    rollNo: s.rollNumber || s.rollNo || "",
    batch: s.batch != null ? String(s.batch) : "",
    semester: s.semester ?? "",
  };
}

function yearOf(student) {
  const semester = Number(student.semester);
  return semester ? Math.ceil(semester / 2) : 0;
}

function Students() {
  const navigate = useNavigate();
  const { isAdmin } = usePermissions();

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [page, setPage] = useState(1);

  const fetchStudents = () => {
    api
      .get("/students", { params: { limit: 10000 } })
      .then((res) => {
        setStudentList((res.data?.data || []).map(normalizeStudent));
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

  const departments = useMemo(() => {
    const names = new Set(
      studentList
        .map((s) => s.department || s.course)
        .filter(Boolean)
    );
    return [...names].sort();
  }, [studentList]);

  const years = useMemo(() => {
    const set = new Set(studentList.map(yearOf).filter((y) => y >= 1 && y <= 4));
    return [...set].sort();
  }, [studentList]);

  const filteredStudents = useMemo(() => {
    return studentList.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        departmentFilter === "" ||
        (student.department || student.course) === departmentFilter;

      const matchesYear =
        yearFilter === "" || yearOf(student) === Number(yearFilter);

      return matchesSearch && matchesDepartment && matchesYear;
    });
  }, [studentList, searchTerm, departmentFilter, yearFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStudents = filteredStudents.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleDepartment = (value) => {
    setDepartmentFilter(value);
    setPage(1);
  };

  const handleYear = (value) => {
    setYearFilter(value);
    setPage(1);
  };

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

  const handleExport = () => {
    const headers = [
      "Name",
      "Roll No",
      "Email",
      "Phone",
      "Course",
      "Department",
      "Batch",
      "Semester",
      "Section",
      "Status",
    ];
    const rows = filteredStudents.map((s) => [
      s.name,
      s.rollNo,
      s.email,
      s.phone,
      s.course,
      s.department,
      s.batch,
      s.semester,
      s.section,
      s.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const hasFilters =
    searchTerm !== "" || departmentFilter !== "" || yearFilter !== "";

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[32px] font-bold leading-10 tracking-tight text-primary dark:text-white">
            Students
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant dark:text-gray-400">
            Manage enrollments, statuses, and student records.
          </p>
        </div>

        <div className="flex w-full items-center gap-4 sm:w-auto">
          <button
            onClick={handleExport}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-xs font-semibold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-container-low dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 sm:flex-none"
          >
            <MdDownload className="text-[18px]" />
            Export CSV
          </button>

          {isAdmin && (
            <button
              onClick={() => navigate("/students/add")}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-xs font-semibold text-on-secondary shadow-sm transition-colors hover:bg-secondary-container active:scale-[0.98] sm:flex-none"
            >
              <MdPersonAdd className="text-[18px]" />
              Add New Student
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-card dark:border-gray-700/60 dark:bg-gray-900">
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
            <span className="spinner" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading students…
            </p>
          </div>
        </div>
      ) : error && studentList.length === 0 ? (
        <div className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-card dark:border-gray-700/60 dark:bg-gray-900">
          <EmptyState message="Could not load students" hint={error} />
          <div className="flex justify-center pb-6">
            <button onClick={retryLoad} className="btn-secondary">
              <MdRedo />
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          <StudentToolbar
            searchTerm={searchTerm}
            setSearchTerm={handleSearch}
            departmentFilter={departmentFilter}
            setDepartmentFilter={handleDepartment}
            yearFilter={yearFilter}
            setYearFilter={handleYear}
            departments={departments}
            years={years}
            totalCount={filteredStudents.length}
          />

          <StudentTable
            students={pageStudents}
            total={filteredStudents.length}
            onDelete={handleDelete}
            page={safePage}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            hasFilters={hasFilters}
          />
        </>
      )}
    </div>
  );
}

export default Students;
