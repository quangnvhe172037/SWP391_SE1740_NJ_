package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Services.Impl.QuizResultServiceImpl;
import com.example.onlinequiz.Services.Impl.QuizServiceImpl;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import com.example.onlinequiz.Services.QuizResultService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private final QuizServiceImpl quizService;

    @Autowired
    private final UserServiceImpl userService;

    @Autowired
    private final QuizResultServiceImpl quizResultService;

    // Lấy bài quiz của lesson bằng cách dùng lessonId
    @GetMapping("/get/lesson/{lessonId}")
    public ResponseEntity<Quizzes> getLesson(
            @PathVariable Long lessonId
    ) {

        Quizzes q = quizService.getQuizByLessonId(lessonId);
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


    @GetMapping("/result/get")
    public ResponseEntity<QuizResultResponse> getQuizResult(
            @RequestParam Long quizId,
            @RequestParam Long userId
    ) {
        try {
            Quizzes q = quizService.getQuizById(quizId);
            if (q != null) {
                Users u = userService.getUserById(userId);
                if (u != null) {
                    QuizResultResponse qr = quizResultService.getQuizResultResponse(q, u);
                    if (qr != null) {

                        return ResponseEntity.ok(qr);
                    } else {
                        return ResponseEntity.notFound().build();
                    }
                }
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    // Lấy dữ liệu của quiz dự theo quizId
    @GetMapping("/get/{quizId}")
    public ResponseEntity<QuizInfoResponse> getQuizInfo(
            @PathVariable Long quizId,
            @RequestParam Long userId
    ) {

        QuizInfoResponse q = quizService.getQuizInfoById(quizId, userId);
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

    @GetMapping("/result/view/{resultId}")
    public ResponseEntity<QuizResultResponse> getQuizUserResult(
            @PathVariable Long resultId
    ) {
        try {

            QuizResultResponse qr = quizResultService.getUserQuizResultResponse(resultId);
            if (qr != null) {
                return ResponseEntity.ok(qr);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch ( Exception e) {
            System.out.println("QuizController - GetQuizUserResult" +e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
