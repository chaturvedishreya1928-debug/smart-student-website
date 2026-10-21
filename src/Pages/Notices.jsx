import React, { useState } from "react";

function Notices() {
  const [notices, setNotices] = useState([
    {
      title: "Internal Examination Schedule",
      date: "20 September 2026",
      category: "Examination",
      message:
        "The internal examination schedule will be announced soon. Students are advised to check the college updates regularly.",
      important: true,
    },
    {
      title: "Assignment Submission Reminder",
      date: "19 September 2026",
      category: "Academic",
      message:
        "Students are requested to complete and submit their pending assignments before the respective deadlines.",
      important: true,
    },
    {
      title: "College Event Announcement",
      date: "18 September 2026",
      category: "Event",
      message:
        "Students can check the upcoming college events and participate according to their interests.",
      important: false,
    },
    {
      title: "Attendance Reminder",
      date: "17 September 2026",
      category: "Important",
      message:
        "Students are advised to maintain the required attendance percentage for all subjects.",
      important: true,
    },
    {
      title: "Library Timing Update",
      date: "16 September 2026",
      category: "General",
      message:
        "Students can check the updated library timings from the college administration.",
      important: false,
    },
  ]);

  const [readNotices, setReadNotices] = useState([]);

  const markAsRead = (index) => {
    if (!readNotices.includes(index)) {
      setReadNotices([...readNotices, index]);
    }
  };

  const unreadCount = notices.length - readNotices.length;

  const importantCount = notices.filter(
    (notice) => notice.important
  ).length;

  return (
    <div className="notices-page">

      <h1>📢 College Notices</h1>

      <p className="notices-subtitle">
        Latest announcements and important updates
      </p>

      {/* SUMMARY */}
      <div className="notice-summary">

        <div className="notice-summary-card">
          <span>📢</span>
          <h3>Total Notices</h3>
          <strong>{notices.length}</strong>
        </div>

        <div className="notice-summary-card">
          <span>🔔</span>
          <h3>Unread</h3>
          <strong>{unreadCount}</strong>
        </div>

        <div className="notice-summary-card">
          <span>⚠️</span>
          <h3>Important</h3>
          <strong>{importantCount}</strong>
        </div>

      </div>

      <h2 className="notice-section-title">
        Latest Updates
      </h2>

      {/* NOTICE LIST */}
      <div className="notice-list">

        {notices.map((notice, index) => {

          const isRead = readNotices.includes(index);

          return (
            <div
              className={`notice-card ${
                notice.important
                  ? "important-notice"
                  : ""
              } ${
                isRead
                  ? "read-notice"
                  : ""
              }`}
              key={index}
            >

              <div className="notice-top">

                <span className="notice-category">
                  {notice.category}
                </span>

                <span className="notice-date">
                  📅 {notice.date}
                </span>

              </div>

              <h2>{notice.title}</h2>

              <p>{notice.message}</p>

              <div className="notice-bottom">

                {notice.important && (
                  <span className="important-label">
                    ⚠️ Important
                  </span>
                )}

                {isRead ? (
                  <span className="read-label">
                    ✅ Read
                  </span>
                ) : (
                  <button
                    className="read-notice-button"
                    onClick={() => markAsRead(index)}
                  >
                    ✓ Mark as Read
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Notices;