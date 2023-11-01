package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class QuizSentenceSubmitRequest {
    private Long sentenceId;
    private Long userAnswer;
    private Date timeSubmit;
}
