package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class UpdateQuestionRequest {
    private Long questionId;
    private String updatedQuestionData;
    private List<String> updatedAnswers;
    private String updatedCorrectAnswer;
}
