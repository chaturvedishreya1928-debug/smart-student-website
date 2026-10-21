
import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

function StudentLayout() {
  const navItems = [
    { to: "/student-dashboard", icon: "🏠", label: "Dashboard" },
    { to: "/student-profile", icon: "👤", label: "My Profile" },
    { to: "/subjects", icon: "📚", label: "Subjects" },
    { to: "/timetable", icon: "📅", label: "Timetable" },
    { to: "/attendance", icon: "📊", label: "Attendance" },
    { to: "/scan-qr", icon: "📷", label: "Scan QR" },
    { to: "/notices", icon: "📢", label: "Notices" },
    { to: "/assignments", icon: "📝", label: "Assignments" },
    { to: "/progress", icon: "📈", label: "My Progress" },
  ];

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/college-logo.png" alt="College Logo" />
        </div>

        <h3>Student Portal</h3>

        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <Link to="/login" className="logout-link">
          <span className="sidebar-icon">🚪</span>
          <span>Logout</span>
        </Link>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
