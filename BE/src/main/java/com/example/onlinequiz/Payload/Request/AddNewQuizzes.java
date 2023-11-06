package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddNewQuizzes {
    private String quizName;
    private String description;
    private Integer subjectId;
    private Integer quizTypeId;
    private Integer durationTime;
    private Integer passRate;
    private String examLevel;
}
