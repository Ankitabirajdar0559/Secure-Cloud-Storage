package com.example.cloudstorage.serviceimpl;


import java.time.LocalDateTime;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.cloudstorage.dto.LoginRequest;
import com.example.cloudstorage.dto.LoginResponse;
import com.example.cloudstorage.entity.User;
import com.example.cloudstorage.repository.UserRepository;
import com.example.cloudstorage.security.JwtUtil;
import com.example.cloudstorage.service.AuthService;



@Service
public class AuthServiceImpl implements AuthService {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private PasswordEncoder passwordEncoder;




    @Override
    public LoginResponse login(
            LoginRequest request
    ) {


        User user =
                userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(
                    () -> new RuntimeException(
                        "Invalid email or password"
                    )
                );



        if(!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {


            throw new RuntimeException(
                    "Invalid email or password"
            );

        }



        user.setLastLogin(
                LocalDateTime.now()
        );


        userRepository.save(user);




        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );



        return new LoginResponse(

                token,

                user.getId(),

                user.getName(),

                user.getEmail(),

                user.getRole().name()

        );


    }


}