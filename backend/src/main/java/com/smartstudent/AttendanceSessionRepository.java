
package com.smartstudent.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AttendanceSessionRepository
        extends JpaRepository<AttendanceSession, Integer> {

    Optional<AttendanceSession> findByQrToken(String qrToken);

    List<AttendanceSession> findByExpiresAtBefore(
        LocalDateTime time
    );
}
