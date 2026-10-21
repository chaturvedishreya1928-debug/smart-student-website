
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardData } from "../api/backend";
import "../App.css";

function StudentDashboard() {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
const [selectedBatch, setSelectedBatch] = useState("B1");
const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 30000);

  return () => clearInterval(timer);
}, []);

const todayName = currentTime.toLocaleDateString("en-US", {
  weekday: "long",
});

const currentMinutes =
  currentTime.getHours() * 60 + currentTime.getMinutes();

const formatTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
};

const weeklySchedule = {
  Monday: [
    { start: "09:00", end: "10:00", subject: "AMT", type: "Lecture" },
    { start: "10:00", end: "12:00", subject: "DBMS / ADSA / EDE", type: "Practical" },
    { start: "12:30", end: "13:30", subject: "FSJP", type: "Lecture" },
    { start: "13:30", end: "14:30", subject: "DBMS", type: "Lecture" },
  ],
  Tuesday: [
    { start: "09:00", end: "10:00", subject: "ADSA", type: "Lecture" },
    { start: "10:00", end: "12:00", subject: "EDE / DBMS / EVS", type: "Practical" },
    { start: "12:30", end: "13:30", subject: "FSJP", type: "Lecture" },
    { start: "13:30", end: "14:30", subject: "EVS", type: "Lecture" },
    { start: "14:45", end: "15:45", subject: "OE", type: "Lecture" },
  ],
  Wednesday: [
    { start: "09:00", end: "10:00", subject: "AMT", type: "Lecture" },
    { start: "10:00", end: "12:00", subject: "ADSA / EDE / Mini Project", type: "Practical" },
    { start: "12:30", end: "13:30", subject: "DBMS", type: "Lecture" },
    { start: "13:30", end: "14:30", subject: "AT", type: "Lecture" },
    { start: "14:45", end: "15:45", subject: "AMT", type: "Lecture" },
    { start: "15:45", end: "16:45", subject: "EDE", type: "Lecture" },
  ],
  Thursday: [
    { start: "09:00", end: "10:00", subject: "AT", type: "Lecture" },
    { start: "10:00", end: "12:00", subject: "EVS / Mini Project / DBMS", type: "Practical" },
    { start: "12:30", end: "13:30", subject: "ADSA", type: "Lecture" },
    { start: "13:30", end: "14:30", subject: "DBMS", type: "Lecture" },
    { start: "14:45", end: "15:45", subject: "EDE", type: "Lecture" },
    { start: "15:45", end: "16:45", subject: "AMT Tutorial", type: "Tutorial" },
  ],
  Friday: [
    { start: "09:00", end: "10:00", subject: "AT", type: "Lecture" },
    { start: "10:00", end: "12:00", subject: "Mini Project / EVS / ADSA", type: "Practical" },
    { start: "12:30", end: "13:30", subject: "ADSA", type: "Lecture" },
    { start: "13:30", end: "14:30", subject: "EVS", type: "Lecture" },
    { start: "14:45", end: "15:45", subject: "OE", type: "Lecture" },
  ],
  Saturday: [],
};

const todayClasses = (weeklySchedule[todayName] || []).map((item) => ({
  ...item,
  startMinutes:
    Number(item.start.split(":")[0]) * 60 +
    Number(item.start.split(":")[1]),
  endMinutes:
    Number(item.end.split(":")[0]) * 60 +
    Number(item.end.split(":")[1]),
}));

const nextClass = todayClasses.find(
  (item) => item.endMinutes > currentMinutes
);

const classIsOngoing = nextClass
  ? nextClass.startMinutes <= currentMinutes &&
    currentMinutes < nextClass.endMinutes
  : false;


  useEffect(() => {
    getDashboardData()
      .then((data) => {
        setDashboardData(data);
        setError("");
      })
      .catch(() => {
        setError("Dashboard data load nahi ho paya. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="dashboard-page">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-page">{error}</div>;
  }

  const {
    studentName,
    totalClasses,
    attendedClasses,
    attendancePercentage,
    pendingAssignments,
    dueTomorrow,
    dueThisWeek,
    totalSubjects,
    totalNotices,
  } = dashboardData;

  
const classesNeededFor75 =
  attendancePercentage < 75
    ? Math.ceil(
        (0.75 * totalClasses - attendedClasses) / 0.25
      )
    : 0;


  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <header className="dashboard-header">
        <div className="welcome-content">
          <span className="welcome-label">
            STUDENT PORTAL
          </span>

          <h1>Welcome back, {studentName}!</h1>
          <p>
            Your academic journey, all in one place.
          </p>

          <div className="dashboard-date">
            📅 {today}
          </div>
        </div>

        <div className="student-profile">
          <div className="student-avatar">👨‍🎓</div>
          <div>
            <strong>Student</strong>
            <span>Engineering Department</span>
          </div>
        </div>
      </header>

      {/* Section Heading */}
      <section className="dashboard-overview">
        <div className="section-heading">
          <div>
            <h2>Your Overview</h2>
            <p>Here's a quick look at your academics.</p>
          </div>
          <span className="overview-badge">
            Academic Summary
          </span>
        </div>

        {/* Summary Cards */}
        <div className="dashboard-cards">
          <Link to="/subjects" className="dashboard-card learning-card">
            <div className="card-top">
              <span className="card-icon">📚</span>
              <span className="card-tag">LEARNING</span>
            </div>

            <h3>My Subjects</h3>
            <p className="card-number">{totalSubjects}</p>
            <small>Subjects in your curriculum</small>
          </Link>

          <Link to="/attendance" className="dashboard-card">
            <div className="card-top">
              <span className="card-icon">📊</span>
              <span className="card-tag">ATTENDANCE</span>
            </div>

            <h3>Attendance</h3>
            <p className="card-number">
              {attendancePercentage}%
            </p>

            <div
              className="attendance-track"
              role="progressbar"
              aria-label="Attendance percentage"
              aria-valuenow={attendancePercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="attendance-fill"
                style={{ width: `${attendancePercentage}%` }}
              />
            </div>

            <small>
              {attendancePercentage >= 75
                ? "✅ Above the 75% target"
                : `⚠️ Attend ${classesNeededFor75} more classes`}
            </small>
          </Link>

          <Link to="/assignments" className="dashboard-card">
            

<div className="card-top">
  <span className="card-icon">📝</span>
  <span className="card-tag">TASKS</span>
</div>



            <h3>Assignments</h3>
            <p className="card-number">
              {pendingAssignments}
            </p>
            <small>Pending assignments</small>

            <div className="card-detail">
              <span>⚠️ Due tomorrow</span>
              <strong>{dueTomorrow}</strong>
            </div>

            <div className="card-detail">
              <span>📌 Due this week</span>
              <strong>{dueThisWeek}</strong>
            </div>
          </Link>

          <Link to="/notices" className="dashboard-card">
            <div className="card-top">
              <span className="card-icon">📢</span>
              <span className="card-tag">UPDATES</span>
            </div>

            <h3>College Notices</h3>
           <p className="card-number">{totalNotices}</p>
            <small>New announcements</small>

            <span className="card-action">
              View notices →
            </span>
          </Link>
        </div>
      </section>
      {/* Today's Classes Dashboard */}
<section className="today-classes-section">
  <div className="today-classes-heading">
    <div>
      <h2>Today's Classes</h2>
      <p>
        {currentTime.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>

    <label className="today-batch-select">
      Your Batch
      <select
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}
      >
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="B3">B3</option>
      </select>
    </label>
  </div>

  <div className="today-classes-layout">
    {/* Left: Daily Summary */}
    <div className="today-panel today-summary-panel">
      <div className="today-panel-heading">
        <div className="today-panel-icon">📅</div>
        <div>
          <h3 className="today-panel-title">DAILY SUMMARY</h3>
          <p className="today-date-large">{todayName}</p>
        </div>
      </div>

      <div className="today-stat">
        <div className="today-stat-icon">📚</div>
        <div>
          <p className="today-stat-label">Scheduled classes</p>
          <p className="today-stat-value">{todayClasses.length}</p>
        </div>
      </div>

      <div className="today-stat">
        <div className="today-stat-icon">⏳</div>
        <div>
          <p className="today-stat-label">Remaining classes</p>
          <p className="today-stat-value">
            {todayClasses.filter((item) => item.endMinutes > currentMinutes).length}
          </p>
        </div>
      </div>
    </div>

    {/* Center: Next Class */}
    <div className="today-panel today-next-panel">
      <div className="today-next-top">
        <div className="today-panel-heading">
          <div className="today-panel-icon">⏰</div>
          <div>
            <h3 className="today-panel-title">NEXT CLASS</h3>
            <p>Stay ready for your next lecture</p>
          </div>
        </div>

        <span className="today-status-pill">
          {classIsOngoing ? "ONGOING" : "UP NEXT"}
        </span>
      </div>

      <div className="today-next-card">
        {nextClass ? (
          <>
            <h3>{nextClass.subject}</h3>
            <p className="today-next-time">
              {formatTime(nextClass.start)} – {formatTime(nextClass.end)}
            </p>
            <span className="today-type-pill">{nextClass.type}</span>
          </>
        ) : (
          <>
            <h3>No More Classes 🎉</h3>
            <p className="today-next-time">
              Enjoy the rest of your day!
            </p>
          </>
        )}

        <div className="today-next-detail">
          <div>📆 {todayName}</div>
          <div>
            👥 Selected batch: {selectedBatch}
          </div>
        </div>
      </div>

      <div className="today-next-bottom">
        <span className="today-current-time">
          Current time:{" "}
          <strong>
            {currentTime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
        </span>

        <Link to="/timetable" className="today-timetable-link">
          View Timetable →
        </Link>
      </div>
    </div>

    {/* Right: Today's Schedule */}
    <div className="today-panel today-schedule-panel">
      <div className="today-panel-heading">
        <div className="today-panel-icon">🗓️</div>
        <div>
          <h3 className="today-panel-title">TODAY'S SCHEDULE</h3>
          <p>Your daily timeline</p>
        </div>
      </div>

      <div className="today-schedule-list">
        {todayClasses.length === 0 ? (
          <div className="today-empty">
            No classes scheduled today.
          </div>
        ) : (
          todayClasses.map((item) => {
            const completed = item.endMinutes <= currentMinutes;
            const isNext = item === nextClass;

            return (
              <div
                key={item.start}
                className={`today-schedule-row ${
                  completed ? "is-completed" : ""
                } ${isNext ? "is-next" : ""}`}
              >
                <span className="today-schedule-dot" />
                <span>
                  {formatTime(item.start)}
                </span>
                <span className="today-schedule-subject">
                  {item.subject}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  </div>
</section>

      {/* Quick Access */}
      <section className="quick-section">
        <div className="section-heading">
          <div>
            <h2>Quick Access</h2>
            <p>Jump straight to what you need.</p>
          </div>
        </div>

        <div className="quick-grid">
          <Link to="/timetable" className="quick-box">
            <span className="quick-icon">📅</span>
            <div>
              <h3>Today's Timetable</h3>
              <p>Check your daily class schedule.</p>
            </div>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/assignments" className="quick-box">
            <span className="quick-icon">📝</span>
            <div>
              <h3>Assignments</h3>
              <p>Keep track of pending work.</p>
            </div>
            <span className="quick-arrow">→</span>
          </Link>

          <Link to="/notices" className="quick-box">
            <span className="quick-icon">📢</span>
            <div>
              <h3>College Notices</h3>
              <p>Stay updated with announcements.</p>
            </div>
            <span className="quick-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
