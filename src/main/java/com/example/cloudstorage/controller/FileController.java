package com.example.cloudstorage.controller;


import java.io.IOException;
import java.security.Principal;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import com.example.cloudstorage.entity.FileEntity;
import com.example.cloudstorage.entity.User;
import com.example.cloudstorage.repository.UserRepository;
import com.example.cloudstorage.service.FileService;



@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {



    @Autowired
    private FileService fileService;



    @Autowired
    private UserRepository userRepository;




    // ===============================
    // Upload File
    // ===============================

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            Principal principal
    ) throws IOException {


        User user = userRepository
                .findByEmail(principal.getName())
                .orElseThrow();


        FileEntity savedFile =
                fileService.uploadFile(file, user);



        return ResponseEntity.ok(savedFile);

    }





    // ===============================
    // Get User Files
    // ===============================

    @GetMapping
    public ResponseEntity<List<FileEntity>> getUserFiles(
            Principal principal
    ) {


        User user =
                userRepository
                .findByEmail(principal.getName())
                .orElseThrow();



        return ResponseEntity.ok(
                fileService.getFilesByUser(user)
        );

    }





    // ===============================
    // File Count Dashboard
    // ===============================

    @GetMapping("/count")
    public ResponseEntity<?> getFileCount(
            Principal principal
    ) {


        User user =
                userRepository
                .findByEmail(principal.getName())
                .orElseThrow();



        return ResponseEntity.ok(
                fileService.getFilesByUser(user).size()
        );

    }





    // ===============================
    // Storage Used
    // ===============================

    @GetMapping("/storage")
    public ResponseEntity<?> getStorage(
            Principal principal
    ) {


        User user =
                userRepository
                .findByEmail(principal.getName())
                .orElseThrow();



        long size =
                fileService
                .getFilesByUser(user)
                .stream()
                .mapToLong(FileEntity::getFileSize)
                .sum();



        return ResponseEntity.ok(size);

    }






    // ===============================
    // Download
    // ===============================

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id
    ) throws IOException {


        Resource resource =
                fileService.downloadFile(id);



        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" 
                        + resource.getFilename()
                        + "\""
                )
                .body(resource);

    }







    // ===============================
    // Delete
    // ===============================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(
            @PathVariable Long id
    ) {


        fileService.deleteFile(id);



        return ResponseEntity.ok(
                "File deleted successfully"
        );

    }


}