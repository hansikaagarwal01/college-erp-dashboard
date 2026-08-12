import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import api, { getErrorMessage } from "../../services/api";

const DEFAULT_DEPARTMENTS = [
  "Computer Science",
  "Management",
  "Electronics",
  "Design",
];

const SEMESTERS = Array.from({ length: 8 }, (_, i) => i + 1);

function buildInitial(initialData) {
  return {
    courseName: initialData?.courseName || "",
    courseCode: initialData?.courseCode || "",
    department: initialData?.department || "",
    credits: initialData?.credits ?? "",
    instructor: initialData?.instructor || "",
    semester: initialData?.semester ?? "",
    status: initialData?.status || "Active",
    description: initialData?.description || "",
  };
}

function validate(formData) {
  const errors = {};

  if (!formData.courseName.trim()) {
    errors.courseName = "Course name is required";
  }
  if (!formData.courseCode.trim()) {
    errors.courseCode = "Course code is required";
  }
  if (!formData.department.trim()) {
    errors.department = "Department is required";
  }
  if (formData.credits === "" || formData.credits === null) {
    errors.credits = "Credits are required";
  } else if (
    Number.isNaN(Number(formData.credits)) ||
    Number(formData.credits) < 1 ||
    Number(formData.credits) > 8
  ) {
    errors.credits = "Enter valid credits (1–8)";
  }
  if (formData.semester === "" || formData.semester === null) {
    errors.semester = "Please select a semester";
  }

  return errors;
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function CourseForm({ initialData }) {
  const navigate = useNavigate();

  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState(() => buildInitial(initialData));
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENTS);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let active = true;
    api
      .get("/departments")
      .then((res) => {
        if (!active) return;
        const names = (res.data?.data || [])
          .map((d) => d.departmentName || d.name)
          .filter(Boolean)
          .filter((name, i, arr) => arr.indexOf(name) === i);
        if (names.length > 0) setDepartments(names);
      })
      .catch(() => {
        /* keep default list if departments API is unavailable */
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      courseName: formData.courseName.trim(),
      courseCode: formData.courseCode.trim(),
      department: formData.department.trim(),
      credits: Number(formData.credits),
      instructor: formData.instructor.trim(),
      semester: Number(formData.semester),
      status: formData.status,
      description: formData.description.trim(),
    };

    setSubmitting(true);
    try {
      if (isEditing) {
        await api.put(`/courses/${initialData._id}`, payload);
        setSuccessMessage("Course updated successfully!");
      } else {
        await api.post("/courses", payload);
        setSuccessMessage("Course saved successfully!");
      }

      setTimeout(() => navigate("/courses"), 800);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        {isEditing ? "Course Information" : "New Course"}
      </h2>

      {/* Success message */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20">
          <FaCheckCircle className="ml-3 h-4 w-4 shrink-0" />
          <span className="py-2.5 pr-3">{successMessage}</span>
        </div>
      )}

      {/* API error */}
      {submitError && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 text-sm font-medium text-red-700 ring-1 ring-red-600/15 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20">
          <FaExclamationCircle className="ml-3 h-4 w-4 shrink-0" />
          <span className="py-2.5 pr-3">{submitError}</span>
        </div>
      )}

      {/* Departments API loading note */}
      {loading && (
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          Loading departments…
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Course Name */}
        <div>
          <label className="label">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Data Structures & Algorithms"
            className="input"
          />
          <FieldError message={errors.courseName} />
        </div>

        {/* Course Code */}
        <div>
          <label className="label">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            placeholder="CS101"
            className="input uppercase"
            disabled={isEditing}
          />
          <FieldError message={errors.courseCode} />
        </div>

        {/* Department */}
        <div>
          <label className="label">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`select ${errors.department ? "border-red-400" : ""}`}
          >
            <option value="">Select Department</option>
            {departments.length === 0 ? (
              <option value="" disabled>
                No departments available
              </option>
            ) : (
              departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))
            )}
          </select>
          {departments.length === 0 && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              No departments found. Please add a department first.
            </p>
          )}
          <FieldError message={errors.department} />
        </div>

        {/* Credits */}
        <div>
          <label className="label">Credits</label>
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            placeholder="3"
            min="1"
            max="8"
            step="1"
            className="input"
          />
          <FieldError message={errors.credits} />
        </div>

        {/* Instructor */}
        <div>
          <label className="label">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Dr. Anil Sharma"
            className="input"
          />
        </div>

        {/* Semester */}
        <div>
          <label className="label">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className={`select ${errors.semester ? "border-red-400" : ""}`}
          >
            <option value="">Select Semester</option>
            {SEMESTERS.map((semester) => (
              <option key={semester} value={semester}>
                Semester {semester}
              </option>
            ))}
          </select>
          <FieldError message={errors.semester} />
        </div>

        {/* Status */}
        <div>
          <label className="label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="label">Description</label>
        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write course description..."
          className="input"
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/courses")}
          className="btn-secondary"
          disabled={submitting}
        >
          Cancel
        </button>

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting
            ? isEditing
              ? "Updating…"
              : "Saving…"
            : isEditing
              ? "Update Course"
              : "Save Course"}
        </button>
      </div>
    </form>
  );
}

export default CourseForm;