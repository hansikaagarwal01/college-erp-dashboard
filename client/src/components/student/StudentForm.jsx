function StudentForm() {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Student Information
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="label">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="input"
          />
        </div>

        <div>
          <label className="label">Roll Number</label>
          <input
            type="text"
            placeholder="Roll Number"
            className="input"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="input"
          />
        </div>

        <div>
          <label className="label">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            className="input"
          />
        </div>

        <div>
          <label className="label">Gender</label>
          <select className="select">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="label">Date of Birth</label>
          <input
            type="date"
            className="input"
          />
        </div>

        <div>
          <label className="label">Course</label>
          <select className="select">
            <option>Course</option>
            <option>B.Tech</option>
            <option>BBA</option>
            <option>B.Des</option>
          </select>
        </div>

        <div>
          <label className="label">Department</label>
          <input
            type="text"
            placeholder="Department"
            className="input"
          />
        </div>

        <div>
          <label className="label">Semester</label>
          <select className="select">
            <option>Semester</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
        </div>

        <div>
          <label className="label">Section</label>
          <select className="select">
            <option>Section</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        <div>
          <label className="label">Batch</label>
          <input
            type="text"
            placeholder="Batch"
            className="input"
          />
        </div>

        <div>
          <label className="label">Guardian Name</label>
          <input
            type="text"
            placeholder="Guardian Name"
            className="input"
          />
        </div>

        <div>
          <label className="label">Guardian Phone</label>
          <input
            type="text"
            placeholder="Guardian Phone"
            className="input"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Address</label>
          <textarea
            placeholder="Address"
            className="input"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" className="btn-secondary">
          Cancel
        </button>
        <button className="btn-primary">
          Save Student
        </button>
      </div>
    </div>
  );
}

export default StudentForm;