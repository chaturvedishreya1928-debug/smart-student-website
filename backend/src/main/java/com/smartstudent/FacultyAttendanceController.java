package com.smartstudent.backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.*;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class FacultyAttendanceController {

    private final StudentRepository studentRepository;
    private final AttendanceSessionRepository sessionRepository;
    private final AttendanceRepository attendanceRepository;

    public FacultyAttendanceController(
            StudentRepository studentRepository,
            AttendanceSessionRepository sessionRepository,
            AttendanceRepository attendanceRepository) {
        this.studentRepository = studentRepository;
        this.sessionRepository = sessionRepository;
        this.attendanceRepository = attendanceRepository;
    }

    @GetMapping("/sessions/{sessionId}/attendance")
    public Map<String, Object> getSessionAttendance(
            @PathVariable Integer sessionId) {

        AttendanceSession session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Attendance session not found"
            ));

        List<Map<String, Object>> students = new ArrayList<>();

        studentRepository.findAll().forEach(student -> {
            boolean present =
                attendanceRepository.existsByStudent_IdAndSession_Id(
                    student.getId(), session.getId()
                );

            Map<String, Object> row = new LinkedHashMap<>();
            row.put("studentId", student.getId());
            row.put("name", student.getName());
            row.put("email", student.getEmail());
            row.put("department", student.getDepartment());
            row.put("semester", student.getSemester());
            row.put("status", present ? "Present" : "Not Marked");

            students.add(row);
        });

        long presentCount = students.stream()
            .filter(s -> "Present".equals(s.get("status")))
            .count();

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("sessionId", session.getId());
        response.put("subject", session.getSubject());
        response.put("classType", session.getClassType());
        response.put("totalStudents", students.size());
        response.put("presentCount", presentCount);
        response.put("students", students);

        return response;
    }
}