import { useQuery } from '@tanstack/react-query'
import DashboardCard from '../../components/dashboard/DashboardCard'
import { getDashboardStats } from '../../api'

function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  })

  if (isLoading) {
    return <p className="text-gray-500">Loading dashboard data...</p>
  }

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load dashboard data: {error.response?.data?.message || error.message}
      </p>
    )
  }

  const stats = data?.data || {}

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome Back 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Students" value={stats.totalStudents ?? '—'} />
        <DashboardCard title="Faculty" value={stats.totalFaculty ?? '—'} />
        <DashboardCard title="Departments" value={stats.totalDepartments ?? '—'} />
        <DashboardCard title="Courses" value={stats.totalCourses ?? '—'} />
      </div>
    </div>
  )
}

export default Dashboard
