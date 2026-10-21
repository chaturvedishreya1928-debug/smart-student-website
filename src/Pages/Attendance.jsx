
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  createAttendanceSession,
  markAttendance,
  getAttendanceSummary,
} from "../api/backend";

function Attendance() {
  const subjects = ["DBMS", "ADSA", "AMT", "AT", "FSJP", "EDE", "EVS"];

  const [subject, setSubject] = useState("DBMS");
  const [classType, setClassType] = useState("Theory");
  const [session, setSession] = useState(null);
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSummary() {
    try {
      const data = await getAttendanceSummary(1);
      setSummary(data);
    } catch (error) {
      setMessage(error.message || "Could not load attendance summary.");
    }
  }

 useEffect(() => {
  loadSummary();

  window.addEventListener("attendanceUpdated", loadSummary);

  return () => {
    window.removeEventListener("attendanceUpdated", loadSummary);
  };
}, []);

  async function generateQR() {
    setLoading(true);
    setMessage("");
    setSession(null);

    try {
      const data = await createAttendanceSession(subject, classType);
      setSession(data);
      setMessage("QR code generated successfully!");
    } catch (error) {
      setMessage(error.message || "Could not generate QR code.");
    } finally {
      setLoading(false);
    }
  }

  async function markDemoAttendance() {
    if (!session?.qrToken) return;

    setLoading(true);
    setMessage("");

    try {
      const result = await markAttendance(1, session.qrToken);
      setMessage(result.message || "Attendance marked successfully!");
      await loadSummary();
    } catch (error) {
      setMessage(error.message || "Could not mark attendance.");
    } finally {
      setLoading(false);
    }
  }

  const overallPercentage = summary?.overallPercentage ?? 0;

  return (
    <div className="attendance-page">
      <h1>📊 Attendance</h1>
      <p className="attendance-subtitle">
        Track attendance and generate QR codes for classes.
      </p>

      <section className="overall-card">
        <h2>Overall Attendance</h2>
        <div className="overall-number">{overallPercentage}%</div>

        <p>
          Classes attended: {summary?.attendedClasses ?? 0}/
          {summary?.totalClasses ?? 0}
        </p>

        <div className="attendance-progress">
          <div
            className="attendance-progress-fill"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>

        <p className={overallPercentage >= 75 ? "safe" : "low"}>
          {overallPercentage >= 75
            ? "✅ Attendance is safe"
            : "⚠️ Attendance is below 75%"}
        </p>
      </section>

      <section className="overall-card">
        <h2>QR Attendance System</h2>
        <p>Select the subject and class type to generate a QR code.</p>

        <label htmlFor="attendance-subject">Subject</label>{" "}
        <select
          id="attendance-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label htmlFor="attendance-type">Class type</label>{" "}
        <select
          id="attendance-type"
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
        >
          <option value="Theory">Theory</option>
          <option value="Practical">Practical</option>
        </select>

        <br />
        <br />

        <button onClick={generateQR} disabled={loading}>
          {loading ? "Please wait..." : "Generate QR Code"}
        </button>

        {message && <p role="status">{message}</p>}

        {session && (
          <div style={{ marginTop: "20px" }}>
            <h3>{session.subject} — {session.classType}</h3>
            <p>Scan this QR code to mark attendance.</p>

            <QRCodeSVG
              value={session.qrToken}
              size={220}
              level="M"
              includeMargin
            />

            <p>
              <strong>Expires at:</strong>{" "}
              {new Date(session.expiresAt).toLocaleTimeString()}
            </p>

            <button onClick={markDemoAttendance} disabled={loading}>
              Mark Attendance (Demo Student)
            </button>
          </div>
        )}
      </section>

      <h2 className="subject-heading">Subject-wise Attendance</h2>

      {!summary && <p>Loading attendance data...</p>}

      {summary && summary.subjects?.length === 0 && (
        <p>No attendance records are available yet.</p>
      )}

      <div className="attendance-list">
        {summary?.subjects?.map((item) => (
          <div
            className="attendance-item"
            key={`${item.subject}-${item.classType}`}
          >
            <div style={{ width: "100%" }}>
              <h3>{item.subject}</h3>
              <p>
                {item.classType} · {item.attendedClasses}/
                {item.totalClasses} classes attended
              </p>
              <p>
                <strong>{Number(item.percentage).toFixed(1)}%</strong>
              </p>

              <div className="attendance-progress">
                <div
                  className="attendance-progress-fill"
                  style={{
                    width: `${Math.min(100, Math.max(0, Number(item.percentage)))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={loadSummary}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        Refresh Attendance
      </button>
    </div>
  );
}

export default Attendance;
