import { FaSearch } from "react-icons/fa";

function EmptyState({
  message = "No records found",
  hint,
  icon = <FaSearch className="h-6 w-6" />,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
        {message}
      </h3>
      {hint && (
        <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
}

export default EmptyState;