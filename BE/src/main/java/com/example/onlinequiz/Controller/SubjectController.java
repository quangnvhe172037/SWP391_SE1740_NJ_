package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Repo.SubjectsRepository;
import com.example.onlinequiz.Services.SubjectService;
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
public class SubjectController {

    @Autowired
    private final SubjectService subjectService;
    @GetMapping()
    @ResponseBody
    public ResponseEntity<List<Subjects>> getAllSubjects(){
        try {
            List<Subjects> subjects = subjectService.getAll();
            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
