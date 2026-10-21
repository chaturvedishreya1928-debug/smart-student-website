
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAttendanceSummary } from "../api/backend";

function StudentProgress() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAttendanceSummary(1)
      .then((data) => setSummary(data))
      .catch((err) =>
        setError(err.message || "Unable to load attendance.")
      )
      .finally(() => setLoading(false));
  }, []);

  const getPercentage = (value) =>
    Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <main style={styles.page}>
      <button
        style={styles.backButton}
        onClick={() => navigate("/faculty-dashboard")}
      >
        ← Back to Faculty Dashboard
      </button>

      <header style={styles.header}>
        <div>
          <span style={styles.eyebrow}>ACADEMIC PERFORMANCE</span>
          <h1 style={styles.title}>📚 Student Progress</h1>
          <p style={styles.subtitle}>
            Track attendance and subject-wise progress for the demo student.
          </p>
        </div>
      </header>

      {loading && <p>Loading student progress...</p>}

      {error && <p style={styles.error}>{error}</p>}

      {summary && (
        <>
          <section style={styles.overviewGrid}>
            <div style={styles.overviewCard}>
              <span style={styles.cardLabel}>STUDENT ID</span>
              <h2 style={styles.statValue}>{summary.studentId}</h2>
              <p style={styles.muted}>Demo student</p>
            </div>

            <div style={styles.overviewCard}>
              <span style={styles.cardLabel}>ATTENDED CLASSES</span>
              <h2 style={styles.statValue}>
                {summary.attendedClasses}
                <span style={styles.statTotal}>
                  {" "}/ {summary.totalClasses}
                </span>
              </h2>
              <p style={styles.muted}>Classes attended</p>
            </div>

            <div style={styles.overviewCard}>
              <span style={styles.cardLabel}>OVERALL ATTENDANCE</span>
              <h2 style={styles.percentageValue}>
                {summary.overallPercentage}%
              </h2>
              <div style={styles.progressBackground}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${getPercentage(summary.overallPercentage)}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <section style={styles.subjectSection}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Subject-wise Progress</h2>
                <p style={styles.muted}>
                  Attendance breakdown by subject and class type.
                </p>
              </div>
              <span style={styles.subjectCount}>
                {summary.subjects?.length || 0} records
              </span>
            </div>

            {summary.subjects?.length ? (
              <div style={styles.subjectGrid}>
                {summary.subjects.map((item, index) => (
                  <article
                    key={`${item.subject}-${item.classType}-${index}`}
                    style={styles.subjectCard}
                  >
                    <div style={styles.subjectTop}>
                      <div>
                        <h3 style={styles.subjectName}>{item.subject}</h3>
                        <span style={styles.classType}>
                          {item.classType}
                        </span>
                      </div>
                      <strong style={styles.subjectPercentage}>
                        {item.percentage}%
                      </strong>
                    </div>

                    <div style={styles.progressBackground}>
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${getPercentage(item.percentage)}%`,
                        }}
                      />
                    </div>

                    <div style={styles.subjectFooter}>
                      <span>Classes attended</span>
                      <strong>
                        {item.attendedClasses} / {item.totalClasses}
                      </strong>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                No subject-wise attendance records available.
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    maxWidth: "none",
    boxSizing: "border-box",
    padding: "28px",
    background: "#f5f6fc",
    fontFamily: "Arial, sans-serif",
    color: "#263f75",
  },
  backButton: {
    background: "#56339a",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "24px",
  },
  header: {
    marginBottom: "26px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    color: "#7653bd",
  },
  title: {
    fontSize: "30px",
    margin: "8px 0",
    color: "#263f75",
  },
  subtitle: {
    color: "#64748b",
    margin: 0,
    lineHeight: 1.6,
  },
  overviewGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "18px",
  width: "100%",
  marginBottom: "30px",
  boxSizing: "border-box",
},
  overviewCard: {
    background: "#fff",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1px solid #ece9f8",
    minWidth: 0,
    boxSizing: "border-box",
  },
  cardLabel: {
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "0.7px",
    color: "#7c8498",
  },
  statValue: {
    fontSize: "28px",
    margin: "12px 0 6px",
    color: "#56339a",
  },
  statTotal: {
    fontSize: "16px",
    color: "#8991a5",
  },
  percentageValue: {
    fontSize: "30px",
    margin: "12px 0",
    color: "#56339a",
  },
  muted: {
    fontSize: "13px",
    color: "#7c8498",
    lineHeight: 1.5,
  },
  progressBackground: {
    width: "100%",
    height: "9px",
    background: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6757ed, #e843a3)",
    borderRadius: "10px",
    transition: "width 0.3s ease",
  },
  subjectSection: {
    width: "100%",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "18px",
  },
  sectionTitle: {
    margin: "0 0 6px",
    fontSize: "22px",
    color: "#263f75",
  },
  subjectCount: {
    padding: "8px 12px",
    borderRadius: "20px",
    background: "#ebe7ff",
    color: "#56339a",
    fontSize: "12px",
    fontWeight: "bold",
  },
  subjectGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "18px",
  width: "100%",
  maxWidth: "none",
  boxSizing: "border-box",
},
  subjectGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "18px",
  width: "100%",
  maxWidth: "none",
  boxSizing: "border-box",
},
  subjectTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "18px",
  },
  subjectName: {
    margin: "0 0 7px",
    fontSize: "18px",
    color: "#263f75",
  },
  classType: {
    display: "inline-block",
    padding: "5px 9px",
    background: "#f0edff",
    color: "#6545a5",
    borderRadius: "6px",
    fontSize: "12px",
  },
  subjectPercentage: {
    fontSize: "20px",
    color: "#56339a",
    whiteSpace: "nowrap",
  },
  subjectFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "14px",
    fontSize: "13px",
    color: "#7c8498",
  },
  emptyState: {
    background: "#fff",
    padding: "28px",
    borderRadius: "14px",
    color: "#64748b",
  },
  error: {
    color: "#b42318",
    background: "#fff1f0",
    padding: "14px",
    borderRadius: "10px",
  },
};

export default StudentProgress;
