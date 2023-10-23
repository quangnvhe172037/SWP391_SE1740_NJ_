package com.example.onlinequiz.Controller.CustomerController;

import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Payload.Response.SubjectDetailResponse;
import com.example.onlinequiz.Services.Impl.SubjectServiceImp;
import com.example.onlinequiz.Services.Impl.UserPaymentServiceImpl;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/user/subject")
public class SubjectUserController {

    @Autowired
    private final SubjectServiceImp subjectService;

    @Autowired
    private final UserPaymentServiceImpl userPaymentService;


    @Autowired
    private final UserServiceImpl userService;

    @GetMapping("/get")
    public ResponseEntity<SubjectDetailResponse> getQuizResult(
            @RequestParam Long subjectId,
            @RequestParam Long userId
    ) {
        try {
            SubjectDetailResponse result = subjectService.getSubjectDetail(userId, subjectId);

            if (result != null) {

                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
