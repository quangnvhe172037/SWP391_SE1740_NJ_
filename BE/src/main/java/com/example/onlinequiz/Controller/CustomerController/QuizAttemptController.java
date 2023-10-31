package com.example.onlinequiz.Controller.CustomerController;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.QuizAnswerRequest;
import com.example.onlinequiz.Payload.Request.QuizSentenceRequest;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Services.QuizDataService;
import com.example.onlinequiz.Services.QuizDetailService;
import com.example.onlinequiz.Services.QuizResultService;
import com.example.onlinequiz.Services.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/attempt/quiz")
public class QuizAttemptController {

    @Autowired
    private final QuizService quizService;

    @Autowired
    private final QuizDataService quizDataService;

    @Autowired
    private final QuizDetailService quizDetailService;

    @Autowired
    private final QuizResultService quizResultService;

    @GetMapping("/{quizId}")
    public ResponseEntity<List<QuizSentenceResponse>> getAllQuizSentence(
            @PathVariable Long quizId
    ) {
        try {
            Quizzes quiz = quizService.getQuizById(quizId);
            List<QuizDetail> quizDetailList = quizService.getQuizDetailByQuiz(quiz);
            List<QuizSentenceResponse> data = quizService.getListQuizDataByQuizDetail(quizDetailList);


            return ResponseEntity.ok(data);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    @PostMapping("/add/result/{quizId}")
    public ResponseEntity<String> addNewQuizSentence(
            @PathVariable Long quizId,
            @RequestParam Long userId
    ) {

        try {

            quizResultService.addNewQuizResult(quizId, userId);
            return ResponseEntity.ok("Done");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}