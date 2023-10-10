package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Payload.Response.SubjectTopicResponse;
import com.example.onlinequiz.Services.Impl.SubjectTopicServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/subjecttopic")
public class SubjectTopicController {
    @Autowired
    private final SubjectTopicServiceImp subjectTopicService;


    @GetMapping("/get/{subjectID}")
    @ResponseBody
    public ResponseEntity<List<SubjectTopics>> getSubjectTopics(@PathVariable Long subjectID) {
        List<SubjectTopics> subjectTopic = subjectTopicService.getTopics(subjectID);
        try {
            if (subjectTopic != null) {
                return ResponseEntity.ok(subjectTopic);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
