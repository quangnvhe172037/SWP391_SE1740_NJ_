package com.example.onlinequiz.Controller.ExpertController;

import com.example.onlinequiz.Model.*;

import com.example.onlinequiz.Payload.Request.*;

import com.example.onlinequiz.Payload.Request.DeleteQuestRequest;
import com.example.onlinequiz.Payload.Request.QuizAnswerRequest;
import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Payload.Request.QuizSentenceRequest;

import com.example.onlinequiz.Payload.Response.QuestionResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Services.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/questions")
public class ExpertQuizController {
    @Autowired
    private final QuizService quizService;

    @Autowired
    private final LessonService lessonService;

    @Autowired
    private final SubjectService subjectService;

    @Autowired
    private final QuizDetailService quizDetailService;

    @Autowired
    private final QuizDataService quizDataService;

    @Autowired
    private final QuizAnswerService quizAnswerService;

    @Autowired
    private final QuizQuestionService quizQuestionService;

    //api add question
    @PostMapping("/add/{subjectName}")
    public ResponseEntity<String> addQuestion(@RequestBody QuizRequest questionDTO, @PathVariable Long subjectName) {
        quizService.addQuestion(questionDTO, subjectName);
        return ResponseEntity.ok("Question add Successfully");
    }

    //api get question
    @GetMapping("/get/{subjectName}")
    public List<QuestionResponse> getQuestionBySubjectName(@PathVariable Long subjectName){
        return quizDataService.getQuestionBySubjectName(subjectName);
    }
    //api delete question
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteQuestion(@RequestBody DeleteQuestRequest request) {
        quizService.deleteQuestion(request);
        return ResponseEntity.ok("Question deleted successfully");
    }


    // Get all the quiz answer of this lesson to show
    @GetMapping("/get/lesson/{lessonId}")
    public ResponseEntity<List<QuizSentenceResponse>> getQuizSentence(
            @PathVariable Long lessonId
    ) {
        try {


            Quizzes q = quizService.getQuizByLessonId(lessonId);

            List<QuizDetail> quizDetailList = quizService.getQuizDetailByQuiz(q);


            List<QuizSentenceResponse> data = quizService.getListQuizDataByQuizDetail(quizDetailList);

            return ResponseEntity.ok(data);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping("/add/lesson/{lessonId}")
    public ResponseEntity<List<QuizSentenceResponse>> addNewQuizSentence(
            @PathVariable Long lessonId,
            @RequestParam Long subjectId,
            @RequestBody QuizSentenceRequest quizSentenceRequest

    ) {

        try {
            Quizzes q = quizService.getQuizByLessonId(lessonId);

            List<QuizDetail> quizDetailList = quizService.getQuizDetailByQuiz(q);
            List<QuizSentenceResponse> data = quizService.getListQuizDataByQuizDetail(quizDetailList);
            Subjects subject = subjectService.getSubjectById(subjectId);

            // Add new quiz data
            QuizData quizData = new QuizData();
            quizData.setSubject(subject);
            quizDataService.addNewQuizData(quizData);

            // Add new quiz detail
            QuizDetail quizDetail = new QuizDetail();
            quizDetail.setQuizData(quizData);
            quizDetail.setQuizzes(q);
            quizDetailService.addNewQuizDetail(quizDetail);

            // Add new answer
            for (QuizAnswerRequest quizAnswerRequest : quizSentenceRequest.getQuizAnswers()
            ) {
                QuizAnswers quizAnswer = new QuizAnswers();
                quizAnswer.setAnswerData(quizAnswerRequest.getAnswerData());
                quizAnswer.setQuizData(quizData);
                quizAnswer.setTrueAnswer(quizAnswerRequest.isTrueAnswer());
                quizAnswer.setExplanation(quizAnswerRequest.getExplanation());
                quizAnswerService.addNewAnswer(quizAnswer);
            }

            // Add new question
            QuizQuestions quizQuestion = new QuizQuestions();
            quizQuestion.setQuizData(quizData);
            quizQuestion.setQuestionData(quizSentenceRequest.getQuizQuestions().getQuestionData());
            quizQuestionService.addNewQuestion(quizQuestion);

            return ResponseEntity.ok(data);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/update/quiz/data/{sentenceId}")
    public ResponseEntity<String> updateArticleLesson(
            @PathVariable Long sentenceId,
            @RequestBody UpdateQuizSentenceRequest quizSentenceRequest

    ) {

        try {
            QuizData quizData = quizDataService.findById(sentenceId);

            QuizQuestions q = quizQuestionService.findByQuestionId(quizSentenceRequest.getQuizQuestion().getQuestionId());
            q.setQuestionData(quizSentenceRequest.getQuizQuestion().getQuestionData());

            for (UpdateQuizAnswerRequest quizAnswerRequest : quizSentenceRequest.getQuizAnswers()
            ) {
                QuizAnswers quizAnswer = quizAnswerService.findAllByAnswerId(quizAnswerRequest.getAnswerId());
                quizAnswer.setAnswerData(quizAnswerRequest.getAnswerData());
                quizAnswer.setQuizData(quizData);
                quizAnswer.setTrueAnswer(quizAnswerRequest.isTrueAnswer());
                quizAnswer.setExplanation(quizAnswerRequest.getExplanation());
                quizAnswerService.addNewAnswer(quizAnswer);
            }


            return ResponseEntity.ok("oke");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/get/quiz/sentence/{sentenceId}")
    public ResponseEntity<QuizSentenceResponse> addNewQuizSentence(
            @PathVariable Long sentenceId

    ) {

        try {
            QuizData quizData = quizDataService.findById(sentenceId);
            QuizSentenceResponse data = new QuizSentenceResponse(
                            quizData.getSentenceID(),
                            quizData.getQuizAnswers(),
                            quizData.getQuizQuestions()

                    );

            return ResponseEntity.ok(data);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


//    @DeleteMapping("/delete/lesson/{sentenceId}")
//    public ResponseEntity<List<QuizSentenceResponse>> deleteSentence(){
//
//    }

}