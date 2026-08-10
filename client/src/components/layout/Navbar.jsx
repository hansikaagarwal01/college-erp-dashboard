import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { FiBell } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import useRealtimeNotifications from '../../hooks/useRealtimeNotifications'
import { getUnreadCount } from '../../api'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useRealtimeNotifications()

  const { data: unread } = useQuery({
    queryKey: ['unreadCount'],
    queryFn: () => getUnreadCount().then((r) => r.data),
    refetchInterval: 60000,
  })
  const unreadCount = unread?.data?.unreadCount ?? 0

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/notifications')}
          className="relative text-gray-600 hover:text-gray-900"
          aria-label="Notifications"
        >
          <FiBell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-500">{user?.role || ''}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
