package com.example.onlinequiz.Controller.PublicController;

import com.example.onlinequiz.Model.SubjectCategories;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Services.CategorySubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("/categorysubject")
public class CategorySubjectController {
    @Autowired
    private final CategorySubjectService categorySubjectService;
    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<SubjectCategories>> getAllSubjects() {
        try {
            List<SubjectCategories> subjectCategories = categorySubjectService.getAll();
            return ResponseEntity.ok(subjectCategories);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }
}
