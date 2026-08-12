import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBook, FaEdit } from "react-icons/fa";
import courses from "../../data/courseData";
import EmptyState from "../../components/ui/EmptyState";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === Number(id));

  if (!course) {
    return (
      <div className="page">
        <div className="table-card">
          <EmptyState
            message="Course Not Found"
            hint="The course you're looking for doesn't exist."
          />
        </div>
      </div>
    );
  }

  const details = [
    { label: "Course Code", value: course.courseCode },
    { label: "Department", value: course.department },
    { label: "Credits", value: course.credits },
    { label: "Instructor", value: course.instructor },
    { label: "Semester", value: `Semester ${course.semester}` },
  ];

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
          <h1 className="page-title">Course Details</h1>
          <p className="page-subtitle">
            Complete information for this course.
          </p>
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center dark:border-gray-700">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-600 p-3">
            <FaBook className="text-2xl text-white" />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {course.courseName}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {course.courseCode} · {course.department}
            </p>

            <span
              className={
                course.status === "Active"
                  ? "badge-active mt-2"
                  : "badge-inactive mt-2"
              }
            >
              {course.status}
            </span>
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

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Description
          </h3>

          <p className="text-gray-700 dark:text-gray-200">
            {course.description}
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate(`/courses/edit/${course.id}`)}
            className="btn-primary"
          >
            <FaEdit />
            Edit Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;