package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Payload.Response.QuestionResponse;

import java.util.List;

public interface QuizDataService {
    List<QuizData> getAllQuizData(Long id);

    void addNewQuizData(QuizData quizData);

    List<QuestionResponse> getQuestionBySubjectName(Long subjectName);

    QuizData findById(Long id);

//    Object getQuizData(Long id);
}
