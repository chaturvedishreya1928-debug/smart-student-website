
import React from "react";
import { Link } from "react-router-dom";

function Subjects() {
  const subjects = [
    {
      name: "Database Management System",
      code: "DBMS",
      teacher: "Mrs. Suwarna Thakre",
      credits: 3,
      icon: "🗄️",
      color: "purple",
    },
    {
      name: "Automata Theory",
      code: "AT",
      teacher: "Mr. Sumit Parmar",
      credits: 3,
      icon: "⚙️",
      color: "pink",
    },
    {
      name: "Advanced Data Structure",
      code: "ADSA",
      teacher: "Mr. Hasan Phudinawala",
      credits: 3,
      icon: "🌳",
      color: "green",
    },
    {
      name: "Applied Mathematics",
      code: "AMT",
      teacher: "Dr. Suresh Pathak",
      credits: 3,
      icon: "📐",
      color: "orange",
    },
    {
      name: "Open Elective",
      code: "OE",
      teacher: "Mrs. Kavita Dhiwar",
      credits: 2,
      icon: "💡",
      color: "blue",
    },
    {
      name: "Entrepreneurship Development",
      code: "EDE",
      teacher: "Dr. Pranoti Nage",
      credits: 2,
      icon: "🚀",
      color: "pink",
    },
    {
      name: "Environmental Studies",
      code: "EVS",
      teacher: "Mrs. Kiran Patil",
      credits: 2,
      icon: "🌱",
      color: "green",
    },
  ];

  const totalCredits = subjects.reduce(
    (total, subject) => total + subject.credits,
    0
  );

  return (
    <div className="subjects-page">
      <div className="subjects-header">
        <Link to="/student-dashboard" className="back-button">
          ← Back to Dashboard
        </Link>

        <div className="subjects-title-row">
          <div>
            <span className="subjects-eyebrow">STUDENT PORTAL</span>
            <h1>My Subjects 📚</h1>
            <p>Explore your current semester subjects and faculty</p>
          </div>

          <div className="subjects-total-card">
            <span>📚</span>
            <div>
              <strong>{subjects.length}</strong>
              <small>Total Subjects</small>
            </div>
          </div>
        </div>
      </div>

      <div className="subjects-summary">
        <div className="subjects-summary-card">
          <span className="summary-icon purple-icon">📖</span>
          <div>
            <p>Enrolled Subjects</p>
            <h2>{subjects.length}</h2>
          </div>
        </div>

        <div className="subjects-summary-card">
          <span className="summary-icon pink-icon">🎓</span>
          <div>
            <p>Total Credits</p>
            <h2>{totalCredits}</h2>
          </div>
        </div>

        <div className="subjects-summary-card">
          <span className="summary-icon green-icon">👩‍🏫</span>
          <div>
            <p>Faculty Details</p>
            <h2>{subjects.length}</h2>
          </div>
        </div>
      </div>

      <div className="subjects-section-heading">
        <div>
          <h2>Semester Subjects</h2>
          <p>Your subjects and assigned faculty members</p>
        </div>
        <span className="subjects-count">{subjects.length} courses</span>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <article
            className={`subject-card subject-${subject.color}`}
            key={subject.code}
          >
            <div className="subject-card-top">
              <div className="subject-icon">{subject.icon}</div>
              <span className="subject-code">{subject.code}</span>
            </div>

            <h3>{subject.name}</h3>

            <div className="subject-teacher">
              <span>👩‍🏫</span>
              <div>
                <small>Faculty Member</small>
                <p>{subject.teacher}</p>
              </div>
            </div>

            <div className="subject-card-footer">
              <span>📚 {subject.credits} Credits</span>
              <span className="subject-status">Current Semester</span>
            </div>
          </article>
        ))}
      </div>

      <div className="subjects-note">
        <span>💡</span>
        <p>
          <strong>Study tip:</strong> Keep track of your subjects and plan
          your study time throughout the semester.
        </p>
      </div>
    </div>
  );
}

export default Subjects;
