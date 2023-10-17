package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
public class QuizResultResponse {
private Long resultId;
private int score;
private Date dateTaken;
private Long quizId;
private int correctAnswer;
private int nullAnswer;
private int falseAnswer;
}
