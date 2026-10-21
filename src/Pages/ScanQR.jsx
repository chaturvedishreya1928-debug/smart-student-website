
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { markAttendance } from "../api/backend";

function ScanQR() {
  const scannerRef = useRef(null);
  const handledRef = useRef(false);

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    if (!scanning) return;

    let scanner;

    const timer = setTimeout(() => {
      try {
        scanner = new Html5QrcodeScanner(
          "student-qr-reader",
          {
            fps: 10,
            qrbox: { width: 220, height: 220 },
            rememberLastUsedCamera: true,
          },
          false
        );

        scannerRef.current = scanner;

        scanner.render(
          async (decodedText) => {
            if (handledRef.current) return;

            handledRef.current = true;
            setStarting(false);
            setScanning(false);
            setMessage("QR scanned! Marking attendance...");

            try {
              await scanner.clear();
              scannerRef.current = null;

              const studentId = sessionStorage.getItem("studentId");

if (!studentId) {
  throw new Error("Student ID nahi mili. Please logout karke student account se dobara login karo.");
}

const data = await markAttendance(Number(studentId), decodedText);

              setResult(data);
              setMessage(
                data.message || "Attendance marked successfully!"
              );
              window.dispatchEvent(new Event("attendanceUpdated"));
            } catch (error) {
              setMessage(
                error.message ||
                  "Attendance could not be marked. Try a valid QR code."
              );
            }
          },
          () => {
            // Ignore normal scan attempts while searching for a QR code.
          }
        );

        setStarting(false);
      } catch (error) {
        setStarting(false);
        setMessage(
          "Could not start the camera. Check browser permissions and try again."
        );
      }
    }, 100);

    return () => {
      clearTimeout(timer);

      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  function scanAgain() {
    handledRef.current = false;
    setResult(null);
    setMessage("");
    setStarting(true);
    setScanning(true);
  }

  return (
    <div className="attendance-page">
      <h1>📷 Scan QR Code</h1>

      <p className="attendance-subtitle">
        Scan your classroom QR code to mark your attendance.
      </p>

      <section
        className="overall-card"
        style={{ maxWidth: "560px", margin: "24px auto" }}
      >
        <h2>Student Attendance Scanner</h2>

        {scanning && (
          <>
            <p>
              Allow camera access when your browser asks for permission.
            </p>

            <div id="student-qr-reader" style={{ width: "100%" }} />

            {starting && <p>Starting camera...</p>}
          </>
        )}

        {message && (
          <p role="status" style={{ overflowWrap: "anywhere" }}>
            {message}
          </p>
        )}

        {result && (
          <div>
            <h3>Attendance Details</h3>
            <p>Subject: {result.subject}</p>
            <p>Class type: {result.classType}</p>
            <p>Student ID: {result.studentId}</p>
            <p>
              Marked at:{" "}
              {result.markedAt
                ? new Date(result.markedAt).toLocaleString()
                : "Just now"}
            </p>
          </div>
        )}

        {!scanning && (
          <button onClick={scanAgain}>
            Scan Another QR Code
          </button>
        )}
      </section>
    </div>
  );
}

export default ScanQR;
