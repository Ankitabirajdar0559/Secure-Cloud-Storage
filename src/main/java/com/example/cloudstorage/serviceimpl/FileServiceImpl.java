package com.example.cloudstorage.serviceimpl;


import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.example.cloudstorage.entity.FileEntity;
import com.example.cloudstorage.entity.User;
import com.example.cloudstorage.repository.FileRepository;
import com.example.cloudstorage.service.FileService;



@Service
public class FileServiceImpl implements FileService {



    private final String uploadDir="uploads/";



    @Autowired
    private FileRepository fileRepository;



    @Override
    public FileEntity uploadFile(
            MultipartFile file,
            User user
    ) throws IOException {



        Path uploadPath =
                Paths.get(uploadDir);



        if(!Files.exists(uploadPath)){

            Files.createDirectories(uploadPath);

        }



        String originalName =
                file.getOriginalFilename();



        String fileName =
                UUID.randomUUID()
                +"_"
                +originalName;



        Path filePath =
                uploadPath.resolve(fileName);



        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );



        FileEntity entity =
                new FileEntity();



        entity.setFileName(originalName);

        entity.setFileType(
                file.getContentType()
        );

        entity.setFilePath(
                filePath.toString()
        );

        entity.setFileSize(
                file.getSize()
        );

        entity.setUser(user);



        return fileRepository.save(entity);

    }






    @Override
    public List<FileEntity> getFilesByUser(User user){

        return fileRepository.findByUser(user);

    }







    @Override
    public Resource downloadFile(Long id)
            throws IOException {



        FileEntity file =
                fileRepository.findById(id)
                .orElseThrow(
                    ()->new RuntimeException("File not found")
                );



        Path path =
                Paths.get(file.getFilePath());



        Resource resource =
                new UrlResource(
                        path.toUri()
                );



        if(!resource.exists()){

            throw new RuntimeException(
                    "File does not exist"
            );

        }



        return resource;

    }






    @Override
    public void deleteFile(Long id) {

        FileEntity file =
                fileRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException("File not found")
                );

        try {

            String path = file.getFilePath();

            if(path != null && !path.isEmpty()) {

                Path filePath = Paths.get(path);

                if(Files.exists(filePath)) {
                    Files.delete(filePath);
                }
            }

            fileRepository.delete(file);

        }
        catch(IOException e) {

            throw new RuntimeException(
                    "Delete failed: " + e.getMessage()
            );

        }

    }
    
    }