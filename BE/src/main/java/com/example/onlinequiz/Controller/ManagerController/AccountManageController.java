package com.example.onlinequiz.Controller.ManagerController;

import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Payload.Response.DashboardResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Services.SubjectService;
import com.example.onlinequiz.Services.UserPaymentService;
import com.example.onlinequiz.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/manage")
@AllArgsConstructor
public class AccountManageController {

    @Autowired
    private final UserService userService;

    @Autowired
    private final SubjectService subjectService;

    @Autowired
    private final UserPaymentService userPaymentService;


    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getQuizSentence(
    ) {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        try {
            DashboardResponse dashboardResponse = new DashboardResponse(
                    userService.countAllUser(),
                    userService.countNewUser(),
                    subjectService.countAllSubject(),
                    userPaymentService.calculatePriceByMonthsInYear(year),
                    userPaymentService.countPaymentsByMonthsInYear(year)

            );

            return ResponseEntity.ok(dashboardResponse);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
