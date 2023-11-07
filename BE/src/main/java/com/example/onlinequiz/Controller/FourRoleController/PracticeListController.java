package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.AddNewLessonQuizRequest;
import com.example.onlinequiz.Payload.Request.AddNewQuizzes;
import com.example.onlinequiz.Repo.QuizDataRepository;
import com.example.onlinequiz.Repo.QuizResultDetailRepository;
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

    @Autowired
    public final QuizDataRepository quizDataRepository;

    @Autowired
    public final QuizResultDetailRepository quizResultDetailRepository;
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
            String description = request.getDescription();

            System.out.println("Received Data:");
            System.out.println("Quiz Name: " + quizName);
            System.out.println("Subject ID: " + subjectId);
            System.out.println("Quiz Type ID: " + quizTypeId);
            System.out.println("Duration Time: " + durationTime);
            System.out.println("Pass Rate: " + passRate);
            System.out.println("Exam level: " + examLevel);
            System.out.println("description: " + description);
            int quantityQuizData;
            switch (examLevel){
                case "easy":
                    quantityQuizData = 4;
                    break;
                case "medium":
                    quantityQuizData = 5;
                    break;
                default:
                    quantityQuizData = 6;
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
            quiz.setDescription(description);

//              More than one row with the given identifier was found: 1
//            List<QuizData> allQuizData = quizDataRepository.findAllBySubject(s);
//            System.out.println("Quiz data taken:" + allQuizData);


            quizService.addNewQuiz(quiz);
            System.out.println("Quiz id sau add" + quiz.getQuizID());
            List<QuizData> quizDataRandom = quizDataService.getRandomQuizData(quantityQuizData, s);
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
    //delete
//    @DeleteMapping("/delete/{resultId}")
//    public ResponseEntity<String> deleteQuizResultById(@PathVariable Long resultId) {
//        try {
//            QuizResults quizResults = practiceListService.getQuizResultByQuizId(resultId);
//            if (quizResults == null) {
//                return ResponseEntity.notFound().build();
//            }
//
//// Lấy danh sách chi tiết kết quả của kết quả cụ thể
//            List<QuizResultDetail> list = quizResultDetailRepository.findAllByQuizResult(quizResults);
//
//// Duyệt qua danh sách và xóa từng chi tiết kết quả
//            for (QuizResultDetail a : list) {
//                practiceListService.deleteQuizResultDetail(a);
//            }
//
//// Sau khi xóa tất cả chi tiết kết quả, tiếp tục xóa kết quả chính
//            practiceListService.deleteQuizResult(resultId);
//            return ResponseEntity.ok("Kết quả có ID " + resultId + " đã bị xóa thành công.");
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }


}
