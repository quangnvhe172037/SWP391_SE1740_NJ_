package com.example.onlinequiz.Payload.Request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
@AllArgsConstructor
public class AddNewLessonQuizRequest {
    private String lessonName;
    private Integer lessonOrder;
    private String quizDescription;
    private Integer durationTime;
    private int passRate;
}
