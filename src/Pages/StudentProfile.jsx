
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudentById } from "../api/backend";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudentById(1)
      .then((data) => {
        setStudent(data);
        setError("");
      })
      .catch(() => {
        setError("Unable to load student details. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const details = student
    ? [
        { icon: "🪪", label: "Student ID", value: student.id },
        {
          icon: "📧",
          label: "Email Address",
          value: student.email || "Not provided",
        },
        {
          icon: "🎓",
          label: "Course / Department",
          value: student.department || "Not provided",
        },
        {
          icon: "📚",
          label: "Current Semester",
          value: student.semester ?? "Not provided",
        },
      ]
    : [];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <Link to="/student-dashboard" className="back-button">
          ← Back to Dashboard
        </Link>

        <div className="profile-title-row">
          <div>
            <span className="profile-eyebrow">STUDENT PORTAL</span>
            <h1>My Profile 👤</h1>
            <p>Your personal and academic information</p>
          </div>

          <span className="profile-status">🎓 Student Account</span>
        </div>
      </div>

      <div className="profile-card">
        {loading ? (
          <p role="status">Loading student profile...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : (
          <>
            <div className="profile-hero">
              <div className="profile-avatar">👨‍🎓</div>
              <span className="profile-account-label">
                STUDENT PROFILE
              </span>
              <h2>{student.name}</h2>
              <p>{student.department || "Department not provided"}</p>
            </div>

            <div className="profile-details-heading">
              <h3>Personal Details</h3>
              <p>Your information registered in the portal</p>
            </div>

            <div className="profile-details">
              {details.map((item) => (
                <div className="profile-row" key={item.label}>
                  <div className="profile-detail-label">
                    <span className="profile-detail-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="profile-footer">
              <span>🔒 Your student details</span>
              <span>Loaded from student database</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
