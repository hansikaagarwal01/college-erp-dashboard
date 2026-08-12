import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import StudentForm from "../../components/student/StudentForm";

function EditStudent() {
  const navigate = useNavigate();

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
          <h1 className="page-title">Edit Student</h1>
          <p className="page-subtitle">
            Update the student record details.
          </p>
        </div>
      </div>

      <StudentForm />
    </div>
  );
}

export default EditStudent;