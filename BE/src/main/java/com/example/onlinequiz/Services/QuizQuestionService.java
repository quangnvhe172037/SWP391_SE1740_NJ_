package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizAnswers;
import com.example.onlinequiz.Model.QuizQuestions;

public interface QuizQuestionService {
void addNewQuestion(QuizQuestions quizQuestion);

    QuizQuestions findByQuestionId(Long id);
}
