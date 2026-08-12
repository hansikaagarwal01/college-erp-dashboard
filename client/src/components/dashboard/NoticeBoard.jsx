import { FaBullhorn } from "react-icons/fa";

const notices = [
  "Holiday Notice",
  "Exam Schedule Released",
  "Workshop Registration Open",
  "Fee Submission Deadline",
];

function NoticeBoard() {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
        Notice Board
      </h2>

      <div className="space-y-4">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b border-gray-100 pb-3 last:border-none last:pb-0 dark:border-gray-700"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10">
              <FaBullhorn />
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-200">{notice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticeBoard;