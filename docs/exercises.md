# ✏️ Beginner Exercises

Practice tasks designed for first-year students to build confidence without modifying core features.

---

## 🎯 Topic 1: Component & Props Exercises

### Exercise 1.1: Add an "Active Batches" Stat Card
- **Goal**: Add a 5th card to the dashboard displaying `"Active Batches"` with value `"12"`.
- **Target File**: `client/src/pages/dashboard/dashboard.jsx`

<details>
<summary>💡 Need a Hint?</summary>

Open `dashboard.jsx` and add a fifth `<DashboardCard />` inside the grid container:
```jsx
<DashboardCard title="Active Batches" value="12" />
```
</details>

---

### Exercise 1.2: Add Badge Colors to Stat Cards
- **Goal**: Pass a new prop `badgeColor` (e.g. `"bg-green-100"`) to `DashboardCard` and render a colored dot next to the title.
- **Target File**: `client/src/components/dashboard/dashboardCard.jsx`

<details>
<summary>💡 Need a Hint?</summary>

Destructure `badgeColor` in `dashboardCard.jsx` and render a small `span`:
```jsx
function DashboardCard({ title, value, badgeColor = "bg-blue-100" }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>
        <h3 className="text-gray-500 text-sm">{title}</h3>
      </div>
      <h1 className="text-3xl font-bold mt-2">{value}</h1>
    </div>
  );
}
```
</details>

---

## 🎯 Topic 2: Layout & Navigation Exercises

### Exercise 2.1: Build a Styled Sidebar Navigation
- **Goal**: Replace the text `"Sidebar"` in `Sidebar.jsx` with vertical menu links: Dashboard, Students, Faculty, Courses.
- **Target File**: `client/src/components/layout/Sidebar.jsx`

<details>
<summary>💡 Need a Hint?</summary>

Use Tailwind flex column and padding classes:
```jsx
function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold border-b border-slate-700 pb-3">ERP Portal</h2>
      <nav className="flex flex-col gap-2">
        <a href="#" className="p-2 hover:bg-slate-800 rounded">📊 Dashboard</a>
        <a href="#" className="p-2 hover:bg-slate-800 rounded">🎓 Students</a>
        <a href="#" className="p-2 hover:bg-slate-800 rounded">👨‍🏫 Faculty</a>
        <a href="#" className="p-2 hover:bg-slate-800 rounded">📚 Courses</a>
      </nav>
    </aside>
  );
}
export default Sidebar;
```
</details>

---

### Exercise 2.2: Build a Top Navbar Header
- **Goal**: Add a search input and user profile badge inside `Navbar.jsx`.
- **Target File**: `client/src/components/layout/Navbar.jsx`

<details>
<summary>💡 Need a Hint?</summary>

```jsx
function Navbar() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <input type="text" placeholder="Search records..." className="border px-3 py-1 rounded-md text-sm" />
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold">Admin User</span>
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
      </div>
    </header>
  );
}
export default Navbar;
```
</details>

---

## 🎯 Topic 3: Backend Express API Exercises

### Exercise 3.1: Create a Health Check Endpoint
- **Goal**: Create a GET route in `server/app.js` returning `{ status: "OK", timestamp: Date.now() }`.
- **Target File**: `server/app.js`

<details>
<summary>💡 Need a Hint?</summary>

```javascript
const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

module.exports = app;
```
</details>

---

[← Back to Learning Path](learning-path.md) | [Next: Development Roadmap →](roadmap.md)
