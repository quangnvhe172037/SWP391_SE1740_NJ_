package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.SubjectCategories;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Services.PracticeListService;
import com.example.onlinequiz.Services.SubjectService;
import com.example.onlinequiz.Services.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<QuizResults>> getUserPracticeList(
            @RequestParam Long userid
    ){
        Users u = userService.getUserById(userid);
        List<QuizResults> listPractice = practiceListService.getListQuizResultByQuizID(u);
        if(listPractice == null){
            return null;
        }
        return ResponseEntity.ok(listPractice);
    }


//    @GetMapping("subjectCate")
//    @ResponseBody
//    public ResponseEntity<List<SubjectCategories>> getSubjetcCategory(){
//        List<SubjectCategories> listSubjectCate = subjectService
//    }
}
