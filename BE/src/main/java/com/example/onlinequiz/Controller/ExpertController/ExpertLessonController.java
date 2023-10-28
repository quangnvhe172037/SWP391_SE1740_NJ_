package com.example.onlinequiz.Controller.ExpertController;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Services.LessonService;
import com.example.onlinequiz.Services.SubjectTopicService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/expert/lesson")
public class ExpertLessonController {

    @Autowired
    private final LessonService lessonService;

@Autowired
private final SubjectTopicService subjectTopicService;

    @PostMapping("/add/{subjectTopicId}")
    public ResponseEntity<Lessons> addNewLesson(
            @PathVariable Long subjectTopicId
    ) {
        try {
            SubjectTopics subjectTopic = subjectTopicService.getSubjectTopic(subjectTopicId);

            Lessons lesson = new Lessons();
            lesson.setTopic(subjectTopic);
            lessonService.addNewLesson(lesson);

            return ResponseEntity.ok(lesson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
