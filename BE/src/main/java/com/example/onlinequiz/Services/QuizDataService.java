package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizData;

import java.util.List;

public interface QuizDataService {
    List<QuizData> getAllQuizData(Long id);

    void addNewQuizData(QuizData quizData);

//    Object getQuizData(Long id);
}
