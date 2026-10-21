
const API_BASE_URL = "https://smart-college-website.onrender.com";

export async function checkBackend() {
  const response = await fetch(`${API_BASE_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
}

export async function getDashboardData() {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`);

  if (!response.ok) {
    throw new Error("Dashboard request failed");
  }

  return response.json();
}

// Get all students from MySQL through Spring Boot
export async function getStudents() {
  const response = await fetch(`${API_BASE_URL}/api/students`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}

// Add a new student to MySQL
export async function addStudent(student) {
  const response = await fetch(`${API_BASE_URL}/api/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to add student");
  }

  return response.json();
}

// Get one student by ID
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE_URL}/api/students/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }

  return response.json();
}

export async function createAttendanceSession(subject, classType) {
  const response = await fetch(`${API_BASE_URL}/api/attendance/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, classType }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not create QR session");
  }
  return data;
}

export async function markAttendance(studentId, qrToken) {
  const response = await fetch(`${API_BASE_URL}/api/attendance/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, qrToken }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not mark attendance");
  }
  return data;
}

export async function getAttendanceSummary(studentId) {
  const response = await fetch(
    `${API_BASE_URL}/api/attendance/summary/${studentId}`
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not load attendance summary");
  }
  return data;
}
export async function getFacultySessionAttendance(sessionId) {
  const response = await fetch(
    `${API_BASE_URL}/api/faculty/sessions/${sessionId}/attendance`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not load student attendance");
  }

  return data;
}