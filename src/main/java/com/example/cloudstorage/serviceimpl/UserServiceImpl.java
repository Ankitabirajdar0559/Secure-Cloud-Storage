package com.example.cloudstorage.serviceimpl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.cloudstorage.entity.Role;
import com.example.cloudstorage.entity.User;
import com.example.cloudstorage.repository.UserRepository;
import com.example.cloudstorage.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ==========================
    // Register User
    // ==========================

    @Override
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException(
                    "Email already registered."
            );
        }

        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }

        user.setEnabled(true);

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(user);
    }

    // ==========================
    // Get User By Email
    // ==========================

    @Override
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found."
                        )
                );
    }

    // ==========================
    // Get User By ID
    // ==========================

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found."
                        )
                );
    }

    // ==========================
    // Update Profile
    // ==========================

    @Override
    public User updateProfile(
            String email,
            User updatedUser) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found."
                                )
                        );

        user.setName(
                updatedUser.getName()
        );

        if (updatedUser.getProfileImage() != null) {

            user.setProfileImage(
                    updatedUser.getProfileImage()
            );
        }

        return userRepository.save(user);
    }

    // ==========================
    // Change Password
    // ==========================

    @Override
    public void changePassword(
            String email,
            String oldPassword,
            String newPassword) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found."
                                )
                        );

        if (!passwordEncoder.matches(
                oldPassword,
                user.getPassword())) {

            throw new RuntimeException(
                    "Current password is incorrect."
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );

        userRepository.save(user);
    }

    // ==========================
    // Update Last Login
    // ==========================

    @Override
    public void updateLastLogin(
            String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found."
                                )
                        );

        user.setLastLogin(
                LocalDateTime.now()
        );

        userRepository.save(user);
    }
}