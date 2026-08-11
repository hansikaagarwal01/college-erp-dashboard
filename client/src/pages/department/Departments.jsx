import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import DepartmentStats from "../../components/department/DepartmentStats";
import DepartmentSearch from "../../components/department/DepartmentSearch";
import DepartmentFilters from "../../components/department/DepartmentFilters";
import DepartmentTable from "../../components/department/DepartmentTable";
import EmptyState from "../../components/ui/EmptyState";
import api, { getErrorMessage } from "../../services/api";
import { usePermissions } from "../../hooks/usePermissions";

function normalizeDepartment(d) {
  return {
    ...d,
    _id: d._id || d.id,
    id: d._id || d.id,
    name: d.departmentName || d.name || "",
    code: d.departmentCode || d.code || "",
    hod: d.hod || "",
    faculty: d.totalFaculty ?? d.faculty ?? 0,
    students: d.totalStudents ?? d.students ?? 0,
    status: d.status || "Active",
  };
}

function Departments() {
  const navigate = useNavigate();
  const { isAdmin } = usePermissions();

  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchDepartments = () => {
    api
      .get("/departments")
      .then((res) => {
        const rows = (res.data?.data || []).map(normalizeDepartment);
        setDepartmentList(rows);
      })
      .catch((err) => {
        setError(getErrorMessage(err, "Unable to load departments. Please try again."));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const retryLoad = () => {
    setLoading(true);
    setError("");
    fetchDepartments();
  };

  const filteredDepartments = useMemo(() => {
    return departmentList.filter((department) => {
      const matchesSearch =
        department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.hod.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "" || department.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [departmentList, searchTerm, statusFilter]);

  const handleDelete = async (department) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${department.name} (${department.code})?`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/departments/${department._id}`);
      setDepartmentList((prev) =>
        prev.filter((d) => d._id !== department._id)
      );
    } catch (err) {
      window.alert(getErrorMessage(err, "Failed to delete department."));
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Department Management</h1>
          <p className="page-subtitle">
            View, filter and manage college departments.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate("/departments/add")}
            className="btn-primary"
          >
            <FaPlus />
            Add Department
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="card">
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
            <span className="spinner" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading departments…
            </p>
          </div>
        </div>
      ) : error && departmentList.length === 0 ? (
        <div className="card">
          <EmptyState message="Could not load departments" hint={error} />
          <div className="flex justify-center pb-6">
            <button onClick={retryLoad} className="btn-secondary">
              <FaRedo />
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          <DepartmentStats departments={filteredDepartments} />

          <DepartmentSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <DepartmentFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <DepartmentTable
            departments={filteredDepartments}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

export default Departments;