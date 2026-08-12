import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import courses from "../../data/courseData";

import CourseStats from "../../components/course/CourseStats";
import CourseSearch from "../../components/course/CourseSearch";
import CourseFilters from "../../components/course/CourseFilters";
import CourseTable from "../../components/course/CourseTable";

function Courses() {
  const navigate = useNavigate();

  const [courseList] = useState(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [creditsFilter, setCreditsFilter] = useState("");

  const filteredCourses = useMemo(
    () =>
      courseList.filter((course) => {
        const matchesSearch =
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment =
          departmentFilter === "" ||
          course.department === departmentFilter;

        const matchesSemester =
          semesterFilter === "" ||
          course.semester === Number(semesterFilter);

        const matchesStatus =
          statusFilter === "" || course.status === statusFilter;

        const matchesCredits =
          creditsFilter === "" ||
          course.credits === Number(creditsFilter);

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesSemester &&
          matchesStatus &&
          matchesCredits
        );
      }),
    [courseList, searchTerm, departmentFilter, semesterFilter, statusFilter, creditsFilter]
  );

  const hasFilters =
    searchTerm !== "" ||
    departmentFilter !== "" ||
    semesterFilter !== "" ||
    statusFilter !== "" ||
    creditsFilter !== "";

  const handleDelete = (course) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${course.courseName} (${course.courseCode})?`
    );

    if (confirmed) {
      alert(`${course.courseName} deleted (demo).`);
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="page-subtitle">
            View, filter and manage college courses.
          </p>
        </div>

        <button
          onClick={() => navigate("/courses/add")}
          className="btn-primary"
        >
          <FaPlus />
          Add Course
        </button>
      </div>

      <CourseStats courses={filteredCourses} />

      <CourseSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CourseFilters
        courses={courseList}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        creditsFilter={creditsFilter}
        setCreditsFilter={setCreditsFilter}
      />

      <CourseTable
        courses={filteredCourses}
        onDelete={handleDelete}
        hasFilters={hasFilters}
      />
    </div>
  );
}

export default Courses;