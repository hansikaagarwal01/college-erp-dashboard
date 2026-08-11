const express = require("express");

const {
  getTimetable,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
} = require("../controllers/timetableController");

const router = express.Router();

router.get("/", getTimetable);
router.get("/:id", getTimetableById);
router.post("/", createTimetable);
router.put("/:id", updateTimetable);
router.delete("/:id", deleteTimetable);

module.exports = router;