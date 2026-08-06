package com.example.cloudstorage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.cloudstorage.entity.FileEntity;
import com.example.cloudstorage.entity.User;


@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long>{


    List<FileEntity> findByUser(User user);


    List<FileEntity> findByUserId(Long userId);

}