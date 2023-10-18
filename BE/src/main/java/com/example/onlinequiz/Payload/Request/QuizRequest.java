package com.example.onlinequiz.Payload.Request;

import lombok.Data;

import java.util.List;
@Data
public class QuizRequest {
    private String questionData;
    private List<String> answerOptions; // [A, B, C, D]
    private String correctAnswer; // A, B, C, hoặc D
    private String explanation;
}
