
package com.smartstudent.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class HomeController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of(
            "message", "Smart Student Website Backend is running!",
            "status", "success"
        );
    }

    @GetMapping("/api/dashboard")
    public Map<String, Object> dashboard() {
        return Map.of(
            "studentName", "Student",
            "totalClasses", 40,
            "attendedClasses", 34,
            "attendancePercentage", 85,
            "pendingAssignments", 3,
            "dueTomorrow", 1,
            "dueThisWeek", 2,
            "totalSubjects", 7,
            "totalNotices", 5
        );
    }
}
