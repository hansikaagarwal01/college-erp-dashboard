import { MdPersonAdd, MdNoteAdd, MdCampaign, MdPrint } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Add Student",
      icon: <MdPersonAdd className="text-xl" />,
      iconClass: "text-secondary dark:text-secondary-fixed-dim",
      onClick: () => navigate("/students/add"),
    },
    {
      label: "New Course",
      icon: <MdNoteAdd className="text-xl" />,
      iconClass: "text-tertiary-container dark:text-tertiary-fixed",
      onClick: () => navigate("/courses/add"),
    },
    {
      label: "Announce",
      icon: <MdCampaign className="text-xl" />,
      iconClass: "text-on-surface-variant dark:text-gray-400",
    },
    {
      label: "Print Report",
      icon: <MdPrint className="text-xl" />,
      iconClass: "text-on-surface-variant dark:text-gray-400",
      onClick: () => window.print(),
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-outline-variant/30 p-4 shadow-sm dark:border-gray-700/60">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-br from-primary-fixed/40 to-surface opacity-50 dark:from-primary-500/20 dark:to-gray-900"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 z-0 h-32 w-32 rounded-full bg-secondary/10 blur-2xl dark:bg-secondary/20"
      />

      <div className="relative z-10">
        <h3 className="mb-4 text-xl font-semibold text-primary dark:text-white">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-outline-variant/20 bg-surface-container-lowest/80 p-4 backdrop-blur-sm transition-all hover:shadow-md dark:border-gray-600/40 dark:bg-gray-800/80 dark:hover:bg-gray-800"
            >
              <span
                className={`transition-transform group-hover:scale-110 ${action.iconClass}`}
              >
                {action.icon}
              </span>
              <span className="text-center text-xs font-semibold text-primary dark:text-gray-100">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickActions;
