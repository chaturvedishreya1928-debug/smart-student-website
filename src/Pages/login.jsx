
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Student");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginId.trim() || !password) {
      setError("Please enter your login ID and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://smart-college-website.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginId: loginId.trim(),
            password,
            role,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail ||
          data.message ||
          data.title ||
          "Invalid login ID or password."
        );
      }

      if (data.role?.toLowerCase() !== role.toLowerCase()) {
        throw new Error("The selected role does not match your account.");
      }

      sessionStorage.setItem("loginId", data.loginId);
      sessionStorage.setItem("userRole", data.role);

      if (data.studentId) {
        sessionStorage.setItem("studentId", String(data.studentId));
      } else {
        sessionStorage.removeItem("studentId");
      }

      navigate(
        data.role.toLowerCase() === "student"
          ? "/student-dashboard"
          : "/faculty-dashboard"
      );
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check whether the backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleLogin}>
          <label>Login As</label>

          <div className="role-selection">
            <button
              type="button"
              className={
                role === "Student"
                  ? "role-button active"
                  : "role-button"
              }
              onClick={() => {
                setRole("Student");
                setError("");
              }}
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
              onClick={() => {
                setRole("Faculty");
                setError("");
              }}
            >
              👨‍🏫 Faculty
            </button>
          </div>

          <label>Email / Student ID</label>

          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder={
              role === "Student"
                ? "Enter your student email"
                : "Enter your faculty email"
            }
            autoComplete="username"
            required
          />

          <label>Password</label>

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="forgot-password">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setError("Please contact your faculty to reset your password.");
              }}
            >
              Forgot Password?
            </a>
          </div>

          {error && (
            <p role="alert" style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Checking..." : `Login as ${role}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
