package com.example.onlinequiz.Controller.ExpertController;

import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/questions")
public class ExpertQuizController {
    @Autowired
    private QuizService quizService;

    @PostMapping("/add/{subjectName}")
    public ResponseEntity<String> addQuestion(@RequestBody QuizRequest questionDTO, @PathVariable String subjectName) {
        quizService.addQuestion(questionDTO, subjectName);
        return ResponseEntity.ok("Question add Successfully");
    }

}