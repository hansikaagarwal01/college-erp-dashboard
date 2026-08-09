const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const { setupTestEnv, startDb, stopDb, clearDb } = require("./helpers");
setupTestEnv();

const app = require("../app");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const { generateToken } = require("../utils/token");

let mongo;

before(async () => {
  mongo = await startDb();
});

after(async () => {
  await stopDb(mongo);
});

beforeEach(async () => {
  await clearDb();
});

const adminToken = async () => {
  const admin = await Admin.create({
    name: "Admin",
    email: "admin@test.com",
    password: "password123",
    role: "Admin",
  });
  return generateToken(admin._id);
};

const facultyToken = async () => {
  const faculty = await Admin.create({
    name: "Faculty",
    email: "faculty@test.com",
    password: "password123",
    role: "Faculty",
  });
  return generateToken(faculty._id);
};

const studentToken = async () => {
  const student = await Admin.create({
    name: "Student",
    email: "student@test.com",
    password: "password123",
    role: "Student",
  });
  return generateToken(student._id);
};

const validStudent = {
  firstName: "John",
  lastName: "Doe",
  rollNumber: "CS2026-001",
  email: "john.doe@test.com",
  phone: "1234567890",
  gender: "Male",
  course: "Computer Science",
  department: "CSE",
  semester: 3,
  batch: 2026,
  section: "A",
};

test("GET /api/students — 401 without token", async () => {
  const res = await request(app).get("/api/students");
  assert.equal(res.status, 401);
});

test("GET /api/students — 200 empty list with pagination meta", async () => {
  const res = await request(app)
    .get("/api/students")
    .set("Authorization", `Bearer ${await adminToken()}`);

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.deepEqual(res.body.data, []);
  assert.equal(res.body.pagination.total, 0);
});

test("POST /api/students — 201 create as Admin", async () => {
  const res = await request(app)
    .post("/api/students")
    .set("Authorization", `Bearer ${await adminToken()}`)
    .send(validStudent);

  assert.equal(res.status, 201);
  assert.equal(res.body.data.rollNumber, validStudent.rollNumber);
});

test("POST /api/students — 403 for Student role", async () => {
  const res = await request(app)
    .post("/api/students")
    .set("Authorization", `Bearer ${await studentToken()}`)
    .send(validStudent);

  assert.equal(res.status, 403);
});

test("POST /api/students — 400 for invalid body", async () => {
  const res = await request(app)
    .post("/api/students")
    .set("Authorization", `Bearer ${await adminToken()}`)
    .send({ firstName: "", semester: 99 });

  assert.equal(res.status, 400);
  assert.ok(Array.isArray(res.body.errors));
});

test("POST /api/students — 409 for duplicate email", async () => {
  await Student.create(validStudent);

  const res = await request(app)
    .post("/api/students")
    .set("Authorization", `Bearer ${await adminToken()}`)
    .send(validStudent);

  assert.equal(res.status, 409);
});

test("GET /api/students — search filters results", async () => {
  await Student.create(validStudent);
  await Student.create({ ...validStudent, rollNumber: "EC2026-002", email: "jane@test.com" });

  const res = await request(app)
    .get("/api/students?search=jane")
    .set("Authorization", `Bearer ${await adminToken()}`);

  assert.equal(res.status, 200);
  assert.equal(res.body.pagination.total, 1);
  assert.equal(res.body.data[0].email, "jane@test.com");
});

test("GET /api/students/:id — 200 for existing student", async () => {
  const student = await Student.create(validStudent);

  const res = await request(app)
    .get(`/api/students/${student._id}`)
    .set("Authorization", `Bearer ${await adminToken()}`);

  assert.equal(res.status, 200);
  assert.equal(res.body.data.rollNumber, validStudent.rollNumber);
});

test("GET /api/students/:id — 404 for missing student", async () => {
  const res = await request(app)
    .get("/api/students/665000000000000000000000")
    .set("Authorization", `Bearer ${await adminToken()}`);

  assert.equal(res.status, 404);
});

test("GET /api/students/:id — 400 for invalid ObjectId", async () => {
  const res = await request(app)
    .get("/api/students/not-an-id")
    .set("Authorization", `Bearer ${await adminToken()}`);

  assert.equal(res.status, 400);
});

test("PUT /api/students/:id — 200 as Faculty", async () => {
  const student = await Student.create(validStudent);

  const res = await request(app)
    .put(`/api/students/${student._id}`)
    .set("Authorization", `Bearer ${await facultyToken()}`)
    .send({ section: "B" });

  assert.equal(res.status, 200);
  assert.equal(res.body.data.section, "B");
});

test("DELETE /api/students/:id — 403 for Faculty", async () => {
  const student = await Student.create(validStudent);

  const res = await request(app)
    .delete(`/api/students/${student._id}`)
    .set("Authorization", `Bearer ${await facultyToken()}`);

  assert.equal(res.status, 403);
});

test("DELETE /api/students/:id — 200 as Admin", async () => {
  const student = await Student.create(validStudent);

  const res = await request(app)
    .delete(`/api/students/${student._id}`)
    .set("Authorization", `Bearer ${await adminToken()}`);

  assert.equal(res.status, 200);
  const remaining = await Student.countDocuments();
  assert.equal(remaining, 0);
});
