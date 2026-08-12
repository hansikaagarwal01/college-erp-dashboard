import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import departments from "../../data/departmentData";
import EmptyState from "../../components/ui/EmptyState";

function DepartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const department = departments.find(
    (dept) => dept.id === Number(id)
  );

  if (!department) {
    return (
      <div className="page">
        <div className="table-card">
          <EmptyState
            message="Department Not Found"
            hint="The department you're looking for doesn't exist."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button
        onClick={() => navigate("/departments")}
        className="btn-secondary mb-6 w-fit"
      >
        <FaArrowLeft />
        Back to Departments
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-title">Department Details</h1>
          <p className="page-subtitle">
            Complete profile information for this department.
          </p>
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Department Name
            </h3>
            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
              {department.name}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Department Code
            </h3>
            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
              {department.code}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Head of Department
            </h3>
            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
              {department.hod}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Faculty Count
            </h3>
            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
              {department.faculty}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Student Count
            </h3>
            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
              {department.students}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </h3>

            <span
              className={
                department.status === "Active"
                  ? "badge-active"
                  : "badge-inactive"
              }
            >
              {department.status}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Description
          </h3>

          <p className="text-gray-700 dark:text-gray-200">
            {department.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetails;