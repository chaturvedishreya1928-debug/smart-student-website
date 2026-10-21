
package com.smartstudent.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance/sessions")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class AttendanceSessionController {

    private final AttendanceSessionRepository sessionRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    public AttendanceSessionController(
            AttendanceSessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createSession(
            @RequestBody Map<String, String> request) {

        String subject = request.get("subject");
        String classType = request.get("classType");

        if (subject == null || subject.isBlank()
                || classType == null || classType.isBlank()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Subject and classType are required"
            );
        }

        if (!classType.equalsIgnoreCase("Theory")
                && !classType.equalsIgnoreCase("Practical")) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "classType must be Theory or Practical"
            );
        }

        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);

        AttendanceSession session = new AttendanceSession();
        session.setSubject(subject.trim());
        session.setClassType(
            classType.substring(0, 1).toUpperCase()
                + classType.substring(1).toLowerCase()
        );
        session.setSessionDate(LocalDate.now());
        session.setQrToken(
            Base64.getUrlEncoder().withoutPadding()
                .encodeToString(randomBytes)
        );
        session.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        session.setActive(true);

        AttendanceSession saved = sessionRepository.save(session);

        return Map.of(
            "id", saved.getId(),
            "subject", saved.getSubject(),
            "classType", saved.getClassType(),
            "sessionDate", saved.getSessionDate().toString(),
            "qrToken", saved.getQrToken(),
            "expiresAt", saved.getExpiresAt().toString(),
            "active", saved.isActive()
        );
    }

    @GetMapping("/{id}")
    public Map<String, Object> getSession(@PathVariable Integer id) {
        AttendanceSession session = sessionRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Session not found"
            ));

        boolean currentlyValid = session.isActive()
            && session.getExpiresAt().isAfter(LocalDateTime.now());

        return Map.of(
            "id", session.getId(),
            "subject", session.getSubject(),
            "classType", session.getClassType(),
            "sessionDate", session.getSessionDate().toString(),
            "qrToken", session.getQrToken(),
            "expiresAt", session.getExpiresAt().toString(),
            "active", currentlyValid
        );
    }
}
