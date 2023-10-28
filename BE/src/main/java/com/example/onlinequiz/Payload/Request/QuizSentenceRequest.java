package com.example.onlinequiz.Payload.Request;

import com.example.onlinequiz.Model.QuizAnswers;
import com.example.onlinequiz.Model.QuizQuestions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class QuizSentenceRequest {
    private List<QuizAnswerRequest> quizAnswers;
    private QuizQuestionRequest quizQuestions;
}
