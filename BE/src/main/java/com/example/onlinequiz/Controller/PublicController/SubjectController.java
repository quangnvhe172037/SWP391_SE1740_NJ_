package com.example.onlinequiz.Controller.PublicController;


import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Services.FileUpload;
import com.example.onlinequiz.Services.SubjectService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*",allowedHeaders = "*")
@RequestMapping("/subjects")
@MultipartConfig
public class SubjectController {
    @Autowired
    private final SubjectService subjectService;

    @Autowired
    private final FileUpload fileUploadService;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Subjects>> getAllSubjects() {
        try {
            List<Subjects> subjectList = subjectService.getAllSubject();
            return ResponseEntity.ok(subjectList);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Subjects> create(@RequestPart("subject") String subjectsJson, @RequestParam("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        Subjects subjects = null;
        try {
            subjects = objectMapper.readValue(subjectsJson, Subjects.class);
            String image = fileUploadService.uploadFile(file);
            subjects.setImage(image);
            subjects.setCreate_date(new Date());
            subjectService.save(subjects);
            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
