import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊', ready: true },
  { to: '/admissions', label: 'Admissions', icon: '🎓', ready: true },
  { to: '/students', label: 'Students', icon: '🎒', ready: false },
  { to: '/faculty', label: 'Faculty', icon: '👩‍🏫', ready: false },
  { to: '/departments', label: 'Departments', icon: '🏛️', ready: false },
  { to: '/courses', label: 'Courses', icon: '📚', ready: false },
  { to: '/attendance', label: 'Attendance', icon: '✅', ready: true },
  { to: '/exams', label: 'Exams', icon: '🧪', ready: true },
  { to: '/results', label: 'Results', icon: '📝', ready: true },
  { to: '/timetable', label: 'Timetable', icon: '🕐', ready: true },
  { to: '/files', label: 'Files', icon: '📁', ready: true },
  { to: '/fees', label: 'Fees', icon: '💳', ready: true },
  { to: '/notifications', label: 'Notifications', icon: '🔔', ready: true },
  { to: '/analytics', label: 'Analytics', icon: '📈', ready: true },
  { to: '/announcements', label: 'Announcements', icon: '📢', ready: false },
]

function Sidebar() {
  return (
    <aside className="w-60 bg-gray-900 text-white flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-lg font-bold">College ERP</h1>
      </div>

      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                item.ready
                  ? isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 cursor-not-allowed'
              }`
            }
            onClick={(e) => {
              if (!item.ready) e.preventDefault()
            }}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
            {!item.ready && (
              <span className="ml-auto text-[10px] text-gray-500">soon</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
