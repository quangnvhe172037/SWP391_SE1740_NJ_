package com.example.onlinequiz.Controller.ExpertController;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.*;
import com.example.onlinequiz.Payload.Response.ArticleLessonResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Payload.Response.VideoLessonResponse;
import com.example.onlinequiz.Services.LessonService;
import com.example.onlinequiz.Services.QuizService;
import com.example.onlinequiz.Services.SubjectService;
import com.example.onlinequiz.Services.SubjectTopicService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @Autowired
    private final QuizService quizService;


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



    // Delete lesson
    @PutMapping("/delete/{lessonId}")
    public ResponseEntity<String> deleteLesson(
            @PathVariable Long lessonId
    ) {
        try {
            lessonService.deleteLesson(lessonId);
            return ResponseEntity.ok("delete successfully");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    // Update order of lesson
    @PutMapping("/update/order/{lessonId}")
    public ResponseEntity<String> updateLessonOrder(
            @PathVariable Long lessonId,
            @RequestParam Integer order,
            @RequestParam String name
    ) {
        try {
            subjectTopicService.updateOrderSubjectTopic(lessonId, order, name);
            return ResponseEntity.ok("delete successfully");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    // Add new lesson quiz
    @PostMapping("/add/quiz/{subjectTopicId}")
    public ResponseEntity<Lessons> addNewQuizLesson(
            @PathVariable Long subjectTopicId,
            @RequestBody AddNewLessonQuizRequest request

            ) {

        try {
            String lessonName = request.getLessonName();
            Integer lessonOrder = request.getLessonOrder();
            String description = request.getQuizDescription();
            Integer passRate = request.getPassRate();
            Integer durationTime = request.getDurationTime();
            SubjectTopics subjectTopic = subjectTopicService.getSubjectTopic(subjectTopicId);

            Lessons lesson = new Lessons();
            lesson.setLessonName(lessonName);
            lesson.setOrder(lessonOrder);
            lesson.setTopic(subjectTopic);
            lesson.setLessonType(new LessonType(1, "quiz"));

            lessonService.addNewLesson(lesson);

            Quizzes quiz = new Quizzes();
            quiz.setQuizTypes(new QuizTypes(1L, "LEARNING"));
            quiz.setSubject(subjectTopic.getSubject());
            quiz.setDateCreate(new Date());
            quiz.setLessonid(lesson.getLessonID());
            quiz.setDescription(description);
            quiz.setPassRate(passRate);
            quiz.setDurationTime(durationTime);
            quiz.setQuizName(lessonName);
            quizService.addNewQuiz(quiz);

            return ResponseEntity.ok(lesson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    // Add new lesson video
    @PostMapping("/add/video/{subjectTopicId}")
    public ResponseEntity<Lessons> addNewVideoLesson(
            @PathVariable Long subjectTopicId,
            @RequestBody AddNewLessonVideoRequest request

    ) {

        try {
            String lessonName = request.getLessonName();
            Integer lessonOrder = request.getLessonOrder();
            String video = request.getVideo();
            SubjectTopics subjectTopic = subjectTopicService.getSubjectTopic(subjectTopicId);

            Lessons lesson = new Lessons();
            lesson.setLessonName(lessonName);
            lesson.setOrder(lessonOrder);
            lesson.setTopic(subjectTopic);
            lesson.setLessonType(new LessonType(2, "video"));
            lesson.setVideoLink(video);
            lessonService.addNewLesson(lesson);


            return ResponseEntity.ok(lesson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    // Add new lesson article
    @PostMapping("/add/article/{subjectTopicId}")
    public ResponseEntity<Lessons> addNewArticleLesson(
            @PathVariable Long subjectTopicId,
            @RequestBody AddNewLessonArticleRequest request

    ) {

        try {
            String lessonName = request.getLessonName();
            Integer lessonOrder = request.getLessonOrder();
            String article = request.getArticle();
            SubjectTopics subjectTopic = subjectTopicService.getSubjectTopic(subjectTopicId);

            Lessons lesson = new Lessons();
            lesson.setLessonName(lessonName);
            lesson.setOrder(lessonOrder);
            lesson.setTopic(subjectTopic);
            lesson.setLessonContent(article);
            lesson.setLessonType(new LessonType(3, "content"));
            lessonService.addNewLesson(lesson);


            return ResponseEntity.ok(lesson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/get/article/{lessonId}")
    public ResponseEntity<ArticleLessonResponse> getArticleLesson(
            @PathVariable Long lessonId

    ) {

        try {
           Lessons lesson = lessonService.getLessonData(lessonId);
            ArticleLessonResponse response = new ArticleLessonResponse(lessonId,lesson.getLessonName(), lesson.getOrder(), lesson.getLessonContent());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/get/video/{lessonId}")
    public ResponseEntity<VideoLessonResponse> getVideoLesson(
            @PathVariable Long lessonId

    ) {

        try {
            Lessons lesson = lessonService.getLessonData(lessonId);
            VideoLessonResponse response = new VideoLessonResponse(lessonId, lesson.getLessonName(), lesson.getOrder(), lesson.getVideoLink());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/update/video/{lessonId}")
    public ResponseEntity<Lessons> updateVideoLesson(
            @PathVariable Long lessonId,
            @RequestBody AddNewLessonVideoRequest request

    ) {

        try {
            String lessonName = request.getLessonName();
            Integer lessonOrder = request.getLessonOrder();
            String video = request.getVideo();

            Lessons lesson = lessonService.getLessonData(lessonId);
            lesson.setLessonName(lessonName);
            lesson.setOrder(lessonOrder);

            lesson.setVideoLink(video);
            lessonService.addNewLesson(lesson);


            return ResponseEntity.ok(lesson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    // Add new lesson article
    @PutMapping("/update/article/{lessonId}")
    public ResponseEntity<Lessons> updateArticleLesson(
            @PathVariable Long lessonId,
            @RequestBody AddNewLessonArticleRequest request

    ) {

        try {
            String lessonName = request.getLessonName();
            Integer lessonOrder = request.getLessonOrder();
            String article = request.getArticle();


            Lessons lesson = lessonService.getLessonData(lessonId);
            lesson.setLessonName(lessonName);
            lesson.setOrder(lessonOrder);
            lesson.setLessonContent(article);
            lessonService.addNewLesson(lesson);


            return ResponseEntity.ok(lesson);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
