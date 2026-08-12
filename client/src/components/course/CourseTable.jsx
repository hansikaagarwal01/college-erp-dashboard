import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import EmptyState from "../ui/EmptyState";

function CourseTable({ courses, onDelete, hasFilters }) {
  const navigate = useNavigate();

  if (courses.length === 0) {
    return (
      <div className="table-card">
        <EmptyState
          message={hasFilters ? "No courses match your search" : "No courses found"}
          hint={
            hasFilters
              ? "Try adjusting your search or filters."
              : "Add your first course to get started."
          }
        />
      </div>
    );
  }

  return (
    <div className="table-card">
      <table className="table">
        <thead>
          <tr>
            <th className="p-4 text-left">Course</th>
            <th className="p-4 text-left">Code</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Credits</th>
            <th className="p-4 text-left">Instructor</th>
            <th className="p-4 text-left">Semester</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="p-4 font-medium text-gray-900 dark:text-white">
                {course.courseName}
              </td>

              <td className="p-4">
                <span className="badge-neutral">{course.courseCode}</span>
              </td>

              <td className="p-4">{course.department}</td>

              <td className="p-4">{course.credits}</td>

              <td className="p-4">{course.instructor}</td>

              <td className="p-4">{course.semester}</td>

              <td className="p-4">
                <span
                  className={
                    course.status === "Active"
                      ? "badge-active"
                      : "badge-inactive"
                  }
                >
                  {course.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/courses/details/${course.id}`)
                    }
                    className="btn-view"
                    aria-label={`View ${course.courseName}`}
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/courses/edit/${course.id}`)
                    }
                    className="btn-edit"
                    aria-label={`Edit ${course.courseName}`}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(course)}
                    className="btn-delete"
                    aria-label={`Delete ${course.courseName}`}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;