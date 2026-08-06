package com.example.cloudstorage.service;

import com.example.cloudstorage.entity.User;

public interface UserService {

    // ==========================
    // Authentication
    // ==========================

    User registerUser(User user);

    User getUserByEmail(String email);

    // ==========================
    // Profile
    // ==========================

    User getUserById(Long id);

    User updateProfile(String email, User updatedUser);

    // ==========================
    // Password
    // ==========================

    void changePassword(String email, String oldPassword, String newPassword);

    // ==========================
    // Login Activity
    // ==========================

    void updateLastLogin(String email);

}