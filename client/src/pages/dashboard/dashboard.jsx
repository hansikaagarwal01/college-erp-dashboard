import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaBook,
  FaPlus,
  FaRedo,
} from "react-icons/fa";

import DashboardCard from "../../components/dashboard/DashboardCard";
import StudentAnalytics from "../../components/dashboard/StudentAnalytics";
import DepartmentChart from "../../components/dashboard/charts/DepartmentChart";
import FacultyDepartmentChart from "../../components/dashboard/charts/FacultyDepartmentChart";
import CourseDistributionChart from "../../components/dashboard/charts/CourseDistributionChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import UpcomingEvents from "../../components/dashboard/UpcomingEvents";
import NoticeBoard from "../../components/dashboard/NoticeBoard";
import EmptyState from "../../components/ui/EmptyState";
import api, { getErrorMessage } from "../../services/api";
import { useAuth } from "../../context/useAuth";
import { usePermissions } from "../../hooks/usePermissions";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function groupByDepartment(list, valueKey) {
  const map = {};
  list.forEach((item) => {
    const name = item.department || "Unassigned";
    if (!map[name]) map[name] = { name, [valueKey]: 0 };
    map[name][valueKey] += 1;
  });
  return Object.values(map).sort((a, b) => b[valueKey] - a[valueKey]);
}

function normalizeStudent(s) {
  return {
    ...s,
    name: `${s.firstName || ""} ${s.lastName || ""}`.trim() || s.name || "",
    rollNo: s.rollNumber || s.rollNo || "",
    branch: s.branch || null,
    status: s.status || "Inactive",
  };
}

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = usePermissions();

  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState("");

  const [departmentsList, setDepartmentsList] = useState([]);

  const [facultyList, setFacultyList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  const retryAnalytics = () => {
    setStudentsLoading(true);
    setStudentsError("");
    setReloadKey((k) => k + 1);
  };

  useEffect(() => {
    let active = true;

    api
      .get("/students", { params: { limit: 10000 } })
      .then((res) => {
        if (active) {
          setStudents((res.data?.data || []).map(normalizeStudent));
        }
      })
      .catch((err) => {
        if (active) {
          setStudentsError(
            getErrorMessage(err, "Unable to load student analytics.")
          );
        }
      });

    api
      .get("/departments")
      .then((res) => {
        if (active && res.data?.data) setDepartmentsList(res.data.data);
      })
      .catch(() => {
        /* keep the list empty if the departments API is unavailable */
      })
      .finally(() => {
        if (active) setStudentsLoading(false);
      });

    api
      .get("/faculty")
      .then((res) => {
        if (active) setFacultyList(res.data?.data || []);
      })
      .catch(() => {
        /* keep the list empty if the faculty API is unavailable */
      });

    api
      .get("/courses")
      .then((res) => {
        if (active) setCoursesList(res.data?.data || []);
      })
      .catch(() => {
        /* keep the list empty if the courses API is unavailable */
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const realDepartments = departmentsList;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const pctActive = students.length
    ? Math.round((activeStudents / students.length) * 100)
    : 0;
  const activeFaculty = facultyList.filter((f) => f.status === "Active").length;
  const activeDepartments = realDepartments.filter(
    (d) => d.status === "Active"
  ).length;
  const activeCourses = coursesList.filter((c) => c.status === "Active").length;

  const kpis = [
    {
      title: "Students",
      value: students.length,
      description: `${activeStudents} currently active`,
      trend: `${pctActive}% active`,
      trendUp: true,
      trendNote: "of all students",
      icon: <FaUserGraduate className="text-xl" />,
      accentClass:
        "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400",
      to: "/students",
    },
    {
      title: "Faculty",
      value: facultyList.length,
      description: `${activeFaculty} currently active`,
      trend: `${facultyList.length
        ? Math.round((activeFaculty / facultyList.length) * 100)
        : 0}% active`,
      trendUp: true,
      trendNote: "of all faculty",
      icon: <FaChalkboardTeacher className="text-xl" />,
      accentClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      to: "/faculty",
    },
    {
      title: "Departments",
      value: realDepartments.length,
      description: `${activeDepartments} currently active`,
      trend: `${activeDepartments && realDepartments.length
        ? Math.round(
            (activeDepartments / realDepartments.length) * 100
          )
        : 0}% active`,
      trendUp: true,
      trendNote: "of all departments",
      icon: <FaBuilding className="text-xl" />,
      accentClass:
        "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      to: "/departments",
    },
    {
      title: "Courses",
      value: coursesList.length,
      description: `${activeCourses} currently active`,
      trend: `${coursesList.length
        ? Math.round((activeCourses / coursesList.length) * 100)
        : 0}% active`,
      trendUp: true,
      trendNote: "of all courses",
      icon: <FaBook className="text-xl" />,
      accentClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      to: "/courses",
    },
  ];

  const studentsByDepartment = useMemo(
    () => groupByDepartment(students, "value"),
    [students]
  );

  const facultyByDepartment = useMemo(
    () => groupByDepartment(facultyList, "value"),
    [facultyList]
  );

  const coursesByDepartment = useMemo(() => {
    const map = {};
    coursesList.forEach((course) => {
      const name = course.department || "Unassigned";
      if (!map[name])
        map[name] = { name, courses: 0, active: 0, inactive: 0 };
      map[name].courses += 1;
      if (course.status === "Active") map[name].active += 1;
      else map[name].inactive += 1;
    });
    return Object.values(map).sort((a, b) => b.courses - a.courses);
  }, [coursesList]);

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.role || "Admin"}</h1>
          <p className="page-subtitle">
            Here's what's happening across your college today · {today}
          </p>
        </div>

        {isAdmin && (
          <button onClick={() => navigate("/students/add")} className="btn-primary">
            <FaPlus />
            Add Student
          </button>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      {/* Student distribution drill-down */}
      <div className="mt-6">
        {studentsLoading ? (
          <div className="card">
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
              <span className="spinner" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading student analytics…
              </p>
            </div>
          </div>
        ) : studentsError ? (
          <div className="card">
            <EmptyState
              message="Student analytics unavailable"
              hint={studentsError}
            />
            <div className="flex justify-center pb-6">
              <button onClick={retryAnalytics} className="btn-secondary">
                <FaRedo />
                Retry
              </button>
            </div>
          </div>
        ) : (
          <StudentAnalytics students={students} />
        )}
      </div>

      {/* Additional analytics */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DepartmentChart
          data={studentsByDepartment}
          title="Students by Department"
        />
        <FacultyDepartmentChart data={facultyByDepartment} />
        <CourseDistributionChart data={coursesByDepartment} />
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