# 🖥️ Frontend Issues & Production-Readiness Guide

> Written for the team working on `client/`. This is not a "you did it wrong" doc — it's a
> "here's what's missing and exactly how to fix it, one step at a time" doc. Everyone building
> their first full-stack app hits these same walls. Work through this top to bottom.

---

## 🚨 The #1 Issue: Your app isn't actually "full-stack" yet

Right now, every page — Students, Faculty, Departments, Courses, Timetable, Dashboard —
imports data from static files:

```js
// client/src/pages/students/students.jsx
import students from "../../data/studentData";
```

This means:
- Your "Add Student" form doesn't save anything anywhere. It updates local React state at best.
- Your "Delete" button doesn't delete a real record.
- Refreshing the page brings back the same fake data every time.
- Your backend (which your teammates worked hard on!) is never actually called.

You already installed `axios` (`client/package.json`) — you just never used it. This is
the single most important fix in this whole document. Everything else builds on top of it.

### ✅ How to fix it — step by step

**Step 1: Create an API client so you're not repeating the base URL everywhere**

```js
// client/src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export default axiosClient;
```

Create a `.env` file in `client/`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```
(Add `client/.env` to `.gitignore` if it isn't already — check `client/.gitignore`.)

**Step 2: Replace static imports with real fetching, using `useEffect` + `useState`**

Before (current code):
```js
const [studentList] = useState(students); // imported from a local file
```

After:
```js
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

function Students() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/students");
        setStudentList(res.data.data); // matches your backend's { success, data } shape
      } catch (err) {
        setError("Could not load students. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <p>Loading students…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // ...rest of your existing filter/render logic, now using real data
}
```

**Step 3: Do the same for Add/Edit/Delete**

```js
// Creating a student (in AddStudent.jsx)
await axiosClient.post("/students", formData);

// Updating a student (in EditStudent.jsx)
await axiosClient.put(`/students/${id}`, formData);

// Deleting a student (in StudentTable.jsx or wherever the delete button lives)
await axiosClient.delete(`/students/${id}`);
```

**Repeat this pattern for Faculty, Departments, and Courses.** They all follow the exact
same shape, so once Students works, the rest is copy-paste-adjust.

**Step 4: Once this works, delete (or archive) the `client/src/data/*.js` mock files** so
nobody accidentally imports them again by habit.

---

## 🔐 Issue #2: There's no login page, even though the backend has full JWT auth ready

Your backend already supports `/api/auth/register` and `/api/auth/login` with JWT tokens.
The frontend never calls them. Right now anyone who opens the app is "logged in" as
nobody, forever.

### ✅ How to fix it

**Step 1: Build a simple login page**

```jsx
// client/src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
```

**Step 2: Automatically attach the token to every request** so you don't have to remember
to add it manually each time — use an axios interceptor:

```js
// client/src/api/axiosClient.js  (add this below the axios.create() call)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Step 3: Protect routes on the frontend too** — right now, typing `/students` in the URL
bar works even if nobody is logged in.

```jsx
// client/src/components/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
```

Then wrap your routes in `App.jsx`:
```jsx
<Route
  path="/students"
  element={
    <ProtectedRoute>
      <Students />
    </ProtectedRoute>
  }
/>
```

> 💡 **Concept check:** `localStorage` is fine for a hackathon/beginner project, but for a
> real production app, storing JWTs in `localStorage` is vulnerable to XSS attacks. The
> more secure approach is an httpOnly cookie set by the server. You don't need this for
> now — just know it's the next-level upgrade once the basics work.

---

## 🧹 Issue #3: No form validation

Right now your Add/Edit forms will happily submit empty names, invalid emails, or
duplicate roll numbers straight to the backend and only find out something's wrong from a
generic 500 error.

### ✅ How to fix it

Start simple — you don't need a library at first:

```jsx
const validate = () => {
  const errors = {};
  if (!formData.firstName.trim()) errors.firstName = "First name is required";
  if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Enter a valid email";
  if (!formData.phone.trim()) errors.phone = "Phone number is required";
  return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validate();
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }
  // proceed with axios call
};
```

Once this pattern feels repetitive across 4 forms, look into a proper library:
- [`react-hook-form`](https://react-hook-form.com/) — handles form state for you
- [`zod`](https://zod.dev/) — lets you define a validation schema once and reuse it

---

## 📦 Issue #4: No pagination or loading states for large lists

Right now `Model.find()` on the backend returns *everything*, and the frontend renders
*everything* in one table. Fine for 20 fake students, will freeze the browser at 5,000
real ones.

### ✅ How to fix it (do this after Issue #1 is done)
- Add page/limit query params to your API calls: `axiosClient.get("/students?page=1&limit=25")`
- Show a simple "Previous / Next" pager component
- Show a loading spinner (or skeleton rows) while `loading` is `true` — you already have
  the `loading` state from Step 2 above, just render something nicer than plain text

---

## ✅ Frontend Checklist (work top to bottom)

- [ ] Create `axiosClient.js` with base URL + `.env` variable
- [ ] Replace static data imports with real API calls on **Students** page (prove the pattern works)
- [ ] Repeat for Faculty, Departments, Courses, Timetable
- [ ] Wire up Add/Edit/Delete forms to POST/PUT/DELETE endpoints
- [ ] Build a Login page and store the JWT token
- [ ] Add an axios interceptor to attach the token automatically
- [ ] Add a `ProtectedRoute` wrapper and use it on all internal pages
- [ ] Add basic client-side validation to all 4 "Add" forms
- [ ] Add loading and error states everywhere you call the API
- [ ] Add pagination once real data volume matters
- [ ] Delete the old `data/*.js` mock files once nothing imports them anymore

You don't have to do all of this in one sitting — even getting **one module (Students)**
fully wired end-to-end (list → add → edit → delete, all hitting the real backend) is a
huge, demoable milestone. Do that first, then repeat the pattern.
