import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";

function EditDepartment() {
  const navigate = useNavigate();

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
          <h1 className="page-title">Edit Department</h1>
          <p className="page-subtitle">
            Update the department record details.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
            <FaPencilAlt className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            Edit form coming soon
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The department edit form will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EditDepartment;