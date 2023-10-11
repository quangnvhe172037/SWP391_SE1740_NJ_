package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Services.Impl.QuizDataServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/quizdata")
public class QuizDataController {
    private final QuizDataServiceImpl quizDataService;

    @GetMapping("/get/quiz/{quizId}")
    public ResponseEntity<List<QuizData>> getQuizData(
            @PathVariable Long quizId
    ) {
        System.out.println(quizId);
        List<QuizData> qd = quizDataService.getAllQuizData(quizId);
        System.out.println(qd.toString());
        try {
           if (qd != null) {

              return ResponseEntity.ok(qd);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
