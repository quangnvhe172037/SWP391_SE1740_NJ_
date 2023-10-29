package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class QuestionResponse {
    private String questionData;
    private List<String> answerOptions;
    private String explanation;
    private String correctAnswer;

}
