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

const DESIGNATIONS = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Lab Instructor",
];

function buildInitial(initialData) {
  return {
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    employeeId: initialData?.employeeId || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    gender: initialData?.gender || "",
    department: initialData?.department || "",
    designation: initialData?.designation || "",
    qualification: initialData?.qualification || "",
    experience: initialData?.experience ?? "",
    status: initialData?.status || "Active",
  };
}

function validate(formData) {
  const errors = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required";
  if (!formData.employeeId.trim()) {
    errors.employeeId = "Employee ID is required";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address";
  }
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }
  if (!formData.gender) errors.gender = "Please select a gender";
  if (!formData.department.trim()) {
    errors.department = "Department is required";
  }
  if (!formData.designation.trim()) {
    errors.designation = "Designation is required";
  }
  if (!formData.qualification.trim()) {
    errors.qualification = "Qualification is required";
  }
  if (formData.experience === "" || formData.experience === null) {
    errors.experience = "Experience is required";
  } else if (
    Number.isNaN(Number(formData.experience)) ||
    Number(formData.experience) < 0 ||
    Number(formData.experience) > 60
  ) {
    errors.experience = "Enter valid years of experience (0–60)";
  }

  return errors;
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function FacultyForm({ initialData }) {
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
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      employeeId: formData.employeeId.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      gender: formData.gender,
      department: formData.department.trim(),
      designation: formData.designation.trim(),
      qualification: formData.qualification.trim(),
      experience: Number(formData.experience),
      status: formData.status,
    };

    setSubmitting(true);
    try {
      if (isEditing) {
        await api.put(`/faculty/${initialData._id}`, payload);
        setSuccessMessage("Faculty member updated successfully!");
      } else {
        await api.post("/faculty", payload);
        setSuccessMessage("Faculty member added successfully!");
      }

      setTimeout(() => navigate("/faculty"), 800);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        {isEditing ? "Faculty Information" : "New Faculty Member"}
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
        {/* First Name */}
        <div>
          <label className="label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Anil"
            className="input"
          />
          <FieldError message={errors.firstName} />
        </div>

        {/* Last Name */}
        <div>
          <label className="label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Sharma"
            className="input"
          />
          <FieldError message={errors.lastName} />
        </div>

        {/* Employee ID */}
        <div>
          <label className="label">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="EMP104"
            className="input"
            disabled={isEditing}
          />
          <FieldError message={errors.employeeId} />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="anil.sharma@college.edu"
            className="input"
          />
          <FieldError message={errors.email} />
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="input"
          />
          <FieldError message={errors.phone} />
        </div>

        {/* Gender */}
        <div>
          <label className="label">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`select ${errors.gender ? "border-red-400" : ""}`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <FieldError message={errors.gender} />
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

        {/* Designation */}
        <div>
          <label className="label">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={`select ${errors.designation ? "border-red-400" : ""}`}
          >
            <option value="">Select Designation</option>
            {DESIGNATIONS.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>
          <FieldError message={errors.designation} />
        </div>

        {/* Qualification */}
        <div>
          <label className="label">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="Ph.D., M.Tech"
            className="input"
          />
          <FieldError message={errors.qualification} />
        </div>

        {/* Experience */}
        <div>
          <label className="label">Experience (Years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="5"
            min="0"
            max="60"
            step="1"
            className="input"
          />
          <FieldError message={errors.experience} />
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

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/faculty")}
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
              ? "Update Faculty"
              : "Save Faculty"}
        </button>
      </div>
    </form>
  );
}

export default FacultyForm;