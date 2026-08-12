# 🛠️ Debugging Guide

A beginner-friendly guide to diagnosing and fixing common issues in the **College ERP Dashboard**.

---

## 🔍 Systematic 3-Step Debugging Method

When something breaks, follow this exact sequence before changing code:

```mermaid
flowchart LR
    Step1[1. Check Browser Console] --> Step2[2. Check Network Tab] --> Step3[3. Check Terminal Logs]
```

1. **Browser Console (`F12` -> Console)**: Catches React rendering errors, missing imports, and undefined variable crashes.
2. **Network Tab (`F12` -> Network)**: Inspects HTTP API request status codes (`404`, `500`, `CORS`).
3. **Terminal Output**: Displays Node server stack traces and Vite build compiler errors.

---

## 🐞 Common Bugs & Solutions

<details>
<summary><b>1. File Import Casing Error (Module Not Found)</b></summary>

### Symptom
Build or runtime error: `Cannot find file '../../components/dashboard/DashboardCard'`.

### Why it happens
File on disk is named `dashboardCard.jsx` (lowercase 'd'), but the import statement uses a capital 'D'. Windows file systems are case-insensitive, but Git and Linux deployment hosts are case-sensitive!

### How to Fix
Always match the exact casing of the physical file path:
```jsx
// ❌ Incorrect
import DashboardCard from "../../components/dashboard/DashboardCard";

// ✅ Correct
import DashboardCard from "../../components/dashboard/dashboardCard";
```
</details>

<details>
<summary><b>2. Tailwind CSS Styling Not Applying</b></summary>

### Symptom
Page elements appear as unstyled plain HTML text without background colors or padding.

### Why it happens
1. `index.css` is missing the `@import "tailwindcss";` directive.
2. `main.jsx` is missing `import './index.css';`.

### How to Fix
Ensure `client/src/index.css` has `@import "tailwindcss";` and `client/src/main.jsx` imports `index.css`.
</details>

<details>
<summary><b>3. Props Not Rendering (Undefined Values)</b></summary>

### Symptom
Dashboard cards render empty white boxes without text.

### Why it happens
Forgetting to destructure props inside the component arguments:
```jsx
// ❌ Incorrect: 'title' is undefined because props wasn't destructured
function DashboardCard(title, value) { ... }

// ✅ Correct
function DashboardCard({ title, value }) { ... }
```
</details>

<details>
<summary><b>4. Express Port Collision (EADDRINUSE)</b></summary>

### Symptom
Terminal output: `Error: listen EADDRINUSE: address already in use :::5000`.

### Why it happens
Another Node process or server is already running on port `5000`.

### How to Fix
1. Kill existing node processes in terminal:
   ```bash
   npx kill-port 5000
   ```
2. Or change port to `5001` in your `.env` or server setup.
</details>

<details>
<summary><b>5. CORS Policy Error</b></summary>

### Symptom
Browser console error: `Access to XMLHttpRequest at 'http://localhost:5000' from origin 'http://localhost:5173' has been blocked by CORS policy`.

### Why it happens
Browsers block cross-origin requests between port 5173 (React) and port 5000 (Express) for security.

### How to Fix
Enable CORS in your Express `app.js`:
```javascript
const cors = require('cors');
app.use(cors());
```
</details>

---

## ✅ Quick Debugging Checklist

- [ ] Is the Vite dev server running in terminal? (`npm run dev`)
- [ ] Did you check `F12` Console for red error tracebacks?
- [ ] Are all import filenames matching exact file casing?
- [ ] Did you save the file after editing? (`Ctrl + S`)

---

[← Back to Components](components.md) | [Next: Learning Path →](learning-path.md)
