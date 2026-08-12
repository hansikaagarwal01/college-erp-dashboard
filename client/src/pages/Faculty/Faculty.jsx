import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import facultyData from "../../data/facultyData";

import FacultySearch from "../../components/faculty/FacultySearch";
import FacultyFilters from "../../components/faculty/FacultyFilters";
import FacultyStats from "../../components/faculty/FacultyStats";
import FacultyTable from "../../components/faculty/FacultyTable";

function Faculty() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyList] = useState(facultyData);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filteredFaculty = facultyList.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "" ||
      teacher.department === departmentFilter;

    const matchesDesignation =
      designationFilter === "" ||
      teacher.designation === designationFilter;

    const matchesStatus =
      statusFilter === "" ||
      teacher.status === statusFilter;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesDesignation &&
      matchesStatus
    );
  });

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Faculty Management</h1>
          <p className="page-subtitle">
            View, filter and manage faculty members.
          </p>
        </div>

        <button
          onClick={() => navigate("/faculty/add")}
          className="btn-primary"
        >
          <FaPlus />
          Add Faculty
        </button>
      </div>

      {/* Statistics */}
      <FacultyStats faculty={filteredFaculty} />

      {/* Search */}
      <FacultySearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <FacultyFilters
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <FacultyTable faculty={filteredFaculty} />
    </div>
  );
}

export default Faculty;