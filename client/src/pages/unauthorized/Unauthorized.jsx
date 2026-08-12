import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="card w-full max-w-md p-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
            <FaLock className="text-xl" />
          </div>

          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You do not have permission to access this page.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn-primary mt-6"
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;