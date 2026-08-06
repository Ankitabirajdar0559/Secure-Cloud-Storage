package com.example.cloudstorage.service;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.example.cloudstorage.entity.FileEntity;
import com.example.cloudstorage.entity.User;

public interface FileService {


    // Upload file
    FileEntity uploadFile(
            MultipartFile file,
            User user
    ) throws IOException;



    // Get files of user
    List<FileEntity> getFilesByUser(
            User user
    );



    // Download file
    Resource downloadFile(
            Long id
    ) throws IOException;



    // Delete file
    void deleteFile(
            Long id
    );

}