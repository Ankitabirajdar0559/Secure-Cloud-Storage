package com.example.cloudstorage.controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cloudstorage.entity.User;
import com.example.cloudstorage.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {


    @Autowired
    private UserRepository userRepository;



    // Get logged in user profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            Principal principal
    ) {

        User user = userRepository
                .findByEmail(principal.getName())
                .orElseThrow();


        return ResponseEntity.ok(user);
    }




    // Get user by email
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(
            @PathVariable String email
    ) {


        Optional<User> user =
                userRepository.findByEmail(email);


        if(user.isPresent()) {

            return ResponseEntity.ok(
                    user.get()
            );
        }


        return ResponseEntity
                .notFound()
                .build();

    }



    // Update user profile
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {


        User user =
                userRepository.findById(id)
                .orElseThrow();


        user.setName(
                updatedUser.getName()
        );


        if(updatedUser.getProfileImage()!=null) {

            user.setProfileImage(
                    updatedUser.getProfileImage()
            );
        }


        userRepository.save(user);


        return ResponseEntity.ok(user);

    }

}