import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaBook,
  FaPlus,
} from "react-icons/fa";

import students from "../../data/studentData";
import faculty from "../../data/facultyData";
import departments from "../../data/departmentData";
import courses from "../../data/courseData";

import DashboardCard from "../../components/dashboard/DashboardCard";
import StudentAnalytics from "../../components/dashboard/StudentAnalytics";
import AdmissionChart from "../../components/dashboard/charts/AdmissionChart";
import DepartmentChart from "../../components/dashboard/charts/DepartmentChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import NoticeBoard from "../../components/dashboard/NoticeBoard";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function Dashboard() {
  const navigate = useNavigate();

  const activeStudents = students.filter((s) => s.status === "Active").length;
  const activeFaculty = faculty.filter((f) => f.status === "Active").length;
  const activeDepartments = departments.filter(
    (d) => d.status === "Active"
  ).length;
  const activeCourses = courses.filter((c) => c.status === "Active").length;

  const kpis = [
    {
      title: "Students",
      value: students.length,
      description: `${activeStudents} currently active`,
      trend: `${Math.round((activeStudents / students.length) * 100)}% active`,
      trendUp: true,
      trendNote: "of all students",
      icon: <FaUserGraduate className="text-xl" />,
      accentClass:
        "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400",
      to: "/students",
    },
    {
      title: "Faculty",
      value: faculty.length,
      description: `${activeFaculty} currently active`,
      trend: `${Math.round((activeFaculty / faculty.length) * 100)}% active`,
      trendUp: true,
      trendNote: "of all faculty",
      icon: <FaChalkboardTeacher className="text-xl" />,
      accentClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      to: "/faculty",
    },
    {
      title: "Departments",
      value: departments.length,
      description: `${activeDepartments} currently active`,
      trend: `${Math.round((activeDepartments / departments.length) * 100)}% active`,
      trendUp: true,
      trendNote: "of all departments",
      icon: <FaBuilding className="text-xl" />,
      accentClass:
        "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      to: "/departments",
    },
    {
      title: "Courses",
      value: courses.length,
      description: `${activeCourses} currently active`,
      trend: `${Math.round((activeCourses / courses.length) * 100)}% active`,
      trendUp: true,
      trendNote: "of all courses",
      icon: <FaBook className="text-xl" />,
      accentClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      to: "/courses",
    },
  ];

  const departmentChartData = departments.map((d) => ({
    name: d.name,
    value: d.students,
  }));

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, Admin</h1>
          <p className="page-subtitle">
            Here's what's happening across your college today · {today}
          </p>
        </div>

        <button onClick={() => navigate("/students/add")} className="btn-primary">
          <FaPlus />
          Add Student
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdmissionChart />
        <DepartmentChart data={departmentChartData} />
      </div>

      {/* Student analytics */}
      <div className="mt-6">
        <StudentAnalytics />
      </div>

      {/* Activity widgets */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />

        <div className="flex flex-col gap-6">
          <UpcomingEvents />
          <NoticeBoard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;