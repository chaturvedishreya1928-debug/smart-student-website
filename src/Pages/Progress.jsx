import React from "react";

function Progress() {
  const subjects = [
    { name: "DBMS", progress: 85 },
    { name: "ADSA", progress: 78 },
    { name: "AMT", progress: 70 },
    { name: "AT", progress: 90 },
    { name: "FSJP", progress: 82 },
    { name: "EDE", progress: 80 },
  ];

  const totalProgress = subjects.reduce(
    (sum, subject) => sum + subject.progress,
    0
  );

  const overallProgress = Math.round(
    totalProgress / subjects.length
  );

  const strongSubjects = subjects.filter(
    (subject) => subject.progress >= 80
  ).length;

  const improvementSubjects = subjects.filter(
    (subject) => subject.progress < 75
  ).length;

  const assignmentsCompleted = 3;
  const totalAssignments = 4;

  const assignmentPercentage = Math.round(
    (assignmentsCompleted / totalAssignments) * 100
  );

  const attendance = 85;

  return (
    <div className="progress-page">

      <h1>📈 My Progress</h1>

      <p className="progress-subtitle">
        Track your academic performance
      </p>

      {/* OVERALL PROGRESS */}

      <div className="overall-progress">

        <h2>Overall Academic Progress</h2>

        <div className="progress-number">
          {overallProgress}%
        </div>

        {overallProgress >= 80 ? (
          <p>🌟 Excellent academic progress</p>
        ) : overallProgress >= 75 ? (
          <p>👍 Good academic progress</p>
        ) : (
          <p>⚠️ Improvement required</p>
        )}

      </div>

      {/* SUMMARY */}

      <div className="progress-summary">

        <div>
          <h3>📚 Subjects</h3>
          <p>{subjects.length}</p>
        </div>

        <div>
          <h3>🌟 Strong Subjects</h3>
          <p>{strongSubjects}</p>
        </div>

        <div>
          <h3>⚠️ Need Improvement</h3>
          <p>{improvementSubjects}</p>
        </div>

        <div>
          <h3>📊 Attendance</h3>
          <p>{attendance}%</p>
        </div>

      </div>

      {/* SUBJECT PROGRESS */}

      <h2 className="progress-heading">
        📚 Subject-wise Progress
      </h2>

      <div className="progress-list">

        {subjects.map((subject) => {

          const status =
            subject.progress >= 80
              ? "🌟 Strong"
              : subject.progress >= 75
              ? "👍 Good"
              : "⚠️ Improve";

          return (
            <div
              className="progress-item"
              key={subject.name}
            >

              <div className="progress-info">

                <h3>{subject.name}</h3>

                <span>
                  {subject.progress}% — {status}
                </span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${subject.progress}%`,
                  }}
                ></div>

              </div>

            </div>
          );
        })}

      </div>

      {/* ASSIGNMENT PROGRESS */}

      <div className="academic-progress-card">

        <h2>📝 Assignment Progress</h2>

        <p>
          {assignmentsCompleted} of{" "}
          {totalAssignments} assignments completed
        </p>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${assignmentPercentage}%`,
            }}
          ></div>

        </div>

        <strong>{assignmentPercentage}% Completed</strong>

      </div>

      {/* ATTENDANCE */}

      <div className="academic-progress-card">

        <h2>📊 Attendance Progress</h2>

        <p>
          Current attendance:{" "}
          <strong>{attendance}%</strong>
        </p>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${attendance}%`,
            }}
          ></div>

        </div>

        {attendance >= 75 ? (
          <strong>✅ Attendance requirement maintained</strong>
        ) : (
          <strong>
            ⚠️ Attendance needs improvement
          </strong>
        )}

      </div>

      {/* TREND */}

      <div className="academic-progress-card">

        <h2>📈 Progress Trend</h2>

        <div className="progress-trend">

          <div>
            <span>Week 1</span>
            <strong>74%</strong>
          </div>

          <div>
            <span>Week 2</span>
            <strong>77%</strong>
          </div>

          <div>
            <span>Week 3</span>
            <strong>79%</strong>
          </div>

          <div>
            <span>Week 4</span>
            <strong>{overallProgress}%</strong>
          </div>

        </div>

      </div>

      {/* SMART SUGGESTION */}

      <div className="smart-suggestion">

        <h2>💡 Smart Suggestion</h2>

        {improvementSubjects > 0 ? (
          <p>
            Focus more on subjects below 75%.
            Regular practice and revision can help
            improve your overall academic progress.
          </p>
        ) : (
          <p>
            Great work! Maintain your current study
            routine and continue regular revision.
          </p>
        )}

      </div>

    </div>
  );
}

export default Progress;