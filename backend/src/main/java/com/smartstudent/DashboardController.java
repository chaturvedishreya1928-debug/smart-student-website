
package com.smartstudent.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://smart-student-website.vercel.app"
})
public class DashboardController {

    @GetMapping
    public Map<String, Object> getDashboardData() {
        return Map.of(
            "message", "Dashboard data loaded successfully",
            "status", "success"
        );
    }
}
