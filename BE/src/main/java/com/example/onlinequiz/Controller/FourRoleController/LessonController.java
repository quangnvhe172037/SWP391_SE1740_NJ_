package com.example.onlinequiz.Controller.FourRoleController;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Services.Impl.LessonServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/lesson")
public class LessonController {
    @Autowired
    private final LessonServiceImpl lessonService;

    @GetMapping("/get/{subjectID}")
    public ResponseEntity<List<Lessons>> getLessonsBySubject(
            @PathVariable Long subjectID
    ) {
        List<Lessons> lesson = lessonService.getLessons(subjectID);
        try {


            if (lesson != null) {

                return ResponseEntity.ok(lesson);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/get/data/{lessonId}")
    public ResponseEntity<Lessons> getLesson(@PathVariable Long lessonId) {
        Lessons l = lessonService.getLessonData(lessonId);
        try {
            if (l != null) {

                return ResponseEntity.ok(l);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
