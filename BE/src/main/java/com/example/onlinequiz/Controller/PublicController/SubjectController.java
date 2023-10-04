package com.example.onlinequiz.Controller.PublicController;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Services.SubjectService;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("/subjects")
@MultipartConfig
public class SubjectController {
    @Autowired
    private final SubjectService subjectService;

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

}
