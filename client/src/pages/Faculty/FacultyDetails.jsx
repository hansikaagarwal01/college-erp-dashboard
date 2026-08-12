import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChalkboardTeacher } from "react-icons/fa";

function FacultyDetails() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button
        onClick={() => navigate("/faculty")}
        className="btn-secondary mb-6 w-fit"
      >
        <FaArrowLeft />
        Back to Faculty
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-title">Faculty Details</h1>
          <p className="page-subtitle">
            Complete profile information for this faculty member.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
            <FaChalkboardTeacher className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            Faculty details coming soon
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Full faculty profile will be shown here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FacultyDetails;