import { useState } from "react";
import {
  FaTimes,
  FaEdit,
  FaTrash,
  FaClock,
} from "react-icons/fa";
import { DAYS, TIME_SLOTS, formatTime } from "../../data/timetableData";

function TimetableModal({
  mode,
  entry,
  courses,
  onClose,
  onSave,
  onRequestEdit,
  onDelete,
}) {
  const [formData, setFormData] = useState(() => {
    const currentCourse = entry
      ? courses.find((c) => c.courseCode === entry.courseCode)
      : undefined;

    return {
      day: entry?.day || "Monday",
      time: entry?.startTime || "09:00",
      courseId: currentCourse ? String(currentCourse.id) : "",
      faculty: entry?.faculty || "",
      room: entry?.room || "",
      section: entry?.section || "A",
    };
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCourse = courses.find(
      (c) => c.id === Number(formData.courseId)
    );

    if (!selectedCourse) return;

    const slot = TIME_SLOTS.find((s) => s.start === formData.time);

    onSave({
      id: entry?.id,
      day: formData.day,
      startTime: slot.start,
      endTime: slot.end,
      courseCode: selectedCourse.courseCode,
      courseName: selectedCourse.courseName,
      department: selectedCourse.department,
      semester: selectedCourse.semester,
      faculty: formData.faculty,
      room: formData.room,
      section: formData.section,
    });
  };

  const viewDetails = entry
    ? [
        { label: "Day", value: entry.day },
        {
          label: "Time",
          value: `${formatTime(entry.startTime)} – ${formatTime(entry.endTime)}`,
        },
        { label: "Course", value: entry.courseName },
        { label: "Course Code", value: entry.courseCode },
        { label: "Department", value: entry.department },
        { label: "Semester", value: `Semester ${entry.semester}` },
        { label: "Section", value: entry.section },
        { label: "Faculty", value: entry.faculty },
        { label: "Room", value: entry.room },
      ]
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {mode === "view"
                ? "Class Details"
                : entry
                  ? "Edit Class"
                  : "Add Class"}
            </h2>

            {mode === "view" && entry && (
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <FaClock />
                {entry.day}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="btn-icon text-gray-600 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {mode === "view" ? (
          <>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {viewDetails.map((item) => (
                <div key={item.label}>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.label}
                  </h3>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={onClose} className="btn-secondary">
                Close
              </button>

              <button onClick={onDelete} className="btn-delete">
                <FaTrash />
                Delete
              </button>

              <button onClick={onRequestEdit} className="btn-primary">
                <FaEdit />
                Edit
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Day */}
              <div>
                <label className="label">Day</label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="select"
                  required
                >
                  {DAYS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time slot */}
              <div>
                <label className="label">Time Slot</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="select"
                  required
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.start} value={slot.start}>
                      {formatTime(slot.start)} – {formatTime(slot.end)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div className="sm:col-span-2">
                <label className="label">Course</label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="select"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseCode} – {course.courseName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Faculty */}
              <div>
                <label className="label">Faculty</label>
                <input
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  placeholder="Dr. Anil Sharma"
                  className="input"
                  required
                />
              </div>

              {/* Room */}
              <div>
                <label className="label">Room</label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="Room 101"
                  className="input"
                  required
                />
              </div>

              {/* Section */}
              <div className="sm:col-span-2">
                <label className="label">Section</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="select"
                  required
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>

              <button type="submit" className="btn-primary">
                {entry ? "Update Class" : "Add Class"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TimetableModal;