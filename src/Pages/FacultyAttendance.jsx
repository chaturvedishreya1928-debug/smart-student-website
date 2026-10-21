
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  createAttendanceSession,
  getAttendanceSummary,
  getFacultySessionAttendance,
} from "../api/backend";

function FacultyAttendance() {
  const subjects = ["DBMS", "ADSA", "AMT", "AT", "FSJP", "EDE", "EVS"];

  const [subject, setSubject] = useState("DBMS");
  const [classType, setClassType] = useState("Theory");
  const [session, setSession] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [classReport, setClassReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // QR countdown timer
  useEffect(() => {
    if (!session?.expiresAt) {
      setSecondsLeft(0);
      return;
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (new Date(session.expiresAt).getTime() - Date.now()) / 1000
        )
      );
      setSecondsLeft(remaining);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [session]);

  // Demo student summary
  useEffect(() => {
    getAttendanceSummary(1)
      .then(setSummary)
      .catch(() => setSummary(null));
  }, []);

  // Generate QR and load its attendance report
  async function generateQR() {
    setLoading(true);
    setMessage("");

    try {
      const data = await createAttendanceSession(subject, classType);

      setSession(data);
      setClassReport(null);
      setReportLoading(true);

      try {
        const report = await getFacultySessionAttendance(data.id);
        setClassReport(report);
      } catch (error) {
        setMessage(
          error.message || "QR created, but the student list could not load."
        );
      } finally {
        setReportLoading(false);
      }

      setMessage("QR code generated successfully.");
    } catch (error) {
      setSession(null);
      setMessage(error.message || "Could not generate QR code.");
    } finally {
      setLoading(false);
    }
  }

  // Refresh the current session's student list
  async function refreshStudentList() {
    if (!session?.id) {
      setMessage("Generate a QR code first.");
      return;
    }

    setReportLoading(true);
    setMessage("");

    try {
      const report = await getFacultySessionAttendance(session.id);
      setClassReport(report);
      setMessage("Student attendance list refreshed.");
    } catch (error) {
      setMessage(error.message || "Could not refresh student list.");
    } finally {
      setReportLoading(false);
    }
  }

  const percentage = Math.min(
    100,
    Math.max(0, Number(summary?.overallPercentage) || 0)
  );

  return (
    <div style={styles.page}>
      {/* Header */}
      <button
        onClick={() => window.history.back()}
        style={styles.backButton}
      >
        ← Back to Faculty Dashboard
      </button>

      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>FACULTY WORKSPACE</p>
          <h1 style={styles.pageTitle}>Faculty Attendance</h1>
          <p style={styles.subtitle}>
            Generate classroom QR codes and monitor student attendance.
          </p>
        </div>

        <div style={styles.headerIcon}>📋</div>
      </header>

      {/* Two-column top section */}
      <div style={styles.topGrid}>
        {/* QR Generator */}
        <section style={styles.card}>
          <div style={styles.sectionHeading}>
            <div style={styles.iconBox}>📷</div>
            <div>
              <h2 style={styles.cardTitle}>Generate Attendance QR</h2>
              <p style={styles.muted}>Create a QR code for your class.</p>
            </div>
          </div>

          <label htmlFor="faculty-subject" style={styles.label}>
            Subject
          </label>
          <select
            id="faculty-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={styles.input}
          >
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="faculty-class-type" style={styles.label}>
            Class Type
          </label>
          <select
            id="faculty-class-type"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            style={styles.input}
          >
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
          </select>

          <button
            onClick={generateQR}
            disabled={loading}
            style={{
              ...styles.primaryButton,
              opacity: loading ? 0.65 : 1,
            }}
          >
            {loading ? "Generating..." : "Generate QR Code"}
            {!loading && <span>→</span>}
          </button>

          {message && (
            <p role="status" style={styles.message}>
              {message}
            </p>
          )}

          {session && secondsLeft > 0 && (
            <div style={styles.qrPanel}>
              <h3 style={styles.qrTitle}>
                {session.subject} — {session.classType}
              </h3>

              <div style={styles.qrImage}>
                <QRCodeSVG value={session.qrToken} size={180} />
              </div>

              <div style={styles.timer}>
                ⏱ QR expires in {Math.floor(secondsLeft / 60)}:
                {String(secondsLeft % 60).padStart(2, "0")}
              </div>

              <p style={styles.muted}>
                Ask students to scan this QR before it expires.
              </p>
            </div>
          )}

          {session && secondsLeft === 0 && (
            <p style={styles.expired}>
              This QR code has expired. Generate a new one.
            </p>
          )}
        </section>

        {/* Attendance overview */}
        <section style={styles.card}>
          <div style={styles.sectionHeading}>
            <div style={styles.iconBox}>📊</div>
            <div>
              <h2 style={styles.cardTitle}>Attendance Overview</h2>
              <p style={styles.muted}>Demo student summary</p>
            </div>
          </div>

          {summary ? (
            <>
              <div style={styles.studentLabel}>
                Student ID: <strong>{summary.studentId}</strong>
              </div>

              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <p style={styles.muted}>Attended Classes</p>
                  <h3 style={styles.statNumber}>
                    {summary.attendedClasses}
                    <span style={styles.statTotal}>
                      {" "}/ {summary.totalClasses}
                    </span>
                  </h3>
                </div>

                <div style={styles.statBox}>
                  <p style={styles.muted}>Attendance</p>
                  <h3 style={styles.statNumber}>{percentage}%</h3>
                </div>
              </div>

              <div style={styles.progressTrack}>
                <div
                  style={{
                    ...styles.progressBar,
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <p style={styles.muted}>
                This is one demo student's summary, not the whole class.
              </p>
            </>
          ) : (
            <p style={styles.muted}>
              Attendance summary is currently unavailable.
            </p>
          )}

          <div style={styles.tipBox}>
            <strong>💡 Quick tip</strong>
            <p style={{ marginBottom: 0 }}>
              Generate a fresh QR for each attendance session. The QR is valid
              for a limited time.
            </p>
          </div>
        </section>
      </div>

      {/* Full-width student attendance list */}
      <section style={styles.card}>
        <div style={styles.reportHeader}>
          <div style={styles.sectionHeading}>
            <div style={styles.iconBox}>👥</div>
            <div>
              <h2 style={styles.cardTitle}>Student Attendance List</h2>
              <p style={styles.muted}>
                Review attendance for the selected classroom session.
              </p>
            </div>
          </div>

          <button
            onClick={refreshStudentList}
            disabled={reportLoading || !session}
            style={{
              ...styles.primaryButton,
              width: "auto",
              opacity: reportLoading || !session ? 0.6 : 1,
            }}
          >
            {reportLoading ? "Refreshing..." : "↻ Refresh List"}
          </button>
        </div>

        {reportLoading && (
          <p style={styles.muted}>Loading student records...</p>
        )}

        {classReport && (
          <>
            <div style={styles.reportStats}>
              <div>
                <p style={styles.muted}>Subject / Class</p>
                <strong>
                  {classReport.subject} · {classReport.classType}
                </strong>
              </div>

              <div>
                <p style={styles.muted}>Students Present</p>
                <strong>
                  {classReport.presentCount} / {classReport.totalStudents}
                </strong>
              </div>
            </div>

            <div style={{ overflowX: "auto", marginTop: "20px" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {[
                      "ID",
                      "Student Name",
                      "Department",
                      "Semester",
                      "Status",
                    ].map((heading) => (
                      <th key={heading} style={styles.tableHeader}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {classReport.students.map((student) => (
                    <tr key={student.studentId}>
                      <td style={styles.tableCell}>{student.studentId}</td>
                      <td style={styles.tableCell}>{student.name}</td>
                      <td style={styles.tableCell}>
                        {student.department || "—"}
                      </td>
                      <td style={styles.tableCell}>
                        {student.semester ?? "—"}
                      </td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            ...(student.status === "Present"
                              ? styles.presentBadge
                              : styles.notMarkedBadge),
                          }}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {classReport.students.length === 0 && (
                    <tr>
                      <td colSpan={5} style={styles.tableCell}>
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!reportLoading && !classReport && (
          <div style={styles.emptyState}>
            <span style={{ fontSize: "30px" }}>📝</span>
            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
              No session report loaded
            </p>
            <p style={styles.muted}>
              Generate a QR code to load the attendance list for that session.
            </p>
          </div>
        )}
      </section>

      <footer style={styles.footer}>
        Smart College App · Faculty Attendance
      </footer>
    </div>
  );
}

const styles = {
 page: {
  padding: "24px",
  minHeight: "100vh",
  width: "100%",
  boxSizing: "border-box",
  background: "#f5f6fc",
  fontFamily: "Arial, sans-serif",
},
  

  backButton: {
    padding: "10px 14px",
    borderRadius: "9px",
    border: "1px solid #ded9eb",
    background: "#fff",
    color: "#56339a",
    cursor: "pointer",
    fontWeight: "bold",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    margin: "28px 0",
    padding: "25px 28px",
    borderRadius: "18px",
    background: "linear-gradient(120deg, #56339a, #7654bd)",
    color: "#fff",
    boxSizing: "border-box",
  },

  eyebrow: {
    margin: "0 0 9px",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#e4d8ff",
    fontWeight: "bold",
  },

  pageTitle: {
    margin: 0,
    fontSize: "clamp(25px, 3vw, 34px)",
  },

  subtitle: {
    margin: "10px 0 0",
    color: "#eee8ff",
    fontSize: "14px",
    lineHeight: 1.7,
  },

  headerIcon: {
    fontSize: "40px",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.14)",
  },
topGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
  width: "100%",
  alignItems: "start",
},
  card: {
    background: "#fff",
    padding: "clamp(18px, 2.2vw, 28px)",
    borderRadius: "16px",
    marginTop: "20px",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    border: "1px solid #ececf5",
    boxShadow: "0 5px 20px rgba(31,42,75,0.05)",
  },

  sectionHeading: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    marginBottom: "24px",
  },

  iconBox: {
    width: "48px",
    height: "48px",
    flexShrink: 0,
    borderRadius: "13px",
    background: "#f0eafd",
    display: "grid",
    placeItems: "center",
    fontSize: "23px",
  },

  cardTitle: {
    margin: "0 0 6px",
    fontSize: "19px",
    color: "#263f75",
  },

  muted: {
    color: "#788196",
    fontSize: "13px",
    lineHeight: 1.7,
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#48536b",
  },

  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    margin: "0 0 19px",
    borderRadius: "9px",
    border: "1px solid #d8dce8",
    background: "#fff",
    color: "#263653",
  },

  primaryButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    boxSizing: "border-box",
    background: "#56339a",
    color: "#fff",
    padding: "12px 16px",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },

  message: {
    fontSize: "13px",
    lineHeight: 1.6,
    overflowWrap: "anywhere",
  },

qrPanel: {
  marginTop: "16px",
  padding: "14px 10px",
  textAlign: "center",
  background: "#f8f6ff",
  border: "1px solid #e8e0fa",
  borderRadius: "14px",
  overflowWrap: "anywhere",
},


  qrTitle: {
    color: "#263f75",
    fontSize: "16px",
  },

  qrImage: {
  display: "flex",
  justifyContent: "center",
  padding: "8px",
  background: "#fff",
  borderRadius: "12px",
  maxWidth: "fit-content",
  margin: "0 auto",
},

 timer: {
  marginTop: "10px",
  color: "#56339a",
  fontWeight: "bold",
},
  

  expired: {
    color: "#b42318",
    background: "#fff0f0",
    padding: "12px",
    borderRadius: "9px",
    fontSize: "13px",
  },

  studentLabel: {
    padding: "12px 0",
    color: "#788196",
    fontSize: "14px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
    gap: "12px",
    margin: "12px 0 18px",
  },

  statBox: {
    background: "#f8f7fc",
    border: "1px solid #eeebf6",
    padding: "15px",
    borderRadius: "12px",
    minWidth: 0,
  },

  statNumber: {
    margin: "8px 0 0",
    color: "#56339a",
    fontSize: "clamp(22px, 2.5vw, 29px)",
    overflowWrap: "anywhere",
  },

  statTotal: {
    color: "#788196",
    fontSize: "15px",
  },

  progressTrack: {
    height: "9px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#e8e5f0",
    margin: "20px 0",
  },

  progressBar: {
    height: "100%",
    borderRadius: "20px",
    background: "#7654bd",
    transition: "width 0.3s ease",
  },

  tipBox: {
    background: "#f8f6ff",
    border: "1px solid #e9e2fa",
    borderRadius: "12px",
    padding: "16px",
    marginTop: "24px",
    fontSize: "13px",
    lineHeight: 1.7,
    color: "#56339a",
  },

  reportHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },

  reportStats: {
    display: "flex",
    flexWrap: "wrap",
    gap: "35px",
    padding: "15px 0",
    marginTop: "12px",
    borderBottom: "1px solid #ececf5",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
    fontSize: "13px",
  },

  tableHeader: {
    padding: "14px 12px",
    textAlign: "left",
    background: "#f7f5fc",
    color: "#56339a",
    borderBottom: "1px solid #e9e4f3",
    whiteSpace: "nowrap",
  },

  tableCell: {
    padding: "14px 12px",
    textAlign: "left",
    borderBottom: "1px solid #edf0f5",
    color: "#48536b",
  },

  statusBadge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  presentBadge: {
    background: "#e6f7ed",
    color: "#187747",
  },

  notMarkedBadge: {
    background: "#fff2df",
    color: "#946200",
  },

  emptyState: {
    textAlign: "center",
    padding: "30px 12px",
    color: "#788196",
  },

  footer: {
    padding: "25px 0 8px",
    textAlign: "center",
    color: "#9298aa",
    fontSize: "12px",
  },
};

export default FacultyAttendance;
