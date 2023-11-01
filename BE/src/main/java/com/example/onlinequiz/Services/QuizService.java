package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Payload.Request.DeleteQuestRequest;
import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Payload.Request.UpdateQuestionRequest;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;

import java.util.List;

public interface QuizService {

    Quizzes getQuizByLessonId(Long id);

    Quizzes getQuizById(Long id);

    QuizInfoResponse getQuizInfoById(Long Id);

    public void addQuestion(QuizRequest request, Long subjectName);

    List<QuizDetail> getQuizDetailByQuiz(Quizzes q);

    List<QuizSentenceResponse> getListQuizDataByQuizDetail(List<QuizDetail> qd);

    void addNewQuiz(Quizzes q);
    void deleteQuestion(DeleteQuestRequest request);

    void updateQuestion(UpdateQuestionRequest request);
}
