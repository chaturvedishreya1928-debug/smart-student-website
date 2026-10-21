
package com.smartstudent.backend;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final AttendanceSessionRepository sessionRepository;
    private final StudentRepository studentRepository;

    public AttendanceController(
            AttendanceRepository attendanceRepository,
            AttendanceSessionRepository sessionRepository,
            StudentRepository studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.sessionRepository = sessionRepository;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/mark")
    public Map<String, Object> markAttendance(
            @RequestBody Map<String, Object> request) {

        Object studentIdValue = request.get("studentId");
        Object qrTokenValue = request.get("qrToken");

        if (studentIdValue == null || qrTokenValue == null
                || qrTokenValue.toString().isBlank()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "studentId and qrToken are required"
            );
        }

        Integer studentId;
        try {
            studentId = Integer.valueOf(studentIdValue.toString());
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Invalid studentId"
            );
        }

        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Student not found"
            ));

        AttendanceSession session = sessionRepository
            .findByQrToken(qrTokenValue.toString())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Invalid QR code"
            ));

        if (!session.isActive()
                || !session.getExpiresAt().isAfter(LocalDateTime.now())) {
            throw new ResponseStatusException(
                HttpStatus.GONE, "This QR code has expired"
            );
        }

        if (attendanceRepository.existsByStudent_IdAndSession_Id(
                studentId, session.getId())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Attendance already marked for this session"
            );
        }

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setSession(session);
        attendance.setMarkedAt(LocalDateTime.now());

        try {
            Attendance saved = attendanceRepository.saveAndFlush(attendance);

            return Map.of(
                "message", "Attendance marked successfully",
                "attendanceId", saved.getId(),
                "studentId", studentId,
                "sessionId", session.getId(),
                "subject", session.getSubject(),
                "classType", session.getClassType(),
                "markedAt", saved.getMarkedAt().toString()
            );
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Attendance already marked for this session"
            );
        }
    }
}
