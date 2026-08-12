import { useState } from "react";
import { useNavigate } from "react-router-dom";
import courses from "../../data/courseData";

function CourseForm({ initialData }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: initialData?.courseName || "",
    courseCode: initialData?.courseCode || "",
    department: initialData?.department || "",
    credits: initialData?.credits || "",
    instructor: initialData?.instructor || "",
    semester: initialData?.semester || "",
    status: initialData?.status || "Active",
    description: initialData?.description || "",
  });

  const departments = [...new Set(courses.map((c) => c.department))];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert(initialData ? "Course Updated Successfully!" : "Course Saved Successfully!");
    navigate("/courses");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
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
            required
          />
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
            className="input"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label className="label">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
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
            className="input"
            required
          />
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
            className="select"
            required
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <option key={semester} value={semester}>
                Semester {semester}
              </option>
            ))}
          </select>
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
            <option>Active</option>
            <option>Inactive</option>
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
        >
          Cancel
        </button>

        <button type="submit" className="btn-primary">
          {initialData ? "Update Course" : "Save Course"}
        </button>
      </div>
    </form>
  );
}

export default CourseForm;