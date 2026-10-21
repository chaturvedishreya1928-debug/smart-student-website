
package com.smartstudent.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://smart-student-website.vercel.app"
})
public class AuthController {

    private final UserAccountRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserAccountRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {

        if (request.loginId == null || request.password == null
                || request.role == null) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Please enter all login details"
            );
        }

        UserAccount user = userRepository
            .findByLoginIdIgnoreCase(request.loginId.trim())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Invalid login ID or password"
            ));

        if (!passwordEncoder.matches(
                request.password, user.getPasswordHash())) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Invalid login ID or password"
            );
        }

        if (!user.getRole().equalsIgnoreCase(request.role)) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Selected role does not match account"
            );
        }

        return Map.of(
            "loginId", user.getLoginId(),
            "role", user.getRole(),
            "studentId", user.getStudentId() == null ? 0 : user.getStudentId()
        );
    }

    public static class LoginRequest {
        public String loginId;
        public String password;
        public String role;
    }
}
