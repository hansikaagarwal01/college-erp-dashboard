import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import EmptyState from "../ui/EmptyState";
import { usePermissions } from "../../hooks/usePermissions";


function StudentTable({ students, onDelete }) {
  const navigate = useNavigate();
  const { isAdmin } = usePermissions();

  if (students.length === 0) {
    return (
      <div className="table-card">
        <EmptyState
          message="No students found"
          hint="Try adjusting your search or filters."
        />
      </div>
    );
  }

  return (
    <div className="table-card">
      <table className="table">
        <thead>
          <tr>
            <th className="p-4 text-left">Photo</th>
            <th className="p-4 text-left">Roll No</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Course</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Batch</th>
            <th className="p-4 text-left">Semester</th>
            <th className="p-4 text-left">Section</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="p-4">
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </td>
              <td className="p-4">{student.rollNo}</td>
              <td className="p-4 font-medium text-gray-900 dark:text-white">
                {student.name}
              </td>
              <td className="p-4">{student.course}</td>

              <td className="p-4">
                {student.department}
              </td>

              <td className="p-4">
                {student.email}
              </td>

              <td className="p-4">
                {student.phone}
              </td>

              <td className="p-4">
                {student.batch}
              </td>
              <td className="p-4">{student.semester}</td>
              <td className="p-4">{student.section}</td>

              <td className="p-4">
                <span
                  className={
                    student.status === "Active"
                      ? "badge-active"
                      : "badge-inactive"
                  }
                >
                  {student.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/students/details/${student.id}`)
                    }
                    className="btn-view"
                    aria-label={`View ${student.name}`}
                    title="View"
                  >
                    <FaEye />
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() =>
                        navigate(`/students/edit/${student.id}`)
                      }
                      className="btn-edit"
                      aria-label={`Edit ${student.name}`}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => onDelete(student)}
                      className="btn-delete"
                      aria-label={`Delete ${student.name}`}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;