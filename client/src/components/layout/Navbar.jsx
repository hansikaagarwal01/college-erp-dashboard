import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>

      <div className="flex items-center gap-4">
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
