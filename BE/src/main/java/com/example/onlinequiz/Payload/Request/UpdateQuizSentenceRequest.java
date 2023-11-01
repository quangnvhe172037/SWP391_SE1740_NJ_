package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UpdateQuizSentenceRequest {

    private Long sentenceId;
    private List<UpdateQuizAnswerRequest> quizAnswers;
    private UpdateQuizQuestionRequest quizQuestion;
}
