import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import api, { getErrorMessage } from "../../services/api";

function buildInitial(initialData) {
  return {
    departmentName: initialData?.departmentName || initialData?.name || "",
    departmentCode:
      initialData?.departmentCode || initialData?.code || "",
    hod: initialData?.hod || "",
    status: initialData?.status || "Active",
  };
}

function validate(formData) {
  const errors = {};

  if (!formData.departmentName.trim()) {
    errors.departmentName = "Department name is required";
  }
  if (!formData.departmentCode.trim()) {
    errors.departmentCode = "Department code is required";
  }
  if (!formData.hod.trim()) {
    errors.hod = "Head of Department is required";
  }

  return errors;
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function DepartmentForm({ initialData }) {
  const navigate = useNavigate();

  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState(() => buildInitial(initialData));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      departmentName: formData.departmentName.trim(),
      departmentCode: formData.departmentCode.trim(),
      hod: formData.hod.trim(),
      status: formData.status,
    };

    setSubmitting(true);
    try {
      if (isEditing) {
        await api.put(`/departments/${initialData._id}`, payload);
        setSuccessMessage("Department updated successfully!");
      } else {
        await api.post("/departments", payload);
        setSuccessMessage("Department added successfully!");
      }

      setTimeout(() => navigate("/departments"), 800);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        {isEditing ? "Department Information" : "New Department"}
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Department Name */}
        <div>
          <label className="label">Department Name</label>
          <input
            type="text"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            placeholder="Computer Science"
            className="input"
          />
          <FieldError message={errors.departmentName} />
        </div>

        {/* Department Code */}
        <div>
          <label className="label">Department Code</label>
          <input
            type="text"
            name="departmentCode"
            value={formData.departmentCode}
            onChange={handleChange}
            placeholder="CSE"
            className="input uppercase"
            disabled={isEditing}
          />
          <FieldError message={errors.departmentCode} />
        </div>

        {/* HOD */}
        <div>
          <label className="label">Head of Department</label>
          <input
            type="text"
            name="hod"
            value={formData.hod}
            onChange={handleChange}
            placeholder="Dr. Rajesh Sharma"
            className="input"
          />
          <FieldError message={errors.hod} />
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
          onClick={() => navigate("/departments")}
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
              ? "Update Department"
              : "Save Department"}
        </button>
      </div>
    </form>
  );
}

export default DepartmentForm;