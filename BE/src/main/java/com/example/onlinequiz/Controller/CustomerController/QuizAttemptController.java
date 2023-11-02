package com.example.onlinequiz.Controller.CustomerController;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.QuizAnswerRequest;
import com.example.onlinequiz.Payload.Request.QuizSentenceRequest;
import com.example.onlinequiz.Payload.Request.QuizSentenceSubmitRequest;
import com.example.onlinequiz.Payload.Response.AttemptQuizGetResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceUserResponse;
import com.example.onlinequiz.Repo.QuizAnswerRepository;
import com.example.onlinequiz.Services.QuizDataService;
import com.example.onlinequiz.Services.QuizDetailService;
import com.example.onlinequiz.Services.QuizResultService;
import com.example.onlinequiz.Services.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    public ResponseEntity<AttemptQuizGetResponse> getAllQuizSentence(
            @PathVariable Long quizId,
            @RequestParam Long resultId,
            @RequestParam Long userId) {
        try {

            Quizzes quiz = quizService.getQuizById(quizId);

            QuizResults quizResult = quizResultService.getQuizResult(resultId);
            if (quizResult == null || quizResult.getIsDone()) {
                return ResponseEntity.notFound().build();
            }

            if (quizResult.getUser().getId() != userId) {
                return ResponseEntity.notFound().build();
            }
            quizResultService.updateTimeDoQuiz(quizResult, quiz.getDurationTime());


            List<QuizDetail> quizDetailList = quizService.getQuizDetailByQuiz(quiz);

            List<QuizSentenceUserResponse> data = quizService.getListAnswerQuizUser(quizDetailList, quizResult);


            AttemptQuizGetResponse result = new AttemptQuizGetResponse(resultId,
                    quiz.getQuizName(),
                    data,
                    quiz.getPassRate(),
                    quiz.getDurationTime(),
                    quizResult.getDateEnd());

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("quiz attempt controller - getAllQuizSentence" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    @PostMapping("/add/result/{quizId}")
    public ResponseEntity<Long> addNewQuizResult(@PathVariable Long quizId, @RequestParam Long userId) {

        try {

            Long result = quizResultService.addNewQuizResult(quizId, userId);
            if (result != null) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

        } catch (Exception e) {
            System.out.println("Quiz attempt controller- addNewQuizResult" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/update/result/{quizId}")
    public ResponseEntity<String> updateNewQuizResult(
            @PathVariable Long quizId,
            @RequestParam Long resultId,
            @RequestParam Long userId,
            @RequestBody List<QuizSentenceSubmitRequest> quizSentenceSubmitRequest) {

        try {
            String result = quizResultService.updateDataQuizResult(quizSentenceSubmitRequest, quizId, resultId, userId);
            return ResponseEntity.ok("update success");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/submit/result/{quizId}")
    public ResponseEntity<Boolean> submitQuizResult(
            @PathVariable Long quizId,
            @RequestParam Long resultId,
            @RequestParam Long userId,
            @RequestBody List<QuizSentenceSubmitRequest> quizSentenceSubmitRequest) {

        try {
            QuizResults quizResult = quizResultService.getQuizResult(resultId);
            quizResult.setIsDone(true);

            Boolean result = quizResultService.submitDataQuizResult(quizSentenceSubmitRequest, quizId, resultId, userId);
            if(result){
                return ResponseEntity.ok(true);
            }
            return ResponseEntity.ok(false);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/review/{quizId}")
    public ResponseEntity<AttemptQuizGetResponse> getAllQuizSentenceReview(
            @PathVariable Long quizId,
            @RequestParam Long resultId,
            @RequestParam Long userId) {
        try {

            Quizzes quiz = quizService.getQuizById(quizId);

            QuizResults quizResult = quizResultService.getQuizResult(resultId);
            if (quizResult == null) {
                return ResponseEntity.notFound().build();
            }

            if (quizResult.getUser().getId() != userId) {
                return ResponseEntity.notFound().build();
            }
            quizResultService.updateTimeDoQuiz(quizResult, quiz.getDurationTime());


            List<QuizDetail> quizDetailList = quizService.getQuizDetailByQuiz(quiz);

            List<QuizSentenceUserResponse> data = quizService.getListAnswerQuizUser(quizDetailList, quizResult);


            AttemptQuizGetResponse result = new AttemptQuizGetResponse(resultId,
                    quiz.getQuizName(),
                    data,
                    quiz.getPassRate(),
                    quiz.getDurationTime(),
                    quizResult.getDateEnd());
            System.out.println(result.getResultId());

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("quiz attempt controller - getAllQuizSentence" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }




}