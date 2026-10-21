
import React from "react";
import { useNavigate } from "react-router-dom";

function FacultyDashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: "📷",
      title: "Generate QR",
      description:
        "Create a secure classroom QR code for student attendance.",
      button: "Generate QR Code",
      path: "/faculty-attendance",
      tag: "ATTENDANCE",
    },
    {
      icon: "📊",
      title: "Attendance Overview",
      description:
        "View attendance records and check which students are present.",
      button: "View Attendance",
      path: "/faculty-attendance",
      tag: "REPORTS",
    },
    {
      icon: "📚",
      title: "Student Progress",
      description:
        "Explore overall attendance and subject-wise student progress.",
      button: "View Progress",
      path: "/student-progress",
      tag: "ANALYTICS",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Top navigation */}
      <header style={styles.navbar}>
        <div style={styles.brand}>
          <div style={styles.logo}>SC</div>
          <div>
            <h2 style={styles.brandName}>Smart College</h2>
            <p style={styles.brandSubtitle}>FACULTY PORTAL</p>
          </div>
        </div>

        <button
          style={styles.logoutButton}
          onClick={() => navigate("/login")}
        >
          <span>↪</span> Logout
        </button>
      </header>

      <main style={styles.main}>
        {/* Welcome section */}
        <section style={styles.hero}>
          <div>
            <p style={styles.eyebrow}>FACULTY WORKSPACE</p>
            <h1 style={styles.heading}>
              Welcome to your Dashboard <span>👋</span>
            </h1>
            <p style={styles.subtitle}>
              Manage classroom attendance and monitor student progress
              from one place.
            </p>
          </div>

          <div style={styles.heroIcon}>🎓</div>
        </section>

        {/* Section heading */}
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Your Workspace</h2>
            <p style={styles.sectionSubtitle}>
              Choose an action to get started.
            </p>
          </div>
          <span style={styles.liveBadge}>
            <span style={styles.statusDot} />
            Dashboard
          </span>
        </div>

        {/* Action cards */}
        <div style={styles.grid}>
          {actions.map((item, index) => (
            <section
              key={item.title}
              style={{
                ...styles.card,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div style={styles.cardTop}>
                <div style={styles.iconBox}>{item.icon}</div>
                <span style={styles.tag}>{item.tag}</span>
              </div>

              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDescription}>{item.description}</p>

              <button
                style={styles.primaryButton}
                onClick={() => navigate(item.path)}
              >
                {item.button}
                <span style={styles.arrow}>→</span>
              </button>
            </section>
          ))}
        </div>

        {/* Information panel */}
        <section style={styles.infoPanel}>
          <div style={styles.infoIcon}>💡</div>
          <div>
            <h3 style={styles.infoTitle}>Quick Tip</h3>
            <p style={styles.infoText}>
              Generate a classroom QR code before class starts. Students
              can scan it to mark their attendance while the code is valid.
            </p>
          </div>
        </section>

        <footer style={styles.footer}>
          Smart College App <span>•</span> Faculty Workspace
        </footer>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6fc",
    fontFamily: "Arial, sans-serif",
    color: "#263653",
  },
  navbar: {
    minHeight: "76px",
    padding: "14px 5%",
    background: "#ffffff",
    borderBottom: "1px solid #e8eaf3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    width: "44px",
    height: "44px",
    borderRadius: "13px",
    background: "#56339a",
    color: "#ffffff",
    display: "grid",
    placeItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  brandName: {
    margin: 0,
    fontSize: "19px",
    color: "#263f75",
  },
  brandSubtitle: {
    margin: "4px 0 0",
    fontSize: "10px",
    letterSpacing: "1.5px",
    color: "#7b8196",
    fontWeight: "bold",
  },
  logoutButton: {
    background: "#ffffff",
    color: "#56339a",
    border: "1px solid #ded5f0",
    borderRadius: "9px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  main: {
    maxWidth: "1250px",
    width: "90%",
    margin: "0 auto",
    padding: "38px 0 24px",
    boxSizing: "border-box",
  },
  hero: {
    background: "linear-gradient(120deg, #56339a, #7654bd)",
    color: "#ffffff",
    borderRadius: "20px",
    padding: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    boxShadow: "0 10px 30px rgba(86,51,154,0.16)",
    boxSizing: "border-box",
  },
  eyebrow: {
    margin: "0 0 12px",
    color: "#e4d8ff",
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: "bold",
  },
  heading: {
    margin: 0,
    fontSize: "clamp(23px, 3vw, 34px)",
    lineHeight: 1.3,
  },
  subtitle: {
    margin: "12px 0 0",
    color: "#eee8ff",
    fontSize: "14px",
    lineHeight: 1.8,
    maxWidth: "600px",
  },
  heroIcon: {
    width: "90px",
    height: "90px",
    minWidth: "90px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.14)",
    display: "grid",
    placeItems: "center",
    fontSize: "43px",
  },
  sectionHeader: {
    margin: "35px 0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "23px",
    color: "#263f75",
  },
  sectionSubtitle: {
    margin: "8px 0 0",
    color: "#777f94",
    fontSize: "14px",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#ffffff",
    border: "1px solid #e6e1f2",
    color: "#56339a",
    borderRadius: "30px",
    padding: "9px 13px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#7654bd",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
    gap: "22px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #ececf5",
    borderRadius: "17px",
    padding: "25px",
    boxShadow: "0 5px 20px rgba(31,42,75,0.045)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    boxSizing: "border-box",
    minWidth: 0,
  },
  cardTop: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "22px",
  },
  iconBox: {
    width: "55px",
    height: "55px",
    background: "#f0eafd",
    borderRadius: "15px",
    display: "grid",
    placeItems: "center",
    fontSize: "27px",
  },
  tag: {
    color: "#7654bd",
    background: "#f7f3ff",
    borderRadius: "6px",
    padding: "7px 9px",
    fontSize: "10px",
    letterSpacing: "0.6px",
    fontWeight: "bold",
  },
  cardTitle: {
    margin: "0 0 10px",
    color: "#263f75",
    fontSize: "19px",
  },
  cardDescription: {
    color: "#777f94",
    fontSize: "13px",
    lineHeight: 1.8,
    margin: "0 0 24px",
    flex: 1,
  },
  primaryButton: {
    width: "100%",
    background: "#56339a",
    color: "#ffffff",
    border: "none",
    borderRadius: "9px",
    padding: "13px 15px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },
  arrow: {
    fontSize: "19px",
  },
  infoPanel: {
    marginTop: "27px",
    background: "#ffffff",
    border: "1px solid #e9e4f5",
    borderRadius: "15px",
    padding: "21px",
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    boxSizing: "border-box",
  },
  infoIcon: {
    fontSize: "24px",
    background: "#f0eafd",
    borderRadius: "10px",
    padding: "10px",
  },
  infoTitle: {
    margin: "0 0 7px",
    color: "#263f75",
    fontSize: "15px",
  },
  infoText: {
    margin: 0,
    color: "#777f94",
    fontSize: "13px",
    lineHeight: 1.8,
  },
  footer: {
    padding: "28px 0 10px",
    textAlign: "center",
    fontSize: "12px",
    color: "#9298aa",
  },
};

export default FacultyDashboard;
