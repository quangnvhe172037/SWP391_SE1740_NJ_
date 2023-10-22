package com.example.onlinequiz.Controller.CustomerController;

import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Services.Impl.SubjectServiceImp;
import com.example.onlinequiz.Services.Impl.UserPaymanetServiceImpl;
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
    private final UserPaymanetServiceImpl userPaymanetService;


    @Autowired
    private final UserServiceImpl userService;

    @GetMapping("/get")
    public ResponseEntity<Subjects> getQuizResult(
            @RequestParam Long subjectId,
            @RequestParam Long userId
    ) {
        try {
            Subjects getSubject = subjectService.getSubjectById(subjectId);
            Users getUser = userService.getUserById(userId);
            if(getSubject != null && getUser != null){
                boolean checkExist = userPaymanetService.checkPay(getSubject, getUser);
                if ( checkExist == true) {

                    return ResponseEntity.ok(getSubject);
                } else {
                    return ResponseEntity.notFound().build();
                }
            }else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
