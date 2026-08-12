import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import courses from "../../data/courseData";
import EmptyState from "../../components/ui/EmptyState";
import CourseForm from "../../components/course/CourseForm";

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const course = courses.find((item) => item.id === Number(id));

  if (!course) {
    return (
      <div className="page">
        <div className="table-card">
          <EmptyState
            message="Course Not Found"
            hint="The course you're trying to edit doesn't exist."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button
        onClick={() => navigate("/courses")}
        className="btn-secondary mb-6 w-fit"
      >
        <FaArrowLeft />
        Back to Courses
      </button>

      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Course</h1>
          <p className="page-subtitle">
            Update the course record details.
          </p>
        </div>
      </div>

      <CourseForm initialData={course} />
    </div>
  );
}

export default EditCourse;