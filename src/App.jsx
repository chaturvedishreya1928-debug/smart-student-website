import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/login";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentProfile from "./Pages/StudentProfile";
import Subjects from "./Pages/Subjects";
import Attendance from './Pages/Attendance'
import Assignments from "./Pages/Assignments";
import Progress from "./Pages/Progress";
import Timetable from "./Pages/Timetable";
import Notices from "./Pages/Notices";
import StudentLayout from "./Pages/StudentLayout";
import "./App.css";
import { useEffect, useState } from "react";
import { checkBackend } from "./api/backend";
import ScanQR from "./Pages/ScanQR";
import FacultyDashboard from "./Pages/FacultyDashboard";
import FacultyAttendance from "./Pages/FacultyAttendance";
import StudentProgress from "./Pages/StudentProgress";


function BackendTest() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    checkBackend()
      .then((data) => {
        setStatus(data.message);
      })
      .catch((error) => {
        console.error("Backend connection error:", error);
        setStatus("Connection failed. Please check backend settings.");
      });
  }, []);

  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <h2>Backend Connection Test</h2>
      <p>{status}</p>
    </div>
  );
}


function Home() {
  return (
    <div className="app">

      <nav className="navbar">

        <div className="brand-section">
          <img
            src="/college-logo.png"
            alt="College Logo"
            className="college-logo"
          />

          <div>
            <h2>Thakur Shyamnarayan Engineering College</h2>
            <p>Smart College App</p>
          </div>
        </div>

        <Link to="/login" className="login-button">
          Login
        </Link>

      </nav>

      <div className="home-content">
        <h1>Welcome to Smart College App</h1>
        <p>
          Manage your college activities easily and efficiently.
        </p>

        <Link to="/login" className="get-started">
          Get Started
        </Link>
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />

        
<Route path="/backend-test" element={<BackendTest />} />
<Route path="/login" element={<Login />} />
<Route
  path="/faculty-dashboard"
  element={<FacultyDashboard />}
/>
<Route
  path="/faculty-attendance"
  element={<FacultyAttendance />}
/>

        <Route element={<StudentLayout />}>

          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/student-profile"
            element={<StudentProfile />}
          />

          <Route
            path="/subjects"
            element={<Subjects />}
          />

          <Route
           path="/scan-qr"
           element={<ScanQR />}
/>

          <Route
            path="/assignments"
            element={<Assignments />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route
            path="/timetable"
            element={<Timetable />}
          />

          <Route
            path="/notices"
            element={<Notices />}
          />

          <Route
           path="/attendance"
           element={<Attendance />}
          />
          <Route
  path="/student-progress"
  element={<StudentProgress />}
/>
  

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;