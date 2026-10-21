
package com.smartstudent.backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class AttendanceSummaryController {

    private final AttendanceSessionRepository sessionRepository;
    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    public AttendanceSummaryController(
            AttendanceSessionRepository sessionRepository,
            AttendanceRepository attendanceRepository,
            StudentRepository studentRepository) {
        this.sessionRepository = sessionRepository;
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping("/summary/{studentId}")
    public Map<String, Object> getSummary(
            @PathVariable Integer studentId) {

        if (!studentRepository.existsById(studentId)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Student not found"
            );
        }

        LocalDateTime now = LocalDateTime.now();

       List<AttendanceSession> sessions =
    sessionRepository.findAll();
        Map<String, Map<String, Integer>> grouped = new LinkedHashMap<>();

        for (AttendanceSession session : sessions) {
            String key = session.getSubject() + "|" + session.getClassType();

            grouped.putIfAbsent(key, new HashMap<>());

            Map<String, Integer> counts = grouped.get(key);
            counts.put("totalClasses", counts.getOrDefault("totalClasses", 0) + 1);

            if (attendanceRepository.existsByStudent_IdAndSession_Id(
                    studentId, session.getId())) {
                counts.put("attendedClasses",
                    counts.getOrDefault("attendedClasses", 0) + 1);
            } else {
                counts.putIfAbsent("attendedClasses", 0);
            }
        }

        List<Map<String, Object>> subjects = new ArrayList<>();
        int totalClasses = 0;
        int totalAttended = 0;

        for (Map.Entry<String, Map<String, Integer>> entry : grouped.entrySet()) {
            String[] parts = entry.getKey().split("\\|", 2);
            Map<String, Integer> counts = entry.getValue();

            int total = counts.getOrDefault("totalClasses", 0);
            int attended = counts.getOrDefault("attendedClasses", 0);
            double percentage = total == 0
                ? 0.0 : Math.round(attended * 10000.0 / total) / 100.0;

            Map<String, Object> item = new LinkedHashMap<>();
            item.put("subject", parts[0]);
            item.put("classType", parts[1]);
            item.put("totalClasses", total);
            item.put("attendedClasses", attended);
            item.put("percentage", percentage);

            subjects.add(item);

            totalClasses += total;
            totalAttended += attended;
        }

        double overallPercentage = totalClasses == 0
            ? 0.0 : Math.round(totalAttended * 10000.0 / totalClasses) / 100.0;

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("studentId", studentId);
        response.put("totalClasses", totalClasses);
        response.put("attendedClasses", totalAttended);
        response.put("overallPercentage", overallPercentage);
        response.put("subjects", subjects);

        return response;
    }
}
