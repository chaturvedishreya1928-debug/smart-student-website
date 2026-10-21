
import { useState } from "react";
import "../App.css";

const timetable = {
  Monday: [
    { time: "9:00–10:00", subject: "AMT", faculty: "Dr. Suresh Pathak (SP)", type: "Lecture" },
    { time: "10:00–11:00", practical: true, batches: {
      B1: { subject: "DBMS", faculty: "Mrs. Suwarna Thakre (ST)", lab: "L5" },
    }},
    { time: "11:00–12:00", practical: true, batches: {
      B2: { subject: "ADSA", faculty: "Mr. Hasan Phudinawala (HP)", lab: "CC1" },
      B3: { subject: "EDE", faculty: "Mr. Sumit Parmar (SUP)", lab: "Room 124" },
    }},
    { time: "12:00–12:30", subject: "Lunch Break", type: "Break" },
    { time: "12:30–1:30", subject: "FSJP", faculty: "Ms. Kavita Dhiwar (KD)", type: "Lecture" },
    { time: "1:30–2:30", subject: "DBMS", faculty: "Mrs. Suwarna Thakre (ST)", type: "Lecture" },
    { time: "2:30–2:45", subject: "Short Break", type: "Break" },
  ],

  Tuesday: [
    { time: "9:00–10:00", subject: "ADSA", faculty: "Mr. Hasan Phudinawala (HP)", type: "Lecture" },
    { time: "10:00–11:00", practical: true, batches: {
      B1: { subject: "EDE", faculty: "Mr. Sumit Parmar (SUP)", lab: "Room 124" },
    }},
    { time: "11:00–12:00", practical: true, batches: {
      B2: { subject: "DBMS", faculty: "Mrs. Suwarna Thakre (ST)", lab: "L5" },
      B3: { subject: "EVS", faculty: "Ms. Kiran Patil (KP)", lab: "CC1" },
    }},
    { time: "12:00–12:30", subject: "Lunch Break", type: "Break" },
    { time: "12:30–1:30", subject: "FSJP", faculty: "Ms. Kavita Dhiwar (KD)", type: "Lecture" },
    { time: "1:30–2:30", subject: "EVS", faculty: "Ms. Kiran Patil (KP)", type: "Lecture" },
    { time: "2:30–2:45", subject: "Short Break", type: "Break" },
    { time: "2:45–3:45", subject: "OE", faculty: "Ms. Kavita Dhiwar (KD)", type: "Lecture" },
  ],

  Wednesday: [
    { time: "9:00–10:00", subject: "AMT", faculty: "Dr. Suresh Pathak (SP)", type: "Lecture" },
    { time: "10:00–11:00", practical: true, batches: {
      B2: { subject: "EDE", faculty: "Mr. Sumit Parmar (SUP)", lab: "Room 124" },
    }},
    { time: "11:00–12:00", practical: true, batches: {
      B1: { subject: "ADSA", faculty: "Mr. Hasan Phudinawala (HP)", lab: "CC1" },
      B3: { subject: "Mini Project", faculty: "Ms. Kavita Dhiwar (KD)", lab: "L5" },
    }},
    { time: "12:00–12:30", subject: "Lunch Break", type: "Break" },
    { time: "12:30–1:30", subject: "DBMS", faculty: "Mrs. Suwarna Thakre (ST)", type: "Lecture" },
    { time: "1:30–2:30", subject: "AT", faculty: "Mr. Sumit Parmar (SUP)", type: "Lecture" },
    { time: "2:30–2:45", subject: "Short Break", type: "Break" },
    { time: "2:45–3:45", subject: "AMT", faculty: "Dr. Suresh Pathak (SP)", type: "Lecture" },
    { time: "3:45–4:45", subject: "EDE", faculty: "Dr. Pranav Nage (PN)", type: "Lecture" },
  ],

  Thursday: [
    { time: "9:00–10:00", subject: "AT", faculty: "Mr. Sumit Parmar (SUP)", type: "Lecture" },
    { time: "10:00–11:00", practical: true, batches: {
      B1: { subject: "EVS", faculty: "Ms. Kiran Patil (KP)", lab: "Room 124" },
    }},
    { time: "11:00–12:00", practical: true, batches: {
      B2: { subject: "Mini Project", faculty: "Ms. Kavita Dhiwar (KD)", lab: "L4" },
      B3: { subject: "DBMS", faculty: "Mrs. Suwarna Thakre (ST)", lab: "L5" },
    }},
    { time: "12:00–12:30", subject: "Lunch Break", type: "Break" },
    { time: "12:30–1:30", subject: "ADSA", faculty: "Mr. Hasan Phudinawala (HP)", type: "Lecture" },
    { time: "1:30–2:30", subject: "DBMS", faculty: "Mrs. Suwarna Thakre (ST)", type: "Lecture" },
    { time: "2:30–2:45", subject: "Short Break", type: "Break" },
    { time: "2:45–3:45", subject: "EDE", faculty: "Dr. Pranav Nage (PN)", type: "Lecture" },
    { time: "3:45–4:45", subject: "AMT", faculty: "Dr. Suresh Pathak (SP)", type: "Tutorial", batches: ["B1", "B2"] },
  ],

  Friday: [
    { time: "9:00–10:00", subject: "AT", faculty: "Mr. Sumit Parmar (SUP)", type: "Lecture" },
    { time: "10:00–11:00", practical: true, batches: {
      B3: { subject: "ADSA", faculty: "Mr. Hasan Phudinawala (HP)", lab: "CC1" },
    }},
    { time: "11:00–12:00", practical: true, batches: {
      B1: { subject: "Mini Project", faculty: "Ms. Kavita Dhiwar (KD)", lab: "L4" },
      B2: { subject: "EVS", faculty: "Ms. Kiran Patil (KP)", lab: "L5" },
    }},
    { time: "12:00–12:30", subject: "Lunch Break", type: "Break" },
    { time: "12:30–1:30", subject: "ADSA", faculty: "Mr. Hasan Phudinawala (HP)", type: "Lecture" },
    { time: "1:30–2:30", subject: "EVS", faculty: "Ms. Kiran Patil (KP)", type: "Lecture" },
    { time: "2:30–2:45", subject: "Short Break", type: "Break" },
    { time: "2:45–3:45", subject: "OE", faculty: "Ms. Kavita Dhiwar (KD)", type: "Lecture" },
  ],

  Saturday: [],
};

const days = Object.keys(timetable);

function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedBatch, setSelectedBatch] = useState("B1");

  const classes = timetable[selectedDay];

  return (
    <div className="timetable-page">
      <div className="timetable-header">
        <h1>Weekly Timetable 📚</h1>
        <p>SEIT · Division A · Semester III · A.Y. 2026–2027</p>
      </div>

      <div className="timetable-filters">
        <div>
          <label htmlFor="day-select">Select Day</label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="batch-select">Select Batch</label>
          <select
            id="batch-select"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="B1">Batch B1</option>
            <option value="B2">Batch B2</option>
            <option value="B3">Batch B3</option>
          </select>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="no-classes">
          <h2>🎉 No Classes Today!</h2>
          <p>Enjoy your Saturday.</p>
        </div>
      ) : (
        <div className="timetable-list">
          {classes.map((item) => {
            let subject = item.subject;
            let faculty = item.faculty;
            let lab = "";
            let type = item.type || "Lecture";

            if (item.practical) {
              const detail = item.batches[selectedBatch];

              if (!detail) return null;

              subject = detail.subject;
              faculty = detail.faculty;
              lab = detail.lab;
              type = "Practical / Lab";
            }

            if (item.type === "Tutorial") {
              if (!item.batches.includes(selectedBatch)) return null;
              type = `${selectedBatch} · Tutorial`;
            }

            return (
              <div
                className={`timetable-item ${
                  item.type === "Break" ? "break-item" : ""
                }`}
                key={item.time}
              >
                <div className="timetable-time">{item.time}</div>
                <div className="timetable-subject">
                  <h3>{subject}</h3>
                  <p>{type}</p>
                  {faculty && <p>Faculty: {faculty}</p>}
                  {lab && <p>Location: {lab}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Timetable;
