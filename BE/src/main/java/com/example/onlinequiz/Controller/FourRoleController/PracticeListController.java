package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.AddNewLessonQuizRequest;
import com.example.onlinequiz.Payload.Request.AddNewQuizzes;
import com.example.onlinequiz.Services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("/practice")
public class PracticeListController {
    @Autowired
    public final PracticeListService practiceListService;

    @Autowired
    public final QuizTypeService quizTypeService;
    @Autowired
    public final QuizService quizService;

    @Autowired
    public final QuizDataService quizDataService;

    @Autowired
    public final QuizDetailService quizDetailService;

    @Autowired
    public final SubjectService subjectService;

    @Autowired
    public final UserService userService;


    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<QuizResults>> getQuizResultByUseridAndSubjectid(
            @RequestParam Long userid,
            @RequestParam Long subjectid
    ){

        Users u = userService.getUserById(userid);
        Subjects s = subjectService.getSubjectById(subjectid);
        List<QuizResults> listResult = practiceListService.getListQuizResultDetail(u,s);
        if(listResult == null){
            System.out.println("Null result");

        }else{
            System.out.println("oke");
        }
        return ResponseEntity.ok(listResult);
    }


    //Practice Detail
    //View
    @GetMapping("view/{resultid}")
    @ResponseBody
    public ResponseEntity<QuizResults> getQuizResultByID(
            @PathVariable Long resultid
    ){
        try{
            QuizResults quizResults = practiceListService.getQuizResultByQuizId(resultid);
            if(quizResults == null){
                return ResponseEntity.notFound().build();
            }else{
                return ResponseEntity.ok(quizResults);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
    //Add new quiz
    @PostMapping("/add")
    public ResponseEntity<Quizzes> addNewQuiz(@RequestBody AddNewQuizzes request) {

        try{
            String quizName = request.getQuizName();
            Integer subjectId = request.getSubjectId();
            Integer quizTypeId = request.getQuizTypeId();
            Integer durationTime = request.getDurationTime();
            Integer passRate = request.getPassRate();
            String examLevel = request.getExamLevel();

            System.out.println("Received Data:");
            System.out.println("Quiz Name: " + quizName);
            System.out.println("Subject ID: " + subjectId);
            System.out.println("Quiz Type ID: " + quizTypeId);
            System.out.println("Duration Time: " + durationTime);
            System.out.println("Pass Rate: " + passRate);
            System.out.println("Exam level: " + examLevel);
            int quantityQuizData;
            switch (examLevel){
                case "easy":
                    quantityQuizData = 2;
                    break;
                case "medium":
                    quantityQuizData = 3;
                    break;
                default:
                    quantityQuizData = 4;
            }

            Quizzes quiz = new Quizzes();
            quiz.setQuizName(quizName);

            Subjects s = subjectService.getSubjectById(Long.valueOf(subjectId));
            quiz.setSubject(s);

            QuizTypes qt = quizTypeService.getQuizTypeById(Long.valueOf(quizTypeId));
            quiz.setQuizTypes(qt);

            quiz.setDurationTime(durationTime);

            Date currentTime = new Date();
            quiz.setDateCreate(currentTime);
            quiz.setPassRate(passRate);

            //random number question in quiz

            quizService.addNewQuiz(quiz);
            List<QuizData> quizDataRandom = quizDataService.getRandomQuizData(quantityQuizData);
            for (QuizData e : quizDataRandom) {
                QuizDetail quizDetail = new QuizDetail();
                quizDetail.setQuizData(e);
                quizDetail.setQuizzes(quiz);
                quizDetailService.addNewQuizDetail(quizDetail);
            }

            return ResponseEntity.ok(quiz);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
