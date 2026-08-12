import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import EmptyState from "../ui/EmptyState";

function FacultyTable({ faculty }) {
  const navigate = useNavigate();

  if (faculty.length === 0) {
    return (
      <div className="table-card">
        <EmptyState
          message="No faculty members found"
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
            <th className="p-4 text-left">Employee ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-left">Designation</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {faculty.map((teacher) => (
            <tr key={teacher.id}>
              <td className="p-4">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </td>

              <td className="p-4">{teacher.employeeId}</td>
              <td className="p-4 font-medium text-gray-900 dark:text-white">
                {teacher.name}
              </td>
              <td className="p-4">{teacher.department}</td>
              <td className="p-4">{teacher.designation}</td>
              <td className="p-4">{teacher.email}</td>
              <td className="p-4">{teacher.phone}</td>

              <td className="p-4">
                <span
                  className={
                    teacher.status === "Active"
                      ? "badge-active"
                      : "badge-inactive"
                  }
                >
                  {teacher.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/faculty/details/${teacher.id}`)
                    }
                    className="btn-view"
                    aria-label={`View ${teacher.name}`}
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/faculty/edit/${teacher.id}`)
                    }
                    className="btn-edit"
                    aria-label={`Edit ${teacher.name}`}
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => alert(`Delete ${teacher.name}`)}
                    className="btn-delete"
                    aria-label={`Delete ${teacher.name}`}
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

export default FacultyTable;