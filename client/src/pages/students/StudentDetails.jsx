import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

function StudentDetails() {
  const navigate = useNavigate();

  const details = [
    { label: "Name", value: "Rahul Sharma" },
    { label: "Roll Number", value: "101" },
    { label: "Course", value: "B.Tech" },
    { label: "Department", value: "Computer Science" },
    { label: "Batch", value: "2025" },
    { label: "Semester", value: "3" },
    { label: "Section", value: "A" },
    { label: "Email", value: "rahul@example.com" },
    { label: "Phone", value: "9876543210" },
    { label: "Guardian", value: "Rajesh Sharma" },
    { label: "Guardian Phone", value: "9876543200" },
    { label: "Attendance", value: "91%" },
  ];

  return (
    <div className="page">
      <button
        onClick={() => navigate("/students")}
        className="btn-secondary mb-6 w-fit"
      >
        <FaArrowLeft />
        Back to Students
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-title">Student Details</h1>
          <p className="page-subtitle">
            Complete profile information for this student.
          </p>
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-6 sm:flex-row dark:border-gray-700">
          <img
            src="https://via.placeholder.com/150"
            alt="Student"
            className="h-24 w-24 rounded-full border-4 border-primary-500 object-cover"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Rahul Sharma
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Roll No: 101 · B.Tech
            </p>

            <span className="badge-active mt-2">Active</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {details.map((item) => (
            <div key={item.label}>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.label}
              </h3>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate("/students/edit/101")}
            className="btn-primary"
          >
            <FaEdit />
            Edit Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;