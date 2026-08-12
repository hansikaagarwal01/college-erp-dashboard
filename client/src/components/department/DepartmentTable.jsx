import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import EmptyState from "../ui/EmptyState";
import { usePermissions } from "../../hooks/usePermissions";

function DepartmentTable({ departments, onDelete }) {
  const navigate = useNavigate();
  const { isAdmin } = usePermissions();

  if (departments.length === 0) {
    return (
      <div className="table-card">
        <EmptyState
          message="No departments found"
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
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">HOD</th>
            <th className="p-4 text-left">Faculty</th>
            <th className="p-4 text-left">Students</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td className="p-4 font-medium text-gray-900 dark:text-white">
                {department.name}
              </td>

              <td className="p-4">{department.hod}</td>

              <td className="p-4">{department.faculty}</td>

              <td className="p-4">{department.students}</td>

              <td className="p-4">
                <span
                  className={
                    department.status === "Active"
                      ? "badge-active"
                      : "badge-inactive"
                  }
                >
                  {department.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/departments/details/${department.id}`)
                    }
                    className="btn-view"
                    aria-label={`View ${department.name}`}
                    title="View"
                  >
                    <FaEye />
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() =>
                        navigate(`/departments/edit/${department.id}`)
                      }
                      className="btn-edit"
                      aria-label={`Edit ${department.name}`}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => onDelete(department)}
                      className="btn-delete"
                      aria-label={`Delete ${department.name}`}
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

export default DepartmentTable;