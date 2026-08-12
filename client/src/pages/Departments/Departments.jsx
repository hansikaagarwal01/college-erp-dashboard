import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import departments from "../../data/departmentData";


import DepartmentStats from "../../components/department/DepartmentStats";
import DepartmentSearch from "../../components/department/DepartmentSearch";
import DepartmentFilters from "../../components/department/DepartmentFilters";
import DepartmentTable from "../../components/department/DepartmentTable";

function Departments() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentList] = useState(departments);
  const [statusFilter, setStatusFilter] = useState("");

  const filteredDepartments = departmentList.filter((department) => {
    const matchesSearch =
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.hod.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      department.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

        <button
          onClick={() => navigate("/departments/add")}
          className="btn-primary"
        >
          <FaPlus />
          Add Department
        </button>
      </div>

      <DepartmentStats departments={filteredDepartments} />

      <DepartmentSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <DepartmentFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <DepartmentTable departments={filteredDepartments} />
    </div>
  );
}

export default Departments;