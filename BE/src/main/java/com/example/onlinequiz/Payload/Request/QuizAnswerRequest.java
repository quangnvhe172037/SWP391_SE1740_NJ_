package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QuizAnswerRequest {
    private String answerData;
    private String explanation;
    private boolean trueAnswer;
}
