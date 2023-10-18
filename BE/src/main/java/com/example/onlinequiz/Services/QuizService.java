package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;

public interface QuizService {

    Quizzes getQuizByLessonId(Long id);

    Quizzes getQuizById(Long id);

    QuizInfoResponse getQuizInfoById(Long Id);

    public void addQuestion(QuizRequest request, String subjectName);
}
