import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'

// Auth pages (HEAD)
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// Dashboard (upstream lowercase path)
import Dashboard from './pages/dashboard/dashboard'

// CRUD modules (upstream)
import Students from './pages/students/students'
import AddStudent from './pages/students/Addstudent'
import EditStudent from './pages/students/EditStudent'
import StudentDetails from './pages/students/StudentDetails'

import Faculty from './pages/faculty/Faculty'
import AddFaculty from './pages/faculty/Addfaculty'
import EditFaculty from './pages/faculty/EditFaculty'
import FacultyDetails from './pages/faculty/FacultyDetails'

import Departments from './pages/department/Departments'
import AddDepartment from './pages/department/AddDepartment'
import EditDepartment from './pages/department/EditDepartment'
import DepartmentDetails from './pages/department/DepartmentDetails'

import Courses from './pages/courses/Courses'
import AddCourse from './pages/courses/AddCourse'
import EditCourse from './pages/courses/EditCourse'
import CourseDetails from './pages/courses/CourseDetails'

// ERP modules (HEAD)
import Admissions from './pages/Admissions/Admissions'
import Attendance from './pages/Attendance/Attendance'
import Exams from './pages/Exams/Exams'
import Results from './pages/Results/Results'
import Timetable from './pages/Timetable/Timetable'
import Curriculum from './pages/Curriculum/Curriculum'
import Workload from './pages/Workload/Workload'
import Files from './pages/Files/Files'
import Fees from './pages/Fees/Fees'
import Notifications from './pages/Notifications/Notifications'
import Analytics from './pages/Analytics/Analytics'
import Jobs from './pages/Jobs/Jobs'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected routes inside MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="change-password" element={<ChangePassword />} />

          {/* Students CRUD */}
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="students/details/:id" element={<StudentDetails />} />

          {/* Faculty CRUD */}
          <Route path="faculty" element={<Faculty />} />
          <Route path="faculty/add" element={<AddFaculty />} />
          <Route path="faculty/edit/:id" element={<EditFaculty />} />
          <Route path="faculty/details/:id" element={<FacultyDetails />} />

          {/* Departments CRUD */}
          <Route path="departments" element={<Departments />} />
          <Route path="departments/add" element={<AddDepartment />} />
          <Route path="departments/edit/:id" element={<EditDepartment />} />
          <Route path="departments/details/:id" element={<DepartmentDetails />} />

          {/* Courses CRUD */}
          <Route path="courses" element={<Courses />} />
          <Route path="courses/add" element={<AddCourse />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="courses/details/:id" element={<CourseDetails />} />

          {/* Other ERP modules */}
          <Route path="admissions" element={<Admissions />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exams" element={<Exams />} />
          <Route path="results" element={<Results />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="workload" element={<Workload />} />
          <Route path="files" element={<Files />} />
          <Route path="fees" element={<Fees />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="jobs" element={<Jobs />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

export default App
