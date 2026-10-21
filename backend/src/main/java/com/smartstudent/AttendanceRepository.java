
package com.smartstudent.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    boolean existsByStudent_IdAndSession_Id(
        Integer studentId,
        Integer sessionId
    );

    Optional<Attendance> findByStudent_IdAndSession_Id(
        Integer studentId,
        Integer sessionId
    );
}
