const mongoose = require("mongoose");

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const timetableSchema = new mongoose.Schema(
  {
    dayOfWeek: {
      type: String,
      enum: DAYS,
      required: true,
      index: true,
    },

    startTime: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },

    endTime: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      index: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },

    semester: {
      type: Number,
      required: true,
      index: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: "A",
    },

    room: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Timetable", timetableSchema);
