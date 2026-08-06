package com.example.cloudstorage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cloudstorage.dto.LoginRequest;
import com.example.cloudstorage.dto.LoginResponse;
import com.example.cloudstorage.entity.User;
import com.example.cloudstorage.repository.UserRepository;
import com.example.cloudstorage.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {


    @Autowired
    private AuthService authService;


    @Autowired
    private UserRepository userRepository;



    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        LoginResponse response =
                authService.login(request);


        return ResponseEntity.ok(response);

    }





    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user
    ) {


        User savedUser =
                userRepository.save(user);



        return ResponseEntity.ok(
                "Registration successful"
        );

    }


}