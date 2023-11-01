package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Services.PracticeListService;
import com.example.onlinequiz.Services.SubjectService;
import com.example.onlinequiz.Services.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("/practice")
public class PracticeListController {
    @Autowired
    public final PracticeListService practiceListService;

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

}
