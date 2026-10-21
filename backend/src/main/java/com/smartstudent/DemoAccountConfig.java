
package com.smartstudent.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DemoAccountConfig {

    @Bean
    CommandLineRunner createDemoAccounts(
            UserAccountRepository userRepository,
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder,
            @Value("${DEMO_STUDENT_PASSWORD:}") String studentPassword,
            @Value("${DEMO_FACULTY_PASSWORD:}") String facultyPassword) {

        return args -> {

            if (studentPassword.isBlank() || facultyPassword.isBlank()) {
                System.out.println(
                    "Demo accounts not created: set DEMO_STUDENT_PASSWORD and DEMO_FACULTY_PASSWORD."
                );
                return;
            }

            String[] studentEmails = {
                "aarav.demo@example.com",
                "priya.demo@example.com",
                "riya.demo@example.com",
                "aditya.demo@example.com",
                "sneha.demo@example.com"
            };

            for (int i = 0; i < studentEmails.length; i++) {
                String email = studentEmails[i];
                int studentId = i + 1;

                if (!studentRepository.existsById(studentId)) {
                    System.out.println(
                        "Student record missing for ID " + studentId
                    );
                    continue;
                }

                if (!userRepository.existsByLoginIdIgnoreCase(email)
                        && !userRepository.existsByStudentId(studentId)) {

                    UserAccount user = new UserAccount();
                    user.setLoginId(email);
                    user.setPasswordHash(
                        passwordEncoder.encode(studentPassword)
                    );
                    user.setRole("Student");
                    user.setStudentId(studentId);

                    userRepository.save(user);
                    System.out.println("Created student account: " + email);
                }
            }

            String facultyEmail = "faculty.demo@example.com";

            if (!userRepository.existsByLoginIdIgnoreCase(facultyEmail)) {
                UserAccount faculty = new UserAccount();
                faculty.setLoginId(facultyEmail);
                faculty.setPasswordHash(
                    passwordEncoder.encode(facultyPassword)
                );
                faculty.setRole("Faculty");
                faculty.setStudentId(null);

                userRepository.save(faculty);
                System.out.println("Created faculty account: " + facultyEmail);
            }
        };
    }
}
