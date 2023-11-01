package com.example.onlinequiz.Payload.Response;

import com.example.onlinequiz.Model.QuizAnswers;
import com.example.onlinequiz.Model.QuizQuestions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class QuizSentenceUserResponse {
    private Long sentenceId;
    private List<QuizAnswers> quizAnswers;
    private QuizQuestions quizQuestions;
    private Long userAnswer;
}
