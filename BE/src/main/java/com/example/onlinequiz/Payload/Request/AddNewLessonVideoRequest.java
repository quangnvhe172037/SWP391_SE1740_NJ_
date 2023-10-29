package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddNewLessonVideoRequest {
    private String lessonName;
    private Integer lessonOrder;
    private String video;
}
