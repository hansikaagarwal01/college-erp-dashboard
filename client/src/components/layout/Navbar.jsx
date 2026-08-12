import {
  MdMenu,
  MdSearch,
  MdDarkMode,
  MdLightMode,
  MdNotifications,
  MdLogout,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/useTheme";
import { useAuth } from "../../context/useAuth";
import { getRoleLabel } from "../../utils/permissions";

function Navbar({ onMenuClick }) {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || "Admin";
  const initials = role.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const iconButtonClass =
    "flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container dark:text-on-primary-container dark:hover:bg-primary-container";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-outline-variant bg-surface/80 px-4 backdrop-blur-md dark:border-primary-container dark:bg-primary/90 sm:px-6">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className={`-ml-2 ${iconButtonClass} lg:hidden`}
        aria-label="Open sidebar"
      >
        <MdMenu className="text-xl" />
      </button>

      {/* Search */}
      <div className="relative ml-2 hidden w-full max-w-md sm:block">
        <MdSearch className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant dark:text-on-primary-container" />
        <input
          type="text"
          placeholder="Search students, courses, or faculty..."
          className="w-full rounded-full border-none bg-surface-container-low py-2.5 pl-10 pr-4 text-sm text-primary placeholder:text-on-surface-variant focus:outline-none focus:ring-0 dark:bg-primary-container dark:text-on-primary dark:placeholder:text-on-primary-container"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          onClick={toggleTheme}
          className={`${iconButtonClass} hover:text-secondary dark:hover:text-secondary-fixed-dim`}
          aria-label="Toggle theme"
        >
          {darkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
        </button>

        {/* Notifications */}
        <button
          className={`relative ${iconButtonClass} hover:text-secondary dark:hover:text-secondary-fixed-dim`}
          aria-label="Notifications"
        >
          <MdNotifications className="text-xl" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-60"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-error"></span>
          </span>
        </button>

        <span className="hidden h-6 w-px bg-outline-variant dark:bg-outline sm:block" />

        {/* Profile */}
        <div className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-surface-container dark:hover:bg-primary-container">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-semibold text-white">
            {initials}
          </span>
          <div className="hidden leading-tight sm:block">
            <h4 className="text-sm font-semibold text-primary dark:text-on-primary">
              {role}
            </h4>
            <p className="text-xs font-medium text-on-surface-variant dark:text-on-primary-container">
              {getRoleLabel(role)}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`${iconButtonClass} hover:text-error dark:hover:text-error`}
          aria-label="Logout"
          title="Logout"
        >
          <MdLogout className="text-xl" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
