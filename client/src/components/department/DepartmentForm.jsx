import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DepartmentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    hod: "",
    faculty: "",
    students: "",
    status: "Active",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Department Saved Successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Department Name */}
        <div>
          <label className="label">
            Department Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Computer Science"
            className="input"
            required
          />
        </div>

        {/* Department Code */}
        <div>
          <label className="label">
            Department Code
          </label>

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* HOD */}
        <div>
          <label className="label">
            Head of Department
          </label>

          <input
            type="text"
            name="hod"
            value={formData.hod}
            onChange={handleChange}
            placeholder="Dr. Rajesh Sharma"
            className="input"
            required
          />
        </div>

        {/* Faculty */}
        <div>
          <label className="label">
            Faculty Count
          </label>

          <input
            type="number"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Students */}
        <div>
          <label className="label">
            Student Count
          </label>

          <input
            type="number"
            name="students"
            value={formData.students}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="label">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="label">
          Description
        </label>

        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write department description..."
          className="input"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          onClick={() => navigate("/departments")}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          Save Department
        </button>

      </div>
    </form>
  );
}

export default DepartmentForm;