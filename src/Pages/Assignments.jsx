import React, { useState } from "react";

function Assignments() {
  const [assignments, setAssignments] = useState([
    {
      title: "SQL Queries Practice",
      subject: "DBMS",
      due: "Tomorrow",
      status: "Pending",
      priority: "High",
    },
    {
      title: "Sorting Algorithms",
      subject: "ADSA",
      due: "25 October",
      status: "Pending",
      priority: "Medium",
    },
    {
      title: "Automata Theory Worksheet",
      subject: "AT",
      due: "28 October",
      status: "Pending",
      priority: "High",
    },
    {
      title: "Engineering Mathematics Problem Set",
      subject: "AMT",
      due: "30 October",
      status: "Completed",
      priority: "Low",
    },
  ]);

  const markAsCompleted = (index) => {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment, i) =>
        i === index
          ? { ...assignment, status: "Completed" }
          : assignment
      )
    );
  };

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  const completedAssignments = assignments.filter(
    (assignment) => assignment.status === "Completed"
  ).length;

  const highPriorityAssignments = assignments.filter(
    (assignment) =>
      assignment.priority === "High" &&
      assignment.status === "Pending"
  ).length;

  return (
    <div className="assignments-page">

      <h1>📝 Assignments</h1>

      <p className="assignments-subtitle">
        Manage your assignments and deadlines
      </p>

      {/* SUMMARY */}
      <div className="assignment-summary">

        <div className="assignment-summary-card">
          <span>📚</span>
          <h3>Total</h3>
          <strong>{assignments.length}</strong>
        </div>

        <div className="assignment-summary-card">
          <span>⏳</span>
          <h3>Pending</h3>
          <strong>{pendingAssignments}</strong>
        </div>

        <div className="assignment-summary-card">
          <span>✅</span>
          <h3>Completed</h3>
          <strong>{completedAssignments}</strong>
        </div>

        <div className="assignment-summary-card">
          <span>⚠️</span>
          <h3>High Priority</h3>
          <strong>{highPriorityAssignments}</strong>
        </div>

      </div>

      <h2 className="assignment-section-title">
        All Assignments
      </h2>

      {/* ASSIGNMENTS */}
      <div className="assignment-list">

        {assignments.map((assignment, index) => (

          <div
            className="assignment-card"
            key={index}
          >

            <div>

              <h2>{assignment.title}</h2>

              <p>
                <strong>📚 Subject:</strong>{" "}
                {assignment.subject}
              </p>

              <p>
                <strong>📅 Due:</strong>{" "}
                {assignment.due}
              </p>

              <p>
                <strong>📌 Priority:</strong>{" "}
                {assignment.priority}
              </p>

            </div>

            <div className="assignment-status">

              {assignment.status === "Completed" ? (

                <span className="assignment-completed">
                  ✅ Completed
                </span>

              ) : (

                <>
                  <span className="assignment-pending">
                    ⏳ Pending
                  </span>

                  {assignment.priority === "High" && (
                    <span className="assignment-warning">
                      ⚠️ Important
                    </span>
                  )}

                  <button
                    className="complete-button"
                    onClick={() => markAsCompleted(index)}
                  >
                    ✓ Mark as Completed
                  </button>
                </>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Assignments;