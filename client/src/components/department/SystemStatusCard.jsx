import { MdInfo } from "react-icons/md";

function SystemStatusCard({ unassignedCourses }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-outline-variant bg-surface-container-low p-4 dark:border-gray-700/60 dark:bg-gray-800/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-fixed/50 dark:bg-secondary/30">
        <MdInfo className="text-xl text-secondary dark:text-secondary-fixed-dim" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-primary dark:text-gray-100">
          Fall Semester Setup
        </h4>
        <p className="mt-1 text-[13px] text-on-surface-variant dark:text-gray-400">
          All departmental schedules must be finalized by August 15th.{" "}
          {unassignedCourses} course
          {unassignedCourses === 1 ? "" : "s"} remain
          {unassignedCourses === 1 ? "s" : ""} unassigned.
        </p>
      </div>
    </div>
  );
}

export default SystemStatusCard;
