
package com.smartstudent.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository
        extends JpaRepository<UserAccount, Integer> {

    Optional<UserAccount> findByLoginIdIgnoreCase(String loginId);

    boolean existsByLoginIdIgnoreCase(String loginId);

    boolean existsByStudentId(Integer studentId);
}
