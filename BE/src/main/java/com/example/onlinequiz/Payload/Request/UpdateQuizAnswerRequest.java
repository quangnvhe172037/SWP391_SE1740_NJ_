package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UpdateQuizAnswerRequest {
    private Long answerId;
    private String answerData;
    private String explanation;
    private boolean trueAnswer;
}
