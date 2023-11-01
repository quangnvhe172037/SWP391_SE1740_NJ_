package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
public class QuizInfoResponse {
    private Long quizId;
    private String quizName;
    private boolean status;
    private String description;
    private Date dateCreate;
    private int durationTime;
    private int passRate;
    private int countQues;
    private Long resultId;
}
