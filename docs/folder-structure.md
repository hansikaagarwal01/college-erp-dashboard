# 📁 Folder Structure & File Guide

This guide explains every directory and file in the repository.

---

## 🌳 Workspace Overview

```
college-erp-dashboard/
├── client/                 # React Frontend Application
│   ├── public/             # Static public assets
│   ├── src/                # React Source Code
│   │   ├── assets/         # Imported visual assets
│   │   ├── components/     # Reusable UI components
│   │   │   ├── dashboard/  # Dashboard stat components
│   │   │   └── layout/     # Navigation & Sidebar components
│   │   ├── layouts/        # Page layout wrappers
│   │   ├── pages/          # Full page views
│   │   ├── App.css         # Custom utility CSS
│   │   ├── App.jsx         # Root React component
│   │   ├── index.css       # Tailwind CSS v4 entry point
│   │   └── main.jsx        # React DOM entry point
│   ├── index.html          # Single Page HTML container
│   ├── package.json        # Frontend dependencies & scripts
│   └── vite.config.js      # Vite build configuration
└── server/                 # Express Backend API Server
    ├── config/             # Database connection setup
    ├── app.js              # Express app configuration
    ├── server.js           # Server port listener entry point
    └── package.json        # Backend dependencies
```

---

## 📄 File-by-File Breakdown

### 🌐 Client Files (`/client`)

---

#### 1. `client/package.json`
- **Purpose**: Defines dependencies, scripts, and package information for the frontend React app.
- **Depends on**: `node_modules` directory.
- **Used by**: `npm` CLI and Vite build runner.
- **What to learn here**: How JavaScript project dependencies and scripts (`dev`, `build`, `lint`) are declared.
- **Common beginner mistakes**: Editing line items manually without matching valid npm semver ranges.

---

#### 2. `client/vite.config.js`
- **Purpose**: Configures the Vite development server and plugin integrations.
- **Depends on**: `@vitejs/plugin-react`, `@tailwindcss/vite`.
- **Used by**: Vite runner (`npm run dev`).
- **What to learn here**: How modern bundler plugins are registered in React applications.
- **Common beginner mistakes**: Forgetting to restart the dev server after editing configuration options.

---

#### 3. `client/index.html`
- **Purpose**: The main single-page HTML template served to the browser.
- **Depends on**: `src/main.jsx`.
- **Used by**: Web browsers.
- **What to learn here**: How single-page applications (SPAs) mount React trees into `<div id="root"></div>`.
- **Common beginner mistakes**: Accidentally removing `<div id="root"></div>` or the `<script>` import tag.

---

#### 4. `client/src/main.jsx`
- **Purpose**: Entry point JavaScript script that initializes React into the HTML DOM.
- **Depends on**: `index.html`, `index.css`, `App.jsx`.
- **Used by**: Vite bundler.
- **What to learn here**: `createRoot()` syntax and `<StrictMode>` wrapper usage.
- **Common beginner mistakes**: Forgetting to import `./index.css`, causing all styles to vanish.

---

#### 5. `client/src/App.jsx`
- **Purpose**: Root application component that sets up top-level layouts and pages.
- **Depends on**: `layouts/MainLayout.jsx`, `pages/dashboard/dashboard.jsx`.
- **Used by**: `main.jsx`.
- **What to learn here**: Component composition (wrapping page views inside layout components).
- **Common beginner mistakes**: Adding heavy page-level state directly inside `App.jsx`.

---

#### 6. `client/src/index.css`
- **Purpose**: Global CSS file containing Tailwind CSS configuration imports.
- **Depends on**: Tailwind CSS package.
- **Used by**: `main.jsx` and all components.
- **What to learn here**: `@import "tailwindcss";` directive in Tailwind CSS v4.
- **Common beginner mistakes**: Overriding global styles with un-scoped standard CSS selectors.

---

#### 7. `client/src/App.css`
- **Purpose**: Secondary CSS stylesheet containing custom layout classes.
- **Depends on**: Custom CSS rules.
- **Used by**: Frontend components requiring custom CSS animations or media queries.
- **What to learn here**: CSS nested selectors and media query overrides.
- **Common beginner mistakes**: Writing styles here that could be easily handled with Tailwind utility classes.

---

#### 8. `client/src/layouts/MainLayout.jsx`
- **Purpose**: Layout template framing pages with a Sidebar, Navbar, and content container.
- **Depends on**: `components/layout/Sidebar.jsx`, `components/layout/Navbar.jsx`.
- **Used by**: `App.jsx` and page views.
- **What to learn here**: React's `{children}` prop for building layout wrappers.
- **Common beginner mistakes**: Forgetting curly braces around `({ children })` in function arguments.

---

#### 9. `client/src/components/layout/Navbar.jsx`
- **Purpose**: Header navigation bar component.
- **Depends on**: React.
- **Used by**: `layouts/MainLayout.jsx`.
- **What to learn here**: Creating modular header layouts.
- **Common beginner mistakes**: Forgetting to export the component using `export default Navbar`.

---

#### 10. `client/src/components/layout/Sidebar.jsx`
- **Purpose**: Left-side drawer navigation bar component.
- **Depends on**: React.
- **Used by**: `layouts/MainLayout.jsx`.
- **What to learn here**: Building vertical menu navigation structures.
- **Common beginner mistakes**: Hardcoding static heights instead of responsive flex layouts.

---

#### 11. `client/src/components/dashboard/dashboardCard.jsx`
- **Purpose**: Reusable presentation card for displaying individual stats (e.g. Total Students).
- **Depends on**: Tailwind CSS classes.
- **Used by**: `pages/dashboard/dashboard.jsx`.
- **What to learn here**: Receiving and rendering dynamic component `props` (`title`, `value`).
- **Common beginner mistakes**: Importing this file with incorrect casing (`DashboardCard` vs `dashboardCard.jsx`).

---

#### 12. `client/src/pages/dashboard/dashboard.jsx`
- **Purpose**: Main administrative summary page view.
- **Depends on**: `components/dashboard/dashboardCard.jsx`.
- **Used by**: `App.jsx`.
- **What to learn here**: CSS Grid responsive card layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
- **Common beginner mistakes**: Mismatching file import paths on Linux vs Windows servers.

---

### 🖥️ Server Files (`/server`)

---

#### 13. `server/package.json`
- **Purpose**: Defines dependencies (`express`, `mongoose`, `dotenv`, `cors`) for the Node.js backend.
- **Depends on**: Node runtime.
- **Used by**: `npm` CLI.
- **What to learn here**: Node.js backend package management and CommonJS (`"type": "commonjs"`) settings.
- **Common beginner mistakes**: Mixing ES module `import` syntax with CommonJS `require()` without setting `"type": "module"`.

---

#### 14. `server/server.js`
- **Purpose**: Entry point file for launching the Node HTTP server.
- **Depends on**: `server/app.js`.
- **Used by**: Node runtime (`node server.js`).
- **What to learn here**: Binding Express applications to a network port (`app.listen()`).
- **Common beginner mistakes**: Starting the server without specifying fallback port defaults.

---

#### 15. `server/app.js`
- **Purpose**: Central Express application setup file for registering middleware and API routes.
- **Depends on**: `express`, `cors`.
- **Used by**: `server/server.js`.
- **What to learn here**: Express middleware registration (`app.use()`).
- **Common beginner mistakes**: Forgetting `express.json()` body-parser middleware for incoming POST requests.

---

#### 16. `server/config/database.js`
- **Purpose**: Database configuration module for connecting to MongoDB.
- **Depends on**: `mongoose`.
- **Used by**: `server/server.js`.
- **What to learn here**: Asynchronous MongoDB connections using Mongoose.
- **Common beginner mistakes**: Hardcoding database passwords inside source code instead of using `.env` environment variables.

---

[← Back to Architecture](project-architecture.md) | [Next: Component Guide →](components.md)
