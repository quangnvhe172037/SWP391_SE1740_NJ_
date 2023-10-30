package com.example.onlinequiz.Services;


import com.example.onlinequiz.Model.QuizAnswers;

import java.util.List;

public interface QuizAnswerService {
    void addNewAnswer(QuizAnswers quizAnswer);

    QuizAnswers findAllByAnswerId(Long id);
}
