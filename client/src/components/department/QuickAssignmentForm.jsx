import { useState } from "react";
import { MdAddCircle, MdPersonSearch, MdCheckCircle } from "react-icons/md";

import api, { getErrorMessage } from "../../services/api";

function QuickAssignmentForm({ departments, onCreated }) {
  const [department, setDepartment] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSuccess("");

    if (!department || !courseName.trim()) {
      setError("Select a department and enter a course name.");
      return;
    }

    const deptCode =
      departments.find((d) => d.name === department)?.code || "GEN";

    setSubmitting(true);
    try {
      await api.post("/courses", {
        courseName: courseName.trim(),
        courseCode: `${deptCode}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        department,
        credits: 3,
        semester: 1,
        instructor: instructor.trim(),
        status: "Active",
      });
      setSuccess("Course created and assignment saved.");
      setCourseName("");
      setInstructor("");
      onCreated?.();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to create the course."));
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface outline-none transition-all focus:border-secondary focus:ring-2 focus:ring-secondary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100";

  return (
    <div className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_10px_15px_-3px_rgba(0,0,0,0.05)] dark:border-gray-700/60 dark:bg-gray-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -mr-10 -mt-10 right-0 top-0 h-32 w-32 rounded-full bg-secondary/10 blur-2xl"
      />

      <h3 className="relative z-10 mb-4 flex items-center gap-2 text-xl font-semibold text-primary dark:text-white">
        <MdAddCircle className="text-secondary" />
        Quick Course Assignment
      </h3>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
        <div>
          <label
            htmlFor="qa-department"
            className="mb-1 block text-xs font-semibold tracking-wide text-on-surface-variant dark:text-gray-400"
          >
            Select Department
          </label>
          <select
            id="qa-department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`${fieldClass} cursor-pointer`}
          >
            <option value="">Select a department</option>
            {departments.map((d) => (
              <option key={d._id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="qa-course"
            className="mb-1 block text-xs font-semibold tracking-wide text-on-surface-variant dark:text-gray-400"
          >
            Course Name
          </label>
          <input
            id="qa-course"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g. Data Structures"
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="qa-faculty"
            className="mb-1 block text-xs font-semibold tracking-wide text-on-surface-variant dark:text-gray-400"
          >
            Assign Faculty
          </label>
          <div className="relative">
            <MdPersonSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant dark:text-gray-400" />
            <input
              id="qa-faculty"
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="Search faculty..."
              className={`${fieldClass} pl-11`}
            />
          </div>
        </div>

        {error && (
          <p className="text-xs font-medium text-error dark:text-red-400">
            {error}
          </p>
        )}
        {success && (
          <p className="flex items-center gap-1 text-xs font-medium text-[#16a34a]">
            <MdCheckCircle />
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full rounded-lg bg-secondary py-2.5 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-secondary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating…" : "Create Assignment"}
        </button>
      </form>
    </div>
  );
}

export default QuickAssignmentForm;
