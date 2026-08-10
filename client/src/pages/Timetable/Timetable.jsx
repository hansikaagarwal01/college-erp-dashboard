import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getTimetable, deleteTimetable } from '../../api'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function Timetable() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['timetable'],
    queryFn: () => getTimetable({ limit: 50 }).then((r) => r.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTimetable(id),
    onSuccess: () => {
      toast.success('Slot deleted')
      queryClient.invalidateQueries({ queryKey: ['timetable'] })
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete slot'),
  })

  const slots = data?.data || []
  const byDay = DAYS.map((day) => ({ day, entries: slots.filter((s) => s.day === day) }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Timetable</h1>

      {isLoading && <p className="text-gray-500">Loading timetable...</p>}
      {error && <p className="text-red-500">Failed to load: {error.message}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {byDay.map(({ day, entries }) => (
            <div key={day} className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-gray-700 mb-3">{day}</h2>
              {entries.length === 0 && (
                <p className="text-gray-400 text-sm">No classes</p>
              )}
              <ul className="space-y-2">
                {entries.map((s) => (
                  <li key={s.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <div>
                      <p className="font-medium">
                        {s.course?.name || s.course?.code || s.course || '—'}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {s.period} · {s.room} · {s.faculty?.name || s.faculty || '—'}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMutation.mutate(s.id)}
                      className="text-red-600 hover:text-red-700 text-xs ml-3"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Timetable
