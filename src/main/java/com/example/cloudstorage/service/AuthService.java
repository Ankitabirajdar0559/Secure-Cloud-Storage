package com.example.cloudstorage.service;

import com.example.cloudstorage.dto.LoginRequest;
import com.example.cloudstorage.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}