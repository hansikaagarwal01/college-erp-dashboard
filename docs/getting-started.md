# 🚀 Getting Started Guide

Welcome to the **College ERP Dashboard** project! This guide will help you set up your development environment and run the application locally.

---

## 📋 Prerequisites

Before running the project, make sure you have the following software installed:

| Tool | Recommended Version | Download Link |
| :--- | :--- | :--- |
| **Node.js** | v18.0 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | v9.0 or higher | Included with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | [code.visualstudio.com](https://code.visualstudio.com) |

---

## 📦 Step-by-Step Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/atharvix/college-erp-dashboard.git
cd college-erp-dashboard
```

### Step 2: Setup Frontend (Client)
```bash
# 1. Navigate to client folder
cd client

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

> [!SUCCESS]
> The terminal will display a local URL, usually `http://localhost:5173`. Open this URL in your web browser!

### Step 3: Setup Backend (Server)
```bash
# Open a NEW terminal window and navigate to server folder
cd server

# Install dependencies
npm install
```

---

## 🔍 Verifying Your Installation

Use this quick checklist to confirm everything is running correctly:

- [ ] Browser loads `http://localhost:5173` without errors.
- [ ] You see the **"Welcome Back, Admin 👋"** heading on screen.
- [ ] Four summary cards appear (**Students**, **Faculty**, **Departments**, **Courses**).
- [ ] No red error messages appear in the Browser Console (`F12` -> `Console`).

---

## 🛠️ Essential npm Commands

### Client (`/client`)
- `npm run dev`: Starts the local Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles production-ready bundle.
- `npm run lint`: Runs ESLint to check for code formatting and syntax errors.

### Server (`/server`)
- `npm start`: Runs the server script using Node.js.

---

## ✏️ Beginner Exercises: Environment Warm-up

Try these simple verification tasks:

1. **Change the Welcome Message**:
   - Open `client/src/pages/dashboard/dashboard.jsx`.
   - Edit line 7 to say `"Welcome Back, [Your Name] 👋"`.
   - Save the file and watch the browser update instantly without reloading!

2. **Inspect the Page Element**:
   - Right-click the **Students** card in your browser and click **Inspect**.
   - Observe the Tailwind CSS classes (`bg-white`, `rounded-xl`, `shadow-md`).

---

[← Back to Main README](../README.md) | [Next: Project Architecture →](project-architecture.md)
