import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Student");

  return (
    <div className="login-page">

      <div className="login-box">

        <div className="login-header">

          <img
            src="/college-logo.png"
            alt="College Logo"
            className="login-logo"
          />

          <h1>Welcome Back</h1>

          <p>Login to your College Smart App</p>

        </div>

        <form
          onSubmit={(e) => {
    e.preventDefault();

   if (role === "Student") {
  navigate("/student-dashboard");
} else {
  navigate("/faculty-dashboard");
}
  }}
        >

          {/* ROLE SELECTION */}

          <label>Login As</label>

          <div className="role-selection">

            <button
              type="button"
              className={
                role === "Student"
                  ? "role-button active"
                  : "role-button"
              }
              onClick={() => setRole("Student")}
            >
              👨‍🎓 Student
            </button>

            <button
              type="button"
              className={
                role === "Faculty"
                  ? "role-button active"
                  : "role-button"
              }
              onClick={() => setRole("Faculty")}
            >
              👨‍🏫 Faculty
            </button>

          </div>

          {/* EMAIL / ID */}

          <label>Email / Student ID</label>

          <input
            type="text"
            placeholder={
              role === "Student"
                ? "Enter your student ID or email"
                : "Enter your faculty ID or email"
            }
          />

          {/* PASSWORD */}

          <label>Password</label>

          <div className="password-container">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {/* FORGOT PASSWORD */}

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          {/* LOGIN BUTTON */}

          <button type="submit" className="login-submit">
            Login as {role}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;