package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Services.Impl.QuizServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private final QuizServiceImpl quizService;

    @GetMapping("/get/lesson/{lessonId}")
    public ResponseEntity<Quizzes> getLesson(
            @PathVariable Long lessonId
    ) {
        Quizzes q = quizService.getQuizById(lessonId);
        try {
            if (q != null) {

                return ResponseEntity.ok(q);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
