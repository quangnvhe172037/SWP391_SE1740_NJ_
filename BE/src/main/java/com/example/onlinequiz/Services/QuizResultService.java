package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;

public interface QuizResultService {

    QuizResultResponse getQuizResult(Quizzes q, Users u);
}